"""
FlowMind Python trace collector — Section 7.6
Injected into Docker container at /opt/flowmind/trace_collector.py
Imported by instrumented user code as: from trace_collector import trace
"""
import json, sys, atexit, builtins

MAX_STEPS = 10000
MAX_DEPTH = 500
MAX_ARRAY_LENGTH = 100
MAX_OBJECT_KEYS = 50
MAX_STRING_LENGTH = 1000

_steps = []
_step_index = 0
_frame_stack = [{"id": "frame_0", "name": "<module>", "depth": 0, "vars": {}, "parentId": None}]
_frame_counter = 1
_truncated = False


def _serialize(value, depth=0):
    if depth > 5:
        return {"type": "object", "value": "[Max Depth]"}
    if value is None:
        return {"type": "none", "value": None}
    if isinstance(value, bool):
        return {"type": "bool", "value": value}
    if isinstance(value, int):
        return {"type": "int", "value": value}
    if isinstance(value, float):
        return {"type": "float", "value": value}
    if isinstance(value, str):
        return {"type": "str", "value": value[:MAX_STRING_LENGTH]}
    if isinstance(value, (list, tuple)):
        kind = "list" if isinstance(value, list) else "tuple"
        return {
            "type": kind,
            "value": [_serialize(v, depth + 1) for v in value[:MAX_ARRAY_LENGTH]],
            "length": len(value),
        }
    if isinstance(value, dict):
        items = list(value.items())[:MAX_OBJECT_KEYS]
        return {
            "type": "dict",
            "value": {str(k): _serialize(v, depth + 1) for k, v in items},
        }
    if callable(value):
        return {"type": "function", "value": f"[function {getattr(value, '__name__', '?')}]"}
    return {"type": "object", "value": str(value)[:MAX_STRING_LENGTH]}


def _get_frame():
    return _frame_stack[-1]


def _get_vars():
    return {k: _serialize(v) for k, v in _get_frame()["vars"].items()}


def _push(step):
    global _truncated
    if len(_steps) >= MAX_STEPS:
        _truncated = True
        return
    _steps.append(step)


class _Trace:
    def line(self, line_num):
        global _step_index
        _push({"index": _step_index, "type": "line", "line": line_num,
               "frameId": _get_frame()["id"], "variables": _get_vars(), "timestamp": _step_index})
        _step_index += 1

    def call(self, name, **kwargs):
        global _step_index, _frame_counter
        if len(_frame_stack) >= MAX_DEPTH:
            return
        parent = _get_frame()
        new_frame = {
            "id": f"frame_{_frame_counter}",
            "name": name,
            "depth": parent["depth"] + 1,
            "vars": dict(kwargs),
            "parentId": parent["id"],
        }
        _frame_counter += 1
        _frame_stack.append(new_frame)
        _push({
            "index": _step_index, "type": "call", "functionName": name,
            "arguments": {k: _serialize(v) for k, v in kwargs.items()},
            "frameId": new_frame["id"], "parentFrameId": parent["id"],
            "depth": new_frame["depth"], "timestamp": _step_index,
        })
        _step_index += 1

    def return_(self, value):
        global _step_index
        frame = _frame_stack.pop() if len(_frame_stack) > 1 else _frame_stack[0]
        _push({"index": _step_index, "type": "return", "functionName": frame["name"],
               "returnValue": _serialize(value), "frameId": frame["id"],
               "depth": frame["depth"], "timestamp": _step_index})
        _step_index += 1
        return value

    def assign(self, name, old_val, new_val):
        global _step_index
        _get_frame()["vars"][name] = new_val
        _push({"index": _step_index, "type": "assign", "variable": name,
               "oldValue": _serialize(old_val), "newValue": _serialize(new_val),
               "frameId": _get_frame()["id"], "timestamp": _step_index})
        _step_index += 1
        return new_val

    def condition(self, expr, result, branch=None):
        global _step_index
        _push({"index": _step_index, "type": "condition", "expression": str(expr),
               "result": bool(result), "branch": "true" if result else "false",
               "frameId": _get_frame()["id"], "timestamp": _step_index})
        _step_index += 1

    def loop(self, line_num, **vars_snapshot):
        global _step_index
        _push({"index": _step_index, "type": "loop_iter", "loopLine": line_num,
               "variables": {k: _serialize(v) for k, v in vars_snapshot.items()},
               "frameId": _get_frame()["id"], "timestamp": _step_index})
        _step_index += 1

    def output(self, text, stream="stdout"):
        global _step_index
        _push({"index": _step_index, "type": "output", "text": str(text), "stream": stream,
               "frameId": _get_frame()["id"], "timestamp": _step_index})
        _step_index += 1

    def exception(self, error_type, message, stack_trace=""):
        global _step_index
        _push({"index": _step_index, "type": "exception", "errorType": error_type,
               "message": message, "stackTrace": stack_trace,
               "frameId": _get_frame()["id"], "timestamp": _step_index})
        _step_index += 1

    def get_trace(self):
        return {"steps": _steps, "frames": _frame_stack, "truncated": _truncated}


trace = _Trace()


# Intercept print()
_original_print = builtins.print

def _patched_print(*args, sep=" ", end="\n", file=None, flush=False):
    text = sep.join(str(a) for a in args)
    stream = "stderr" if file is sys.stderr else "stdout"
    trace.output(text + (end if end != "\n" else ""), stream)
    _original_print(*args, sep=sep, end=end, file=file, flush=flush)

builtins.print = _patched_print


# Write trace on exit
def _on_exit():
    try:
        with open("/tmp/trace.json", "w") as f:
            json.dump(trace.get_trace(), f)
    except Exception:
        pass

atexit.register(_on_exit)


# Intercept uncaught exceptions
import traceback as _traceback
_original_excepthook = sys.excepthook

def _excepthook(exc_type, exc_value, exc_tb):
    trace.exception(exc_type.__name__, str(exc_value), "".join(_traceback.format_tb(exc_tb)))
    _on_exit()
    _original_excepthook(exc_type, exc_value, exc_tb)

sys.excepthook = _excepthook

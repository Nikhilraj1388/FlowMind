/**
 * FlowMind Node.js trace collector — Section 7.5
 * Injected into Docker container at /opt/flowmind/trace-collector.js
 * Required by instrumented user code as: const __trace = require('/opt/flowmind/trace-collector');
 */
'use strict';

const MAX_STEPS = 10000;
const MAX_DEPTH = 500;
const MAX_ARRAY_LENGTH = 100;
const MAX_OBJECT_KEYS = 50;
const MAX_STRING_LENGTH = 1000;

const steps = [];
let stepIndex = 0;
const frameStack = [{ id: 'frame_0', name: '<global>', depth: 0, vars: {}, parentId: null }];
let frameCounter = 1;
let truncated = false;

function serialize(value, depth) {
  if (depth === undefined) depth = 0;
  if (depth > 5) return { type: 'object', value: '[Max Depth]' };
  if (value === null) return { type: 'null', value: null };
  if (value === undefined) return { type: 'undefined', value: undefined };
  const t = typeof value;
  if (t === 'number' || t === 'boolean') return { type: t, value: value };
  if (t === 'string') return { type: 'string', value: value.slice(0, MAX_STRING_LENGTH) };
  if (Array.isArray(value)) {
    return {
      type: 'array',
      value: value.slice(0, MAX_ARRAY_LENGTH).map(function(v) { return serialize(v, depth + 1); }),
      length: value.length,
    };
  }
  if (t === 'function') return { type: 'function', value: '[Function: ' + (value.name || 'anonymous') + ']' };
  if (t === 'object') {
    const entries = Object.entries(value).slice(0, MAX_OBJECT_KEYS);
    const obj = {};
    for (const pair of entries) {
      obj[pair[0]] = serialize(pair[1], depth + 1);
    }
    return { type: 'object', value: obj };
  }
  return { type: 'unknown', value: String(value) };
}

function getCurrentFrame() {
  return frameStack[frameStack.length - 1];
}

function getVariables() {
  const frame = getCurrentFrame();
  const vars = {};
  const entries = Object.entries(frame.vars);
  for (const pair of entries) {
    vars[pair[0]] = serialize(pair[1]);
  }
  return vars;
}

function push(step) {
  if (steps.length >= MAX_STEPS) {
    truncated = true;
    return;
  }
  steps.push(step);
}

const __trace = {
  line: function(lineNum) {
    push({ index: stepIndex++, type: 'line', line: lineNum, frameId: getCurrentFrame().id, variables: getVariables(), timestamp: stepIndex });
  },
  call: function(name, args) {
    if (frameStack.length >= MAX_DEPTH) return;
    const parentFrame = getCurrentFrame();
    const newFrame = {
      id: 'frame_' + (frameCounter++),
      name: name,
      depth: parentFrame.depth + 1,
      vars: Object.assign({}, args || {}),
      parentId: parentFrame.id,
    };
    frameStack.push(newFrame);
    const serializedArgs = {};
    const argEntries = Object.entries(args || {});
    for (const pair of argEntries) {
      serializedArgs[pair[0]] = serialize(pair[1]);
    }
    push({ index: stepIndex++, type: 'call', functionName: name, arguments: serializedArgs, frameId: newFrame.id, parentFrameId: parentFrame.id, depth: newFrame.depth, timestamp: stepIndex });
  },
  return: function(value) {
    const frame = frameStack.length > 1 ? frameStack.pop() : frameStack[0];
    push({ index: stepIndex++, type: 'return', functionName: frame.name, returnValue: serialize(value), frameId: frame.id, depth: frame.depth, timestamp: stepIndex });
    return value;
  },
  assign: function(name, oldVal, newVal) {
    getCurrentFrame().vars[name] = newVal;
    push({ index: stepIndex++, type: 'assign', variable: name, oldValue: serialize(oldVal), newValue: serialize(newVal), frameId: getCurrentFrame().id, timestamp: stepIndex });
    return newVal;
  },
  condition: function(expr, result, branch) {
    push({ index: stepIndex++, type: 'condition', expression: expr, result: !!result, branch: result ? 'true' : 'false', frameId: getCurrentFrame().id, timestamp: stepIndex });
  },
  loop: function(line, vars) {
    const serializedVars = {};
    if (vars) {
      const entries = Object.entries(vars);
      for (const pair of entries) {
        serializedVars[pair[0]] = serialize(pair[1]);
      }
    }
    push({ index: stepIndex++, type: 'loop_iter', loopLine: line, variables: serializedVars, frameId: getCurrentFrame().id, timestamp: stepIndex });
  },
  output: function(text, stream) {
    push({ index: stepIndex++, type: 'output', text: String(text), stream: stream || 'stdout', frameId: getCurrentFrame().id, timestamp: stepIndex });
  },
  exception: function(errorType, message, stackTrace) {
    push({ index: stepIndex++, type: 'exception', errorType: errorType, message: message, stackTrace: stackTrace, frameId: getCurrentFrame().id, timestamp: stepIndex });
  },
  getTrace: function() {
    return { steps: steps, frames: frameStack, truncated: truncated };
  },
};

// Intercept console.log/warn/error
const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

console.log = function() {
  const text = Array.from(arguments).map(function(a) { return typeof a === 'string' ? a : JSON.stringify(a); }).join(' ');
  __trace.output(text, 'stdout');
  originalLog.apply(console, arguments);
};
console.warn = function() {
  const text = Array.from(arguments).map(function(a) { return typeof a === 'string' ? a : JSON.stringify(a); }).join(' ');
  __trace.output(text, 'stderr');
  originalWarn.apply(console, arguments);
};
console.error = function() {
  const text = Array.from(arguments).map(function(a) { return typeof a === 'string' ? a : JSON.stringify(a); }).join(' ');
  __trace.output(text, 'stderr');
  originalError.apply(console, arguments);
};

// Write trace.json on process exit
process.on('exit', function() {
  try {
    require('fs').writeFileSync('/tmp/trace.json', JSON.stringify(__trace.getTrace()));
  } catch(e) { /* ignore */ }
});

process.on('uncaughtException', function(err) {
  __trace.exception(err.constructor.name, err.message, err.stack);
  try {
    require('fs').writeFileSync('/tmp/trace.json', JSON.stringify(__trace.getTrace()));
  } catch(e) { /* ignore */ }
  process.exit(1);
});

module.exports = __trace;

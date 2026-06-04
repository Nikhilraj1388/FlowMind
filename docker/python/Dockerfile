# FlowMind Python execution sandbox — Section 7.3
FROM python:3.12-alpine

# Create non-root user (GID 1001 to avoid conflicts)
RUN addgroup -g 1001 flowmind && \
    adduser -u 1001 -G flowmind -s /bin/sh -D flowmind && \
    mkdir -p /opt/flowmind && \
    chown -R flowmind:flowmind /opt/flowmind

COPY trace_collector.py /opt/flowmind/trace_collector.py
RUN chown flowmind:flowmind /opt/flowmind/trace_collector.py

USER flowmind
WORKDIR /tmp

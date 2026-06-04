# FlowMind Node.js execution sandbox — Section 7.3
FROM node:20-alpine

# Create non-root user for sandboxing (GID 1001 to avoid node base conflicts)
RUN addgroup -g 1001 flowmind && \
    adduser -u 1001 -G flowmind -s /bin/sh -D flowmind && \
    mkdir -p /opt/flowmind && \
    chown -R flowmind:flowmind /opt/flowmind

COPY trace-collector.js /opt/flowmind/trace-collector.js
RUN chown flowmind:flowmind /opt/flowmind/trace-collector.js

USER flowmind
WORKDIR /tmp

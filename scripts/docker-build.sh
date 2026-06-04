#!/bin/bash
set -e

echo "══════════════════════════════════════════"
echo "  FlowMind — Docker Image Builder"
echo "══════════════════════════════════════════"

echo ""
echo "📦 Building execution sandbox images..."
echo "────────────────────────────────────────"

echo "  → Node.js sandbox..."
docker build -t flowmind-node:latest ./docker/node
echo "  ✓ flowmind-node:latest"

echo "  → Python sandbox..."
docker build -t flowmind-python:latest ./docker/python
echo "  ✓ flowmind-python:latest"

echo ""
echo "🏗️  Building API image..."
echo "────────────────────────────────────────"
docker build -t flowmind-api:latest -f Dockerfile.api .
echo "  ✓ flowmind-api:latest"

echo ""
echo "══════════════════════════════════════════"
echo "  ✅ All images built successfully!"
echo "══════════════════════════════════════════"
echo ""
echo "Images:"
docker images | grep flowmind

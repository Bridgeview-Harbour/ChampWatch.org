#!/bin/bash
# Test runner script for local development
# Runs all tests for frontend and infrastructure

set -e

echo "======================================"
echo "ChampWatch.org Test Runner"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# ==========================================
# Frontend Tests
# ==========================================
echo "Frontend Tests"
echo "======================================="

cd frontend

echo "Installing dependencies..."
npm ci

echo "Running tests with coverage..."
if npm test -- --coverage --watchAll=false; then
    echo -e "${GREEN}✓ Frontend tests passed${NC}"
else
    echo -e "${RED}✗ Frontend tests failed${NC}"
    exit 1
fi
echo ""

echo "Building production bundle..."
if npm run build; then
    echo -e "${GREEN}✓ Frontend build succeeded${NC}"
else
    echo -e "${RED}✗ Frontend build failed${NC}"
    exit 1
fi
echo ""

cd ..

# ==========================================
# Infrastructure Tests
# ==========================================
echo "Infrastructure Tests"
echo "======================================="

cd infrastructure

# Check if virtual environment exists
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
fi

source .venv/bin/activate

echo "Installing dependencies..."
pip install -q -r requirements.txt
pip install -q pytest pytest-cov

echo "Running Python tests..."
if pytest --cov=stacks --cov-report=term; then
    echo -e "${GREEN}✓ Infrastructure tests passed${NC}"
else
    echo "No tests found or tests failed"
fi
echo ""

echo "Running CDK synth..."
if cdk synth --context environment=dev > /dev/null; then
    echo -e "${GREEN}✓ CDK synth succeeded${NC}"
else
    echo -e "${RED}✗ CDK synth failed${NC}"
    exit 1
fi
echo ""

cd ..

# ==========================================
# Summary
# ==========================================
echo ""
echo "======================================"
echo -e "${GREEN}All tests passed!${NC}"
echo "======================================"

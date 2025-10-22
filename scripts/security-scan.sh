#!/bin/bash
# Security scan script for local development
# Run comprehensive security checks before committing code

set -e

echo "======================================"
echo "ChampWatch.org Security Scan"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track if any checks fail
FAILED=0

# Function to print colored status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ $2${NC}"
    else
        echo -e "${RED}✗ $2${NC}"
        FAILED=1
    fi
}

# ==========================================
# Frontend Security Scans
# ==========================================
echo "Frontend Security Scans"
echo "======================================="

# Check if frontend directory exists
if [ ! -d "frontend" ]; then
    echo -e "${RED}Error: frontend directory not found${NC}"
    exit 1
fi

cd frontend

# npm audit
echo "Running npm audit..."
if npm audit --audit-level=moderate; then
    print_status 0 "npm audit passed"
else
    print_status 1 "npm audit found vulnerabilities"
fi
echo ""

# Check for high-risk packages (example)
echo "Checking for potentially risky dependencies..."
if npm list --depth=0 | grep -E '(eval|exec)'; then
    print_status 1 "Found potentially risky packages"
else
    print_status 0 "No obviously risky packages found"
fi
echo ""

cd ..

# ==========================================
# Infrastructure Security Scans
# ==========================================
echo "Infrastructure Security Scans"
echo "======================================="

# Check if infrastructure directory exists
if [ ! -d "infrastructure" ]; then
    echo -e "${RED}Error: infrastructure directory not found${NC}"
    exit 1
fi

cd infrastructure

# Check if virtual environment exists
if [ ! -d ".venv" ]; then
    echo -e "${YELLOW}Warning: Virtual environment not found. Creating...${NC}"
    python3 -m venv .venv
fi

# Activate virtual environment
source .venv/bin/activate

# Install security tools
echo "Installing security tools..."
pip install -q bandit safety pip-audit flake8 black

# Bandit security linting
echo "Running Bandit security linter..."
if bandit -r . -ll -f screen; then
    print_status 0 "Bandit passed"
else
    print_status 1 "Bandit found security issues"
fi
echo ""

# Safety vulnerability check
echo "Running Safety vulnerability check..."
if safety check; then
    print_status 0 "Safety check passed"
else
    print_status 1 "Safety found vulnerabilities"
fi
echo ""

# pip-audit
echo "Running pip-audit..."
if pip-audit; then
    print_status 0 "pip-audit passed"
else
    print_status 1 "pip-audit found vulnerabilities"
fi
echo ""

# Flake8 linting
echo "Running Flake8 linting..."
if flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics; then
    print_status 0 "Flake8 passed"
else
    print_status 1 "Flake8 found issues"
fi
echo ""

# Black formatting check
echo "Running Black format check..."
if black --check .; then
    print_status 0 "Black format check passed"
else
    print_status 1 "Black found formatting issues (run 'black .' to fix)"
fi
echo ""

cd ..

# ==========================================
# Secret Detection
# ==========================================
echo "Secret Detection"
echo "======================================="

# Check for common secret patterns
echo "Checking for exposed secrets..."
SECRET_PATTERNS=(
    "password\s*=\s*['\"][^'\"]*['\"]"
    "api[_-]?key\s*=\s*['\"][^'\"]*['\"]"
    "secret\s*=\s*['\"][^'\"]*['\"]"
    "token\s*=\s*['\"][^'\"]*['\"]"
    "aws[_-]?access[_-]?key"
    "AKIA[0-9A-Z]{16}"
)

SECRETS_FOUND=0
for pattern in "${SECRET_PATTERNS[@]}"; do
    if git grep -i -E "$pattern" -- ':(exclude).env' ':(exclude)*.md' ':(exclude)scripts/*' > /dev/null 2>&1; then
        SECRETS_FOUND=1
    fi
done

if [ $SECRETS_FOUND -eq 0 ]; then
    print_status 0 "No obvious secrets found in code"
else
    print_status 1 "Potential secrets found in code (review carefully)"
fi
echo ""

# ==========================================
# Summary
# ==========================================
echo ""
echo "======================================"
echo "Security Scan Complete"
echo "======================================"

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}All security checks passed!${NC}"
    exit 0
else
    echo -e "${RED}Some security checks failed. Please review and fix issues before committing.${NC}"
    echo ""
    echo "Tips:"
    echo "  - Run 'npm audit fix' in frontend/ to fix npm vulnerabilities"
    echo "  - Run 'black .' in infrastructure/ to auto-format Python code"
    echo "  - Review Bandit and Safety reports for security issues"
    echo "  - Update vulnerable dependencies"
    echo ""
    exit 1
fi

# Security Policy

## Overview

ChampWatch.org takes security seriously. This document outlines our security practices, vulnerability reporting procedures, and the automated security scanning implemented in our CI/CD pipeline.

## Automated Security Scanning

Every push and pull request triggers comprehensive security scans for both frontend and infrastructure code.

### Frontend Security Scans

#### 1. npm audit
Scans Node.js dependencies for known vulnerabilities.

**How to fix issues locally:**
```bash
cd frontend
npm audit
npm audit fix
```

#### 2. Snyk
Advanced vulnerability scanning with detailed remediation advice.

**Configuration required:**
- Set `SNYK_TOKEN` in GitHub Secrets
- Sign up at https://snyk.io

#### 3. Trivy
Multi-purpose security scanner for vulnerabilities and misconfigurations.

**Run locally:**
```bash
docker run --rm -v $(pwd):/app aquasec/trivy fs --severity HIGH,CRITICAL /app/frontend
```

#### 4. TruffleHog
Scans for exposed secrets and credentials in code.

**Run locally:**
```bash
docker run --rm -v $(pwd):/repo trufflesecurity/trufflehog:latest filesystem /repo/frontend
```

### Infrastructure Security Scans

#### 1. Bandit
Python security linter that identifies common security issues.

**Run locally:**
```bash
cd infrastructure
pip install bandit
bandit -r .
```

**Configuration:** `.bandit` file in repository root

#### 2. Safety
Checks Python dependencies against known security vulnerabilities.

**Run locally:**
```bash
cd infrastructure
pip install safety
safety check
```

#### 3. pip-audit
Audits Python packages for known vulnerabilities.

**Run locally:**
```bash
cd infrastructure
pip install pip-audit
pip-audit
```

#### 4. Trivy
Scans infrastructure code for vulnerabilities.

**Run locally:**
```bash
docker run --rm -v $(pwd):/app aquasec/trivy fs --severity HIGH,CRITICAL /app/infrastructure
```

### Code Quality Scans

#### 1. CodeQL
GitHub's semantic code analysis engine.

- Automatically enabled for public repositories
- Scans JavaScript/TypeScript and Python
- Results appear in Security tab

#### 2. SonarCloud (Optional)
Continuous code quality and security analysis.

**Configuration required:**
- Set `SONAR_TOKEN` in GitHub Secrets
- Configure at https://sonarcloud.io

#### 3. Flake8
Python linting for code quality.

**Run locally:**
```bash
cd infrastructure
pip install flake8
flake8 .
```

**Configuration:** `.flake8` file in repository root

#### 4. Black
Python code formatter for consistent style.

**Run locally:**
```bash
cd infrastructure
pip install black
black --check .
black .  # Auto-format
```

**Configuration:** `pyproject.toml`

### Dependency Review

Automatically reviews dependency changes in pull requests:
- Detects new vulnerabilities
- Identifies license issues
- Blocks problematic dependencies

**Blocked licenses:**
- GPL-2.0
- GPL-3.0

**Minimum severity to fail:** Moderate

## CI/CD Pipeline

### Workflow: `ci-test-security.yml`

**Triggers:**
- Push to `main`, `develop`, or `feature/**` branches
- Pull requests to `main` or `develop`
- Manual workflow dispatch

**Jobs:**

1. **frontend-test**
   - Runs ESLint linting
   - Executes test suite with coverage
   - Builds production bundle
   - Checks build size

2. **frontend-security**
   - npm audit
   - Snyk scanning
   - Trivy vulnerability scan
   - TruffleHog secret detection

3. **infrastructure-test**
   - Black code formatting check
   - Flake8 linting
   - MyPy type checking
   - Unit tests with coverage
   - CDK synth validation
   - CloudFormation template validation

4. **infrastructure-security**
   - Bandit security linting
   - Safety vulnerability check
   - pip-audit
   - Trivy vulnerability scan
   - Snyk Python scanning

5. **code-quality**
   - CodeQL analysis
   - SonarCloud scanning (if configured)

6. **dependency-review**
   - Reviews dependency changes in PRs
   - Checks for license compliance

7. **license-check**
   - Validates all dependency licenses
   - Generates compliance report

8. **generate-report**
   - Creates comprehensive summary
   - Uploads all artifacts

### Required GitHub Secrets

For full functionality, configure these secrets:

```
SNYK_TOKEN          # Optional: Snyk.io API token
SONAR_TOKEN         # Optional: SonarCloud token
```

### Viewing Results

**Security Tab:**
- Navigate to repository Security tab
- View Code scanning alerts
- Review Dependabot alerts

**Workflow Artifacts:**
- npm audit results (30 days)
- Bandit security reports (30 days)
- Safety vulnerability reports (30 days)
- License compliance reports (30 days)
- Test coverage reports (7 days)
- Build artifacts (7 days)

**Pull Request Summary:**
- Job status for all security checks
- Build size information
- Link to detailed logs

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

### Do NOT:
- Open a public GitHub issue
- Discuss the vulnerability publicly

### DO:
1. Email security reports to: security@bridgeviewharbour.com
2. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline:
- **Initial response:** Within 48 hours
- **Status update:** Within 7 days
- **Fix deployment:** Varies by severity

## Security Best Practices

### For Developers

1. **Never commit secrets**
   - Use environment variables
   - Use `.env` files (gitignored)
   - Use AWS Secrets Manager for production

2. **Keep dependencies updated**
   ```bash
   # Frontend
   cd frontend
   npm audit fix
   npm update

   # Infrastructure
   cd infrastructure
   pip list --outdated
   pip install --upgrade -r requirements.txt
   ```

3. **Review security warnings**
   - Check GitHub Security tab regularly
   - Address Dependabot alerts promptly
   - Review CodeQL findings

4. **Run security scans locally**
   - Before committing code
   - Before creating pull requests
   - Use provided scripts and commands

5. **Follow secure coding practices**
   - Validate all inputs
   - Use parameterized queries
   - Implement proper error handling
   - Follow principle of least privilege

### For Infrastructure

1. **AWS Resources**
   - Enable encryption at rest
   - Use private S3 buckets
   - Implement proper IAM policies
   - Enable CloudTrail logging

2. **CDK Best Practices**
   - Use `RemovalPolicy.RETAIN` for production
   - Enable versioning on S3 buckets
   - Use CloudFront for HTTPS
   - Implement WAF rules (future)

3. **Secrets Management**
   - Never hardcode credentials
   - Use AWS Systems Manager Parameter Store
   - Use AWS Secrets Manager
   - Rotate credentials regularly

## Compliance

### OWASP Top 10

We actively protect against OWASP Top 10 vulnerabilities:

1. **Broken Access Control:** CloudFront OAI, private S3
2. **Cryptographic Failures:** S3 encryption, HTTPS only
3. **Injection:** Input validation, parameterized queries
4. **Insecure Design:** Security by design principles
5. **Security Misconfiguration:** Automated scanning
6. **Vulnerable Components:** Dependency scanning
7. **Authentication Failures:** AWS IAM best practices
8. **Software Integrity Failures:** Signed commits, verified builds
9. **Logging Failures:** CloudWatch, CloudTrail
10. **SSRF:** Network isolation, security groups

### License Compliance

All dependencies are checked for license compatibility:

**Allowed licenses:**
- MIT
- Apache-2.0
- BSD-2-Clause
- BSD-3-Clause
- ISC

**Blocked licenses:**
- GPL-2.0
- GPL-3.0
- AGPL-3.0

## Security Updates

We monitor security advisories from:
- GitHub Security Advisories
- npm Security Advisories
- Python Security Advisories (PyPI)
- AWS Security Bulletins
- CVE databases

## Contact

**Security Team:** security@bridgeviewharbour.com
**General Contact:** info@bridgeviewharbour.com

## Acknowledgments

We appreciate responsible disclosure and will acknowledge security researchers who report vulnerabilities.

---

*Last Updated: 2025-10-22*

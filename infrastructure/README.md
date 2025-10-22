# ChampWatch.org Infrastructure

AWS CDK Python infrastructure for deploying ChampWatch.org.

## Overview

This directory contains AWS CDK infrastructure code written in Python for deploying and managing the ChampWatch.org application infrastructure.

### Architecture

- **Frontend Stack**: S3 + CloudFront for static React app hosting
- **Optional Backend Stack**: API Gateway + Lambda (future)

## Prerequisites

1. Python 3.8 or later
2. Node.js 14 or later (for AWS CDK CLI)
3. AWS CLI configured with appropriate credentials
4. AWS CDK CLI installed globally

### Install AWS CDK CLI

```bash
npm install -g aws-cdk
```

### Verify Installation

```bash
cdk --version
```

## Setup

### 1. Create Python Virtual Environment

```bash
cd infrastructure
python3 -m venv .venv
```

### 2. Activate Virtual Environment

**macOS/Linux:**
```bash
source .venv/bin/activate
```

**Windows:**
```bash
.venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Bootstrap CDK (First Time Only)

Bootstrap your AWS account for CDK deployment:

```bash
cdk bootstrap aws://ACCOUNT-NUMBER/REGION
```

Example:
```bash
cdk bootstrap aws://123456789012/us-east-1
```

## Project Structure

```
infrastructure/
├── app.py                      # CDK app entry point
├── cdk.json                    # CDK configuration
├── requirements.txt            # Python dependencies
├── stacks/
│   ├── __init__.py
│   ├── config.py              # Environment configuration
│   └── frontend_stack.py      # S3 + CloudFront stack
└── README.md                  # This file
```

## Environments

Three environments are supported:

- **dev**: Development environment (default CloudFront domain)
- **staging**: Staging environment (staging.champwatch.org)
- **prod**: Production environment (champwatch.org)

Configuration for each environment is managed in `stacks/config.py`.

## Deployment

### Build Frontend First

Before deploying infrastructure, build the React app:

```bash
cd ../frontend
npm install
npm run build
```

This creates the `frontend/build` directory that CDK will deploy.

### Deploy to Development

```bash
cd ../infrastructure
cdk deploy --context environment=dev
```

### Deploy to Staging

```bash
cdk deploy --context environment=staging
```

### Deploy to Production

```bash
cdk deploy --context environment=prod
```

### Deploy All Stacks

```bash
cdk deploy --all --context environment=prod
```

## CDK Commands

### Synthesize CloudFormation Template

```bash
cdk synth --context environment=dev
```

### Show Differences

```bash
cdk diff --context environment=dev
```

### List All Stacks

```bash
cdk list
```

### Destroy Stack

```bash
cdk destroy --context environment=dev
```

**⚠️ Warning**: This will delete all resources. Use with caution!

## Outputs

After deployment, CDK outputs important values:

- **WebsiteBucketName**: S3 bucket name
- **DistributionId**: CloudFront distribution ID
- **DistributionDomainName**: CloudFront domain
- **WebsiteURL**: Full website URL

## Custom Domain Setup

To use a custom domain (champwatch.org):

1. **Register Domain**: Ensure domain is registered (Route53 or external)

2. **Create Hosted Zone**: If using Route53
   ```bash
   aws route53 create-hosted-zone --name champwatch.org
   ```

3. **Request ACM Certificate**: In us-east-1 region (required for CloudFront)
   ```bash
   aws acm request-certificate \
     --domain-name champwatch.org \
     --subject-alternative-names www.champwatch.org \
     --validation-method DNS \
     --region us-east-1
   ```

4. **Update Configuration**: Add certificate ARN to `stacks/config.py`

5. **Uncomment Custom Domain Code**: In `frontend_stack.py`, uncomment the `_setup_custom_domain()` implementation

6. **Deploy**:
   ```bash
   cdk deploy --context environment=prod
   ```

## Environment Variables

For production, set environment variables in GitHub Actions secrets:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `REACT_APP_WEATHERLINK_API_KEY`
- `REACT_APP_WEATHERLINK_API_SECRET`
- `REACT_APP_WEATHERLINK_STATION_ID`

## CI/CD with GitHub Actions

Deployment is automated via GitHub Actions workflows in `.github/workflows/`.

- **Frontend Deploy**: Automatically deploys on push to main
- **Infrastructure Deploy**: Deploys CDK stack changes

See `.github/workflows/` for workflow configurations.

## Monitoring and Logs

### CloudFront Logs

CloudFront logging is enabled for staging and production environments. Logs are stored in a separate S3 bucket.

### Access Logs

```bash
aws s3 ls s3://champwatch-prod-logs/cloudfront/
```

### CloudWatch Metrics

View CloudFront metrics in AWS Console:
- Navigate to CloudFront > Distributions > [Your Distribution] > Monitoring

## Troubleshooting

### Build Directory Not Found

**Error**: `frontend/build` directory doesn't exist

**Solution**: Build the React app first:
```bash
cd frontend
npm run build
```

### Permission Denied

**Error**: CDK deployment fails with permission errors

**Solution**: Ensure your AWS credentials have sufficient permissions:
- S3 full access
- CloudFront full access
- CloudFormation full access
- IAM permissions for role creation

### Certificate Validation

**Error**: ACM certificate pending validation

**Solution**:
1. Check email for validation link (email validation)
2. Add DNS records (DNS validation)
3. Wait for validation to complete before deploying

## Cost Estimation

Estimated monthly costs for production:

- **S3 Storage**: ~$0.50 (for 20GB of data)
- **CloudFront**: ~$5-20 (depends on traffic)
- **Route53**: ~$0.50 per hosted zone
- **ACM Certificate**: Free
- **Total**: ~$6-25/month for low-medium traffic

## Security

- S3 bucket is private (no public access)
- CloudFront uses Origin Access Identity (OAI)
- HTTPS enforced via CloudFront
- S3 bucket encryption enabled
- Versioning enabled for production

## Support

For infrastructure questions:
- Review AWS CDK documentation: https://docs.aws.amazon.com/cdk/
- Check CloudFormation events in AWS Console
- Review CDK stack outputs for important values

## Future Enhancements

- [ ] Add backend API stack (API Gateway + Lambda)
- [ ] Implement WAF rules for security
- [ ] Add CloudWatch alarms and monitoring
- [ ] Implement blue/green deployments
- [ ] Add backup and disaster recovery

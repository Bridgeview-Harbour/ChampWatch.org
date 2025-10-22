#!/usr/bin/env python3
"""
ChampWatch.org Infrastructure

AWS CDK app for deploying ChampWatch.org infrastructure including:
- S3 + CloudFront for static site hosting
- Optional API Gateway + Lambda for backend services
- Route53 DNS configuration
- ACM certificates
"""

import os
from aws_cdk import App, Environment
from stacks.frontend_stack import FrontendStack
from stacks.config import get_config

app = App()

# Get environment from context or environment variable
env_name = app.node.try_get_context("environment") or os.environ.get("ENVIRONMENT", "dev")
config = get_config(env_name)

# AWS environment configuration
env = Environment(
    account=os.environ.get("CDK_DEFAULT_ACCOUNT"),
    region=os.environ.get("CDK_DEFAULT_REGION", "us-east-1")
)

# Deploy frontend stack (S3 + CloudFront)
frontend_stack = FrontendStack(
    app,
    f"ChampWatch-Frontend-{env_name}",
    config=config,
    env=env,
    description=f"ChampWatch.org frontend infrastructure ({env_name})"
)

app.synth()

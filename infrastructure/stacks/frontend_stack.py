"""
Frontend Stack for ChampWatch.org

Deploys:
- S3 bucket for static website hosting
- CloudFront distribution with HTTPS
- Optional custom domain with Route53 and ACM certificate
"""

from aws_cdk import (
    Stack,
    aws_s3 as s3,
    aws_cloudfront as cloudfront,
    aws_cloudfront_origins as origins,
    aws_s3_deployment as s3_deployment,
    aws_certificatemanager as acm,
    aws_route53 as route53,
    aws_route53_targets as targets,
    RemovalPolicy,
    Duration,
    CfnOutput,
)
from constructs import Construct
from .config import EnvironmentConfig


class FrontendStack(Stack):
    """
    Frontend infrastructure stack for ChampWatch.org

    Creates S3 bucket + CloudFront distribution for hosting the React app
    """

    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        config: EnvironmentConfig,
        **kwargs
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        self.config = config

        # Create S3 bucket for website hosting
        self.website_bucket = self._create_website_bucket()

        # Create CloudFront distribution
        self.distribution = self._create_cloudfront_distribution()

        # Deploy website files
        self._deploy_website_files()

        # Set up custom domain if configured
        if config.domain_name:
            self._setup_custom_domain()

        # Output important values
        self._create_outputs()

    def _create_website_bucket(self) -> s3.Bucket:
        """Create S3 bucket for website hosting"""

        bucket = s3.Bucket(
            self,
            "WebsiteBucket",
            bucket_name=f"champwatch-{self.config.environment}-website",
            public_read_access=False,  # CloudFront will access via OAI
            block_public_access=s3.BlockPublicAccess.BLOCK_ALL,
            removal_policy=RemovalPolicy.RETAIN if self.config.environment == "prod"
            else RemovalPolicy.DESTROY,
            auto_delete_objects=self.config.environment != "prod",
            encryption=s3.BucketEncryption.S3_MANAGED,
            versioned=self.config.environment == "prod",
        )

        return bucket

    def _create_cloudfront_distribution(self) -> cloudfront.Distribution:
        """Create CloudFront distribution"""

        # Origin Access Identity for S3
        origin_access_identity = cloudfront.OriginAccessIdentity(
            self,
            "OAI",
            comment=f"ChampWatch.org {self.config.environment} OAI"
        )

        # Grant CloudFront read access to S3 bucket
        self.website_bucket.grant_read(origin_access_identity)

        # CloudFront distribution
        distribution = cloudfront.Distribution(
            self,
            "Distribution",
            default_root_object="index.html",
            default_behavior=cloudfront.BehaviorOptions(
                origin=origins.S3Origin(
                    self.website_bucket,
                    origin_access_identity=origin_access_identity
                ),
                viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                cache_policy=cloudfront.CachePolicy.CACHING_OPTIMIZED,
                compress=True,
            ),
            price_class=getattr(
                cloudfront.PriceClass,
                self.config.cloudfront_price_class
            ),
            error_responses=[
                # Handle React Router - redirect 404s to index.html
                cloudfront.ErrorResponse(
                    http_status=404,
                    response_http_status=200,
                    response_page_path="/index.html",
                    ttl=Duration.minutes(5),
                ),
                cloudfront.ErrorResponse(
                    http_status=403,
                    response_http_status=200,
                    response_page_path="/index.html",
                    ttl=Duration.minutes(5),
                ),
            ],
            enable_logging=self.config.enable_cloudfront_logging,
            comment=f"ChampWatch.org {self.config.environment}",
        )

        return distribution

    def _deploy_website_files(self) -> None:
        """Deploy website files from build directory to S3"""

        s3_deployment.BucketDeployment(
            self,
            "DeployWebsite",
            sources=[s3_deployment.Source.asset(self.config.frontend_build_dir)],
            destination_bucket=self.website_bucket,
            distribution=self.distribution,
            distribution_paths=["/*"],
            prune=True,  # Remove old files
            memory_limit=512,
        )

    def _setup_custom_domain(self) -> None:
        """Set up custom domain with Route53 and ACM certificate"""

        # This is a placeholder - you'll need to:
        # 1. Create/import ACM certificate
        # 2. Look up hosted zone
        # 3. Create Route53 alias record

        # Example implementation (commented out):
        """
        # Look up hosted zone
        hosted_zone = route53.HostedZone.from_lookup(
            self,
            "HostedZone",
            domain_name="champwatch.org"
        )

        # Create/import certificate
        certificate = acm.Certificate.from_certificate_arn(
            self,
            "Certificate",
            self.config.certificate_arn
        )

        # Add to CloudFront distribution
        self.distribution.add_behavior(
            path_pattern="*",
            origin=origins.S3Origin(self.website_bucket),
            viewer_protocol_policy=cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        )

        # Create Route53 alias
        route53.ARecord(
            self,
            "AliasRecord",
            zone=hosted_zone,
            target=route53.RecordTarget.from_alias(
                targets.CloudFrontTarget(self.distribution)
            ),
            record_name=self.config.domain_name,
        )
        """
        pass

    def _create_outputs(self) -> None:
        """Create CloudFormation outputs"""

        CfnOutput(
            self,
            "WebsiteBucketName",
            value=self.website_bucket.bucket_name,
            description="S3 bucket name for website files",
        )

        CfnOutput(
            self,
            "DistributionId",
            value=self.distribution.distribution_id,
            description="CloudFront distribution ID",
        )

        CfnOutput(
            self,
            "DistributionDomainName",
            value=self.distribution.distribution_domain_name,
            description="CloudFront distribution domain name",
        )

        CfnOutput(
            self,
            "WebsiteURL",
            value=f"https://{self.distribution.distribution_domain_name}",
            description="Website URL",
        )

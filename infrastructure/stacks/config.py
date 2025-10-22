"""
Configuration management for ChampWatch.org infrastructure

Manages environment-specific configurations for dev, staging, and production
"""

from dataclasses import dataclass
from typing import Optional


@dataclass
class EnvironmentConfig:
    """Environment-specific configuration"""

    environment: str
    domain_name: Optional[str] = None
    certificate_arn: Optional[str] = None
    enable_cloudfront_logging: bool = False
    cloudfront_price_class: str = "PriceClass_100"

    # Frontend build settings
    frontend_build_dir: str = "../frontend/build"

    # WeatherLink API settings (optional backend)
    enable_weather_api: bool = False

    # Monitoring and alerts
    enable_monitoring: bool = False
    alert_email: Optional[str] = None


def get_config(environment: str) -> EnvironmentConfig:
    """
    Get configuration for specified environment

    Args:
        environment: Environment name (dev, staging, prod)

    Returns:
        EnvironmentConfig object
    """
    configs = {
        "dev": EnvironmentConfig(
            environment="dev",
            domain_name=None,  # Use CloudFront default domain
            enable_cloudfront_logging=False,
            cloudfront_price_class="PriceClass_100",  # US, Europe only
            enable_monitoring=False,
        ),
        "staging": EnvironmentConfig(
            environment="staging",
            domain_name="staging.champwatch.org",  # Update with your domain
            enable_cloudfront_logging=True,
            cloudfront_price_class="PriceClass_100",
            enable_monitoring=True,
            alert_email="alerts@bridgeviewharbour.com",
        ),
        "prod": EnvironmentConfig(
            environment="prod",
            domain_name="champwatch.org",  # Update with your domain
            enable_cloudfront_logging=True,
            cloudfront_price_class="PriceClass_All",  # Global distribution
            enable_monitoring=True,
            alert_email="alerts@bridgeviewharbour.com",
            enable_weather_api=True,
        ),
    }

    if environment not in configs:
        raise ValueError(
            f"Unknown environment: {environment}. "
            f"Valid options: {', '.join(configs.keys())}"
        )

    return configs[environment]

# ChampWatch.org

> Live webcam and weather monitoring for Champ, the Lake Champlain sea monster, from Bridgeview Harbour Marina in Port Henry, NY.

[![Deploy Infrastructure](https://github.com/Bridgeview-Harbour/ChampWatch.org/workflows/Deploy%20Infrastructure/badge.svg)](https://github.com/Bridgeview-Harbour/ChampWatch.org/actions)
[![Deploy Frontend](https://github.com/Bridgeview-Harbour/ChampWatch.org/workflows/Deploy%20Frontend/badge.svg)](https://github.com/Bridgeview-Harbour/ChampWatch.org/actions)

## Overview

ChampWatch.org is a modern React-based website featuring live webcam and weather data from Bulwagga Bay, the historic location of the first documented Champ sighting in 1819. The site drives traffic to [Bridgeview Harbour Marina](https://bridgeviewharbour.com)'s website and online store.

### Features

- 📹 **Live Webcam** - Underwater and surface camera feeds from Bulwagga Bay
- 🌤️ **Real-time Weather** - Live data from Davis WeatherLink weather station at the marina
- 📱 **Mobile-First Design** - Responsive React app with Bootstrap
- ⚡ **Fast & Secure** - Deployed on AWS CloudFront CDN with HTTPS
- 🎯 **Conversion Optimized** - Multiple CTAs driving traffic to marina site/store

## Repository Structure

```
ChampWatch.org/
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # React components (Navigation, Footer, WeatherWidget)
│   │   ├── pages/         # Page components (Home, About, AboutChamp)
│   │   └── services/      # API services (WeatherLink integration)
│   ├── public/
│   └── package.json
│
├── infrastructure/        # AWS CDK Python infrastructure
│   ├── stacks/           # CDK stack definitions
│   │   ├── frontend_stack.py    # S3 + CloudFront
│   │   └── config.py             # Environment configs
│   ├── app.py            # CDK app entry point
│   ├── cdk.json          # CDK configuration
│   └── requirements.txt  # Python dependencies
│
└── .github/
    └── workflows/        # GitHub Actions CI/CD
        ├── deploy-infrastructure.yml
        ├── deploy-frontend.yml
        └── pr-validation.yml
```

## Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **AWS CLI** configured with credentials
- **AWS CDK CLI** installed globally (`npm install -g aws-cdk`)

### Local Development

#### 1. Frontend Development

```bash
cd frontend
npm install
npm start
```

Runs the React app at http://localhost:3000

#### 2. Configure Weather API (Optional)

Copy `.env.example` to `.env` and add your Davis WeatherLink API credentials:

```bash
cd frontend
cp .env.example .env
# Edit .env with your credentials
```

See `frontend/WEATHERLINK_SETUP.md` for detailed setup instructions.

### Infrastructure Setup

#### 1. Install Dependencies

```bash
cd infrastructure
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

#### 2. Bootstrap CDK (First Time Only)

```bash
cdk bootstrap aws://ACCOUNT-NUMBER/REGION
```

#### 3. Deploy Infrastructure

```bash
# Build frontend first
cd ../frontend
npm run build

# Deploy to dev environment
cd ../infrastructure
cdk deploy --context environment=dev
```

See `infrastructure/README.md` for detailed deployment instructions.

## Deployment

### Automated Deployment (GitHub Actions)

Deployment is automated via GitHub Actions:

- **Frontend Changes**: Pushing to `main` automatically builds and deploys frontend to S3/CloudFront
- **Infrastructure Changes**: Updates to `infrastructure/` directory deploy CDK stacks
- **Pull Requests**: Automatically validated with tests, linting, and security scans

### Required GitHub Secrets

Configure these secrets in your GitHub repository:

```
AWS_ACCESS_KEY_ID              # AWS credentials
AWS_SECRET_ACCESS_KEY          # AWS credentials
REACT_APP_WEATHERLINK_API_KEY  # WeatherLink API key
REACT_APP_WEATHERLINK_API_SECRET
REACT_APP_WEATHERLINK_STATION_ID
```

### Manual Deployment

#### Deploy Frontend Only

```bash
cd frontend
npm run build

# Upload to S3
aws s3 sync build/ s3://champwatch-prod-website --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

#### Deploy Infrastructure

```bash
cd infrastructure
cdk deploy --all --context environment=prod
```

## Environments

Three environments are configured:

| Environment | Domain | Purpose |
|------------|--------|---------|
| **dev** | CloudFront default | Development testing |
| **staging** | staging.champwatch.org | Pre-production validation |
| **prod** | champwatch.org | Production site |

Environment configuration is managed in `infrastructure/stacks/config.py`.

## Technology Stack

### Frontend
- **Framework**: React 18
- **UI Library**: React Bootstrap
- **Routing**: React Router v6
- **Weather API**: Davis WeatherLink v2 API
- **Styling**: Bootstrap 5 + Custom CSS

### Infrastructure
- **IaC**: AWS CDK (Python)
- **Hosting**: Amazon S3 + CloudFront
- **CDN**: CloudFront with custom domain
- **CI/CD**: GitHub Actions

### AWS Services
- Amazon S3 - Static website hosting
- Amazon CloudFront - CDN and HTTPS
- AWS Certificate Manager - SSL/TLS certificates
- Amazon Route53 - DNS (optional)

## Development

### Frontend Scripts

```bash
npm start          # Start development server
npm test           # Run tests
npm run build      # Production build
npm run lint       # Lint code (if configured)
```

### Infrastructure Commands

```bash
cdk synth          # Generate CloudFormation template
cdk diff           # Show infrastructure changes
cdk deploy         # Deploy stack
cdk destroy        # Delete stack (careful!)
```

## Features & Pages

### Home Page
- Hero section with live webcam placeholder
- Real-time weather widget from Davis WeatherLink station
- "Why ChampWatch" feature section
- Multiple CTAs to marina website and store

### About Page
- Mission and technology overview
- Detailed info about Bridgeview Harbour Marina
- Port Henry, NY location details
- Call-to-action sections

### About Champ Page
- Legend history and Native American origins
- 1819 Bulwagga Bay sighting by Captain Crum
- Samuel de Champlain connection (with historical accuracy notes)
- Recent 2024 drone footage
- Lake Champlain facts

## Weather Integration

The site displays live weather data from a Davis WeatherLink weather station at Bridgeview Harbour Marina:

- Current temperature and "feels like"
- Wind speed, gusts, and direction
- Humidity and barometric pressure
- Daily rainfall and rain rate
- UV index and solar radiation
- Dynamic weather emoji

See `frontend/WEATHERLINK_SETUP.md` for complete setup documentation.

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run tests: `npm test`
4. Submit a pull request

Pull requests automatically trigger validation workflows.

## Security

- S3 buckets are private (no public access)
- CloudFront uses Origin Access Identity (OAI)
- HTTPS enforced via CloudFront
- S3 encryption enabled
- Environment variables for secrets
- Automated security scanning in PRs

### Security Note: Weather API Credentials

⚠️ **Production Best Practice**: For maximum security, implement a backend proxy API to store WeatherLink credentials server-side rather than in client environment variables.

## License

See [LICENSE](LICENSE) file for details.

## Support

- **Frontend Issues**: Check `frontend/README.md`
- **Infrastructure Issues**: Check `infrastructure/README.md`
- **Weather Setup**: See `frontend/WEATHERLINK_SETUP.md`
- **AWS Documentation**: https://docs.aws.amazon.com/cdk/

## About

ChampWatch.org is hosted by [Bridgeview Harbour Marina](https://bridgeviewharbour.com) in Port Henry, NY, at the historic location of the first documented Champ sighting in Bulwagga Bay.

**Location**: 4 Dock Street, Port Henry, NY 12974

---

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Artistic_representation_of_Sandra_Mansi%27s_1977_photograph_of_%22Champ%22_lake_monster.jpg" alt="Artist's Depiction of Sandra Mansi's 1977 Champ Photograph" width="600">
</p>

<p align="center">
  <em>Artist's depiction of Sandra Mansi's famous 1977 photograph of "Champ"</em>
</p>

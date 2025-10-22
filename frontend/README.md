# ChampWatch.org Frontend

React application for ChampWatch.org - live webcam and weather monitoring for Champ, the Lake Champlain sea monster.

## Overview

This is the frontend React application for ChampWatch.org, built with Create React App, React Bootstrap, and integrating with the Davis WeatherLink API for live weather data.

## Features

- **React 18** with modern hooks and functional components
- **React Router v6** for client-side routing
- **React Bootstrap** for responsive UI components
- **Davis WeatherLink API** integration for live weather
- **Mobile-first** responsive design
- **SEO-optimized** with proper meta tags
- **PWA-ready** with service workers

## Prerequisites

- Node.js 18+ and npm
- Davis WeatherLink API credentials (optional, for weather widget)

## Installation

```bash
npm install
```

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

The page will reload when you make changes. You may also see lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. The build is optimized and ready for deployment.

## Project Structure

```
frontend/
├── public/                  # Static assets
│   ├── index.html          # HTML template
│   ├── manifest.json       # PWA manifest
│   └── favicon.ico
│
├── src/
│   ├── components/         # Reusable React components
│   │   ├── Navigation.js   # Site navigation
│   │   ├── Footer.js       # Site footer
│   │   └── WeatherWidget.js # Weather display
│   │
│   ├── pages/              # Page components
│   │   ├── Home.js         # Home page
│   │   ├── About.js        # About page
│   │   └── AboutChamp.js   # About Champ page
│   │
│   ├── services/           # API services
│   │   └── weatherService.js # WeatherLink API integration
│   │
│   ├── App.js              # Main app component
│   ├── App.css             # Global styles
│   ├── index.js            # Entry point
│   └── index.css           # Base styles
│
├── .env.example            # Environment variables template
├── .env                    # Local environment variables (gitignored)
├── package.json
└── README.md               # This file
```

## Configuration

### Weather API Setup

To enable live weather data from the Davis WeatherLink station:

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Get your WeatherLink API credentials at https://www.weatherlink.com/account

3. Edit `.env` and add your credentials:
   ```env
   REACT_APP_WEATHERLINK_API_KEY=your_api_key_here
   REACT_APP_WEATHERLINK_API_SECRET=your_api_secret_here
   REACT_APP_WEATHERLINK_STATION_ID=your_station_id_here
   ```

4. Restart the development server

See `WEATHERLINK_SETUP.md` for detailed setup instructions.

### Environment Variables

All React environment variables must be prefixed with `REACT_APP_`:

- `REACT_APP_WEATHERLINK_API_KEY` - WeatherLink API key
- `REACT_APP_WEATHERLINK_API_SECRET` - WeatherLink API secret
- `REACT_APP_WEATHERLINK_STATION_ID` - Weather station ID

## Pages

### Home (`/`)
- Hero section with webcam and live weather
- "Why ChampWatch" feature section
- CTAs to Bridgeview Harbour Marina

### About (`/about`)
- ChampWatch mission and technology
- Bridgeview Harbour Marina information
- Port Henry, NY location details

### About Champ (`/about-champ`)
- Champ legend history
- 1819 Bulwagga Bay sighting
- Modern sightings and evidence
- Lake Champlain facts

## Components

### Navigation
Responsive navbar with links to all pages and marina website/store.

### Footer
Site footer with quick links, marina contact info, and copyright.

### WeatherWidget
Displays live weather data from Davis WeatherLink station:
- Temperature and "feels like"
- Wind speed, gusts, direction
- Humidity and pressure
- Rainfall
- UV index
- Dynamic weather emoji

## Services

### weatherService.js
Handles WeatherLink v2 API integration:
- HMAC-SHA-256 authentication
- Data fetching and parsing
- Helper functions for weather display
- Auto-refresh every 5 minutes

## Styling

- **Bootstrap 5** via React Bootstrap
- **Custom CSS** in `App.css`
- **Mobile-first** responsive design
- **Smooth animations** and transitions
- **Accessible** color contrast and navigation

## Deployment

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `build/` directory.

### Deploy to AWS

The application is automatically deployed to AWS S3 + CloudFront via GitHub Actions when pushing to `main` branch.

Manual deployment:
```bash
# Build first
npm run build

# Deploy via CDK (from infrastructure directory)
cd ../infrastructure
cdk deploy --context environment=prod
```

See `../infrastructure/README.md` for deployment details.

## Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use meaningful component and variable names
- Add comments for complex logic

### State Management
- Use React hooks (useState, useEffect, etc.)
- No global state library currently (Redux, etc.)
- Keep state as local as possible

### Testing
- Write tests for components
- Test user interactions
- Mock API calls in tests

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- ES6+ features via transpilation

## Performance

- Code splitting with React Router
- Lazy loading for routes
- Optimized images
- CloudFront CDN delivery
- Gzip compression

## Troubleshooting

### Weather Widget Shows "Unavailable"
- Check that `.env` file exists with valid credentials
- Verify station is uploading data to WeatherLink.com
- Check browser console for API errors
- Restart development server after changing `.env`

### Build Errors
- Clear node_modules: `rm -rf node_modules package-lock.json && npm install`
- Clear build cache: `rm -rf build`
- Update dependencies: `npm update`

### Slow Development Server
- Clear React cache: `rm -rf node_modules/.cache`
- Reduce number of browser extensions
- Check for large files in public directory

## Learn More

- [React Documentation](https://reactjs.org/)
- [Create React App Documentation](https://create-react-app.dev/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [React Router](https://reactrouter.com/)
- [WeatherLink API](https://weatherlink.github.io/v2-api/)

## Contributing

1. Create a feature branch
2. Make changes and test locally
3. Run tests: `npm test`
4. Submit pull request

## Support

- For weather setup issues, see `WEATHERLINK_SETUP.md`
- For infrastructure issues, see `../infrastructure/README.md`
- For React/CRA issues, see Create React App documentation

## License

See `../LICENSE` for license information.

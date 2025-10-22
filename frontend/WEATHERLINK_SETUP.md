# WeatherLink API Setup Guide

This guide explains how to configure the Davis WeatherLink API integration for ChampWatch.org to display live weather data from your marina's weather station.

## Overview

ChampWatch.org uses the Davis WeatherLink v2 API to fetch real-time weather data from your Davis weather station at Bridgeview Harbour Marina. The integration displays:

- Current temperature and "feels like" temperature
- Wind speed, gusts, and direction
- Humidity and barometric pressure
- Dew point
- Daily rainfall and rain rate
- UV index and solar radiation
- Weather conditions with emoji icons

## Prerequisites

1. A Davis WeatherLink-enabled weather station (e.g., Vantage Pro2, Vantage Vue, WeatherLink Live)
2. Active WeatherLink.com account with your station registered
3. Station must be uploading data to WeatherLink.com

## Getting Your API Credentials

### Step 1: Access Your WeatherLink Account

1. Go to [https://www.weatherlink.com](https://www.weatherlink.com)
2. Log in with your account credentials

### Step 2: Generate API Key and Secret

1. Navigate to your account settings
2. Look for the "API" or "Developer" section
3. Generate a new v2 API Key and API Secret
4. **Important:** Save both the API Key and API Secret immediately - the secret will only be shown once!

### Step 3: Find Your Station ID

1. In your WeatherLink account, go to your station's dashboard
2. The Station ID is typically visible in the URL or station details
3. It will be a numeric ID (e.g., 12345)

## Configuration

### Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Edit the `.env` file and add your credentials:

```env
REACT_APP_WEATHERLINK_API_KEY=your_actual_api_key_here
REACT_APP_WEATHERLINK_API_SECRET=your_actual_api_secret_here
REACT_APP_WEATHERLINK_STATION_ID=your_station_id_here
```

**Example:**
```env
REACT_APP_WEATHERLINK_API_KEY=abcdef123456789
REACT_APP_WEATHERLINK_API_SECRET=xyz789secret456key
REACT_APP_WEATHERLINK_STATION_ID=98765
```

### Security Note

The `.env` file is gitignored and will not be committed to version control. However, for production deployment:

**⚠️ IMPORTANT:** For maximum security, API credentials should be stored server-side, not in the client application. Consider implementing a backend proxy API that:
- Stores credentials securely on the server
- Makes authenticated requests to WeatherLink API
- Returns formatted data to the frontend
- Prevents credential exposure in client-side code

## Testing the Integration

1. Ensure your `.env` file is configured with valid credentials
2. Start the development server:
   ```bash
   npm start
   ```
3. Navigate to the home page
4. The weather widget should display live data from your station
5. Weather updates automatically every 5 minutes

## Troubleshooting

### "Weather data unavailable" message

**Possible causes:**
- API credentials not configured in `.env` file
- Invalid API Key or Secret
- Station ID is incorrect
- Station is not uploading data to WeatherLink.com
- API rate limits exceeded

**Solutions:**
1. Verify all credentials in `.env` are correct
2. Check that your station is online and uploading data at WeatherLink.com
3. Restart the development server after changing `.env` values
4. Check browser console (F12) for detailed error messages

### API Authentication Errors

If you see "401 Unauthorized" or signature errors:
- Double-check your API Key and Secret are exactly as shown in WeatherLink
- Ensure there are no extra spaces or quotes in the `.env` file
- Verify your system time is accurate (HMAC signatures require accurate timestamps)

### No Data Displayed

If authentication works but no data appears:
- Verify your Station ID is correct
- Check that your station has recent data on WeatherLink.com
- Review the browser console for parsing errors
- Ensure your station is actively transmitting to WeatherLink

## API Rate Limits

The WeatherLink v2 API has rate limits:
- Be mindful of request frequency
- Current implementation fetches every 5 minutes (well within limits)
- Adjust `fetchWeather` interval in `WeatherWidget.js` if needed

## API Documentation

For complete API documentation, visit:
- **Official Docs:** [https://weatherlink.github.io/v2-api/](https://weatherlink.github.io/v2-api/)
- **API Reference:** [https://weatherlink.github.io/v2-api/api-reference](https://weatherlink.github.io/v2-api/api-reference)
- **GitHub:** [https://github.com/weatherlink/v2-api](https://github.com/weatherlink/v2-api)

## Files Modified

The weather integration consists of:

- `src/services/weatherService.js` - API service with authentication and data parsing
- `src/components/WeatherWidget.js` - React component displaying weather data
- `src/pages/Home.js` - Home page using the weather widget
- `.env` - Environment variables (gitignored, create from .env.example)
- `.env.example` - Template for environment variables

## Support

For WeatherLink API issues:
- Contact Davis Instruments support
- Visit [https://support.davisinstruments.com](https://support.davisinstruments.com)

For ChampWatch.org implementation questions:
- Review the code in `src/services/weatherService.js` for detailed comments
- Check the browser console for error messages
- Verify your station is working correctly on WeatherLink.com first

## Production Deployment

When deploying to production (AWS Amplify):

1. Set environment variables in Amplify Console:
   - Go to App Settings > Environment Variables
   - Add: `REACT_APP_WEATHERLINK_API_KEY`
   - Add: `REACT_APP_WEATHERLINK_API_SECRET`
   - Add: `REACT_APP_WEATHERLINK_STATION_ID`

2. Redeploy the application for changes to take effect

3. **Consider implementing a backend proxy** for enhanced security (recommended for production)

## Weather Station Maintenance

For optimal display:
- Keep your weather station properly maintained
- Ensure reliable internet connectivity for uploads
- Verify data is updating regularly on WeatherLink.com
- Clean sensors periodically for accurate readings

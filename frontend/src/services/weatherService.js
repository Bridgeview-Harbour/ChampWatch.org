/**
 * WeatherLink v2 API Service
 *
 * Fetches real-time weather data from Davis WeatherLink weather station
 * Documentation: https://weatherlink.github.io/v2-api/
 *
 * SECURITY NOTE: In production, API credentials should be stored server-side
 * and requests proxied through a backend API to prevent credential exposure.
 * For development, credentials are stored in .env file (gitignored).
 */

import CryptoJS from 'crypto-js';

const API_BASE_URL = 'https://api.weatherlink.com/v2';

class WeatherLinkService {
  constructor() {
    this.apiKey = process.env.REACT_APP_WEATHERLINK_API_KEY;
    this.apiSecret = process.env.REACT_APP_WEATHERLINK_API_SECRET;
    this.stationId = process.env.REACT_APP_WEATHERLINK_STATION_ID;
  }

  /**
   * Generate API signature for authentication
   * @param {string} endpoint - API endpoint path
   * @param {number} timestamp - Unix timestamp
   * @returns {string} HMAC-SHA-256 signature
   */
  generateSignature(endpoint, timestamp) {
    const parameters = `api-key${this.apiKey}t${timestamp}`;
    const data = `${endpoint}${parameters}`;
    return CryptoJS.HmacSHA256(data, this.apiSecret).toString();
  }

  /**
   * Make authenticated request to WeatherLink API
   * @param {string} endpoint - API endpoint path
   * @returns {Promise<Object>} API response data
   */
  async makeRequest(endpoint) {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = this.generateSignature(endpoint, timestamp);

    const url = `${API_BASE_URL}${endpoint}?api-key=${this.apiKey}&t=${timestamp}&api-signature=${signature}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`WeatherLink API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('WeatherLink API request failed:', error);
      throw error;
    }
  }

  /**
   * Get current weather conditions for the station
   * @returns {Promise<Object>} Current weather data
   */
  async getCurrentConditions() {
    if (!this.apiKey || !this.apiSecret || !this.stationId) {
      console.warn('WeatherLink API credentials not configured');
      return null;
    }

    try {
      const endpoint = `/current/${this.stationId}`;
      const data = await this.makeRequest(endpoint);

      return this.parseCurrentConditions(data);
    } catch (error) {
      console.error('Failed to fetch current conditions:', error);
      return null;
    }
  }

  /**
   * Parse and transform WeatherLink API response
   * @param {Object} data - Raw API response
   * @returns {Object} Formatted weather data
   */
  parseCurrentConditions(data) {
    if (!data || !data.sensors || data.sensors.length === 0) {
      return null;
    }

    // Find the ISS (Integrated Sensor Suite) data
    const issData = data.sensors.find(sensor =>
      sensor.data && sensor.data.length > 0 && sensor.data[0].temp !== undefined
    );

    if (!issData || !issData.data || issData.data.length === 0) {
      return null;
    }

    const sensorData = issData.data[0];
    const stationData = data.station || {};

    return {
      // Temperature
      temperature: sensorData.temp || null,
      temperatureFeelsLike: sensorData.heat_index || sensorData.wind_chill || sensorData.temp,
      temperatureUnit: 'F',

      // Wind
      windSpeed: sensorData.wind_speed_avg_last_10_min || sensorData.wind_speed_last || 0,
      windGust: sensorData.wind_speed_hi_last_10_min || null,
      windDirection: sensorData.wind_dir_last || null,
      windDirectionDegrees: sensorData.wind_dir_scalar_avg_last_10_min || null,

      // Humidity and Pressure
      humidity: sensorData.hum || null,
      pressure: sensorData.bar_sea_level || sensorData.bar_absolute || null,
      pressureUnit: 'inHg',

      // Precipitation
      rainfall: sensorData.rainfall_daily || 0,
      rainfallUnit: 'in',
      rainRate: sensorData.rain_rate_last || 0,

      // Solar and UV
      solarRadiation: sensorData.solar_rad || null,
      uvIndex: sensorData.uv_index || null,

      // Conditions
      dewPoint: sensorData.dew_point || null,

      // Timestamps
      timestamp: sensorData.ts ? new Date(sensorData.ts * 1000) : new Date(),

      // Station info
      stationName: stationData.station_name || 'Bridgeview Harbour Marina',
      location: stationData.city && stationData.state
        ? `${stationData.city}, ${stationData.state}`
        : 'Port Henry, NY',

      // Raw data for debugging
      _raw: sensorData
    };
  }

  /**
   * Convert wind direction degrees to compass direction
   * @param {number} degrees - Wind direction in degrees (0-360)
   * @returns {string} Compass direction (N, NE, E, etc.)
   */
  static getWindDirection(degrees) {
    if (degrees === null || degrees === undefined) return 'N/A';

    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                       'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(((degrees % 360) / 22.5));
    return directions[index % 16];
  }

  /**
   * Get weather condition description based on sensor data
   * @param {Object} weather - Parsed weather data
   * @returns {string} Weather condition description
   */
  static getConditionDescription(weather) {
    if (!weather) return 'Unknown';

    // Simple condition logic based on available data
    if (weather.rainRate > 0) {
      return weather.rainRate > 0.5 ? 'Heavy Rain' : 'Light Rain';
    }

    if (weather.solarRadiation !== null) {
      if (weather.solarRadiation > 700) return 'Sunny';
      if (weather.solarRadiation > 300) return 'Partly Cloudy';
      if (weather.solarRadiation > 100) return 'Cloudy';
    }

    return 'Clear';
  }

  /**
   * Get weather emoji based on conditions
   * @param {Object} weather - Parsed weather data
   * @returns {string} Weather emoji
   */
  static getWeatherEmoji(weather) {
    if (!weather) return '🌡️';

    if (weather.rainRate > 0) {
      return weather.rainRate > 0.5 ? '🌧️' : '🌦️';
    }

    if (weather.solarRadiation !== null) {
      if (weather.solarRadiation > 700) return '☀️';
      if (weather.solarRadiation > 300) return '⛅';
      if (weather.solarRadiation > 100) return '☁️';
    }

    const hour = new Date().getHours();
    if (hour >= 6 && hour < 20) {
      return '🌤️'; // Day
    } else {
      return '🌙'; // Night
    }
  }
}

// Export singleton instance
const weatherService = new WeatherLinkService();
export default weatherService;

// Export class for testing
export { WeatherLinkService };

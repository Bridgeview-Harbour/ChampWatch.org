import React, { useState, useEffect } from 'react';
import { Card, Spinner, Alert } from 'react-bootstrap';
import weatherService from '../services/weatherService';

/**
 * WeatherWidget Component
 *
 * Displays real-time weather data from the Davis WeatherLink station
 * at Bridgeview Harbour Marina
 */
function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  /**
   * Fetch weather data from WeatherLink API
   */
  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherService.getCurrentConditions();

      if (data) {
        setWeather(data);
        setLastUpdate(new Date());
      } else {
        setError('Weather data not available');
      }
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather on component mount
  useEffect(() => {
    fetchWeather();

    // Refresh weather every 5 minutes
    const interval = setInterval(fetchWeather, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  /**
   * Format timestamp for display
   */
  const formatUpdateTime = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Loading state
  if (loading && !weather) {
    return (
      <Card className="shadow">
        <Card.Header className="bg-info text-white">
          <h3 className="h5 mb-0">Lake Champlain Weather</h3>
        </Card.Header>
        <Card.Body className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 mb-0 text-muted">Loading weather data...</p>
        </Card.Body>
      </Card>
    );
  }

  // Error state (without configured API)
  if (error && !weather) {
    return (
      <Card className="shadow">
        <Card.Header className="bg-info text-white">
          <h3 className="h5 mb-0">Lake Champlain Weather</h3>
        </Card.Header>
        <Card.Body>
          <Alert variant="warning" className="mb-0">
            <strong>Weather data unavailable</strong>
            <p className="small mb-0 mt-2">
              Configure WeatherLink API credentials to display live weather from
              Bridgeview Harbour Marina.
            </p>
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  // No data available
  if (!weather) {
    return null;
  }

  const emoji = weatherService.constructor.getWeatherEmoji(weather);
  const condition = weatherService.constructor.getConditionDescription(weather);
  const windDir = weatherService.constructor.getWindDirection(weather.windDirectionDegrees);

  return (
    <Card className="shadow">
      <Card.Header className="bg-info text-white">
        <h3 className="h5 mb-0">Lake Champlain Weather</h3>
      </Card.Header>
      <Card.Body>
        <div className="text-center">
          <h4 className="mb-1">{weather.location}</h4>
          <p className="text-muted small mb-3">{weather.stationName}</p>

          {/* Current Temperature */}
          <div className="my-3">
            <div className="display-3 mb-0">{emoji}</div>
            <div className="d-flex justify-content-center align-items-baseline gap-2 mt-2">
              <span className="h1 mb-0 fw-bold">
                {weather.temperature !== null ? Math.round(weather.temperature) : '--'}°
              </span>
              <span className="text-muted">{weather.temperatureUnit}</span>
            </div>
            <p className="text-muted mb-0">{condition}</p>
            {weather.temperatureFeelsLike !== null &&
             weather.temperatureFeelsLike !== weather.temperature && (
              <p className="small text-muted mb-0">
                Feels like {Math.round(weather.temperatureFeelsLike)}°F
              </p>
            )}
          </div>

          <hr />

          {/* Detailed Conditions */}
          <div className="text-start">
            {/* Wind */}
            {weather.windSpeed !== null && (
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">
                  <strong>Wind:</strong>
                </span>
                <span>
                  {windDir} {Math.round(weather.windSpeed)} mph
                  {weather.windGust && weather.windGust > weather.windSpeed && (
                    <span className="small text-muted">
                      {' '}(gusts {Math.round(weather.windGust)} mph)
                    </span>
                  )}
                </span>
              </div>
            )}

            {/* Humidity */}
            {weather.humidity !== null && (
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">
                  <strong>Humidity:</strong>
                </span>
                <span>{Math.round(weather.humidity)}%</span>
              </div>
            )}

            {/* Pressure */}
            {weather.pressure !== null && (
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">
                  <strong>Pressure:</strong>
                </span>
                <span>{weather.pressure.toFixed(2)} {weather.pressureUnit}</span>
              </div>
            )}

            {/* Dew Point */}
            {weather.dewPoint !== null && (
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">
                  <strong>Dew Point:</strong>
                </span>
                <span>{Math.round(weather.dewPoint)}°F</span>
              </div>
            )}

            {/* Rainfall */}
            {weather.rainfall !== null && weather.rainfall > 0 && (
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">
                  <strong>Rain Today:</strong>
                </span>
                <span>{weather.rainfall.toFixed(2)} {weather.rainfallUnit}</span>
              </div>
            )}

            {/* UV Index */}
            {weather.uvIndex !== null && weather.uvIndex > 0 && (
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">
                  <strong>UV Index:</strong>
                </span>
                <span>
                  {weather.uvIndex.toFixed(1)}
                  {weather.uvIndex >= 8 && ' 🔥'}
                </span>
              </div>
            )}
          </div>

          {/* Last Update */}
          {lastUpdate && (
            <div className="mt-3 pt-2 border-top">
              <p className="small text-muted mb-0">
                Last updated: {formatUpdateTime(lastUpdate)}
              </p>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default WeatherWidget;

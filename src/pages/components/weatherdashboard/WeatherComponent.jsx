export const WeatherComponent = ({ currentWeather, days }) => {
  const weatherCodeMap = {
    0: "Clear sky ☀️",
    1: "Mainly clear 🌤️",
    2: "Partly cloudy ⛅",
    3: "Overcast ☁️",
    45: "Fog 🌫️",
    48: "Depositing rime fog 🌫️",
    51: "Light drizzle 🌦️",
    53: "Moderate drizzle 🌧️",
    55: "Dense drizzle 🌧️",
    61: "Slight rain 🌧️",
    63: "Moderate rain 🌧️",
    65: "Heavy rain 🌧️",
    71: "Slight snow 🌨️",
    73: "Moderate snow 🌨️",
    75: "Heavy snow 🌨️",
    80: "Rain showers 🌦️",
    81: "Moderate rain showers 🌧️",
    82: "Violent rain showers ⛈️",
    95: "Thunderstorm ⛈️",
    96: "Thunderstorm with slight hail ⛈️",
    99: "Thunderstorm with heavy hail ⛈️",
  };

  const code = currentWeather.weather_code
    ? currentWeather.weather_code[0]
    : null;
  const description = code !== null ? weatherCodeMap[code] : "Loading...";

  return (
    <div className="dark:bg-background-dark rounded-xl border border-primary/20 bg-background-light p-6 shadow-sm lg:col-span-2 dark:border-primary/30">
      <div className="mb-6 flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-7xl text-primary">
            {/* partly_cloudy_day */}
          </span>
          <div>
            <p className="text-6xl font-bold">
              {currentWeather.temperature_2m_mean
                ? `${currentWeather.temperature_2m_mean[0]}°C` // or map if you want multiple
                : "Loading..."}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400">
              {description}
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-4 text-center sm:mt-0">
          <div className="rounded-lg bg-primary/10 p-4 dark:bg-primary/20">
            <p className="text-xl font-bold">
              {currentWeather.relative_humidity_2m_mean
                ? `${currentWeather.relative_humidity_2m_mean[0]}%` // or map if you want multiple
                : "Loading..."}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Humidity
            </p>
          </div>
          <div className="rounded-lg bg-primary/10 p-4 dark:bg-primary/20">
            <p className="text-xl font-bold">
              {currentWeather.wind_speed_10m_max
                ? `${currentWeather.wind_speed_10m_max[0]}km/h` // or map if you want multiple
                : "Loading..."}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Wind
            </p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-4 text-xl font-bold">Short-Term Forecast</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-primary/5 p-3 dark:bg-primary/10">
            <p className="w-1/4 font-medium">Tomorrow</p>
            <div className="flex w-1/4 items-center gap-2">
              <p></p>
            </div>
            <p className="w-1/4 text-center">
              {currentWeather.temperature_2m_max
                ? `${currentWeather.temperature_2m_max[1]}°C` // or map if you want multiple
                : "Loading..."}
            </p>
            <p className="w-1/4 text-center text-neutral-500 dark:text-neutral-400">
              {currentWeather.temperature_2m_min
                ? `${currentWeather.temperature_2m_min[1]}°C` // or map if you want multiple
                : "Loading..."}
            </p>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-primary/5 p-3 dark:bg-primary/10">
            <p className="w-1/4 font-medium">
              {days
                ? `${days[3]}` // or map if you want multiple
                : "Loading..."}
            </p>
            <div className="flex w-1/4 items-center gap-2">
              <p></p>
            </div>
            <p className="w-1/4 text-center">
              {currentWeather.temperature_2m_max
                ? `${currentWeather.temperature_2m_max[2]}°C` // or map if you want multiple
                : "Loading..."}
            </p>
            <p className="w-1/4 text-center text-neutral-500 dark:text-neutral-400">
              {currentWeather.temperature_2m_min
                ? `${currentWeather.temperature_2m_min[2]}°C` // or map if you want multiple
                : "Loading..."}
            </p>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-primary/5 p-3 dark:bg-primary/10">
            <p className="w-1/4 font-medium">
              {days
                ? `${days[4]}` // or map if you want multiple
                : "Loading..."}
            </p>
            <div className="flex w-1/4 items-center gap-2">
              <p></p>
            </div>
            <p className="w-1/4 text-center">27°C</p>
            <p className="w-1/4 text-center text-neutral-500 dark:text-neutral-400">
              21°C
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

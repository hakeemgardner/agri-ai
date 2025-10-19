// utils/weatherSummary.js
export function summarizeWeather(dailyData) {
  const length = dailyData.time.length;

  let totalTemp = 0;
  let totalHumidity = 0;
  let totalRain = 0;
  let maxTemp = -Infinity;
  let minTemp = Infinity;

  for (let i = 0; i < length; i++) {
    const tempMean = dailyData.temperature_2m_mean?.[i] || 0;
    const humidity = dailyData.relative_humidity_2m_mean?.[i] || 0;
    const rain = dailyData.rain_sum?.[i] || 0;
    const tempMax = dailyData.temperature_2m_max?.[i] || 0;
    const tempMin = dailyData.temperature_2m_min?.[i] || 0;

    totalTemp += tempMean;
    totalHumidity += humidity;
    totalRain += rain;

    if (tempMax > maxTemp) maxTemp = tempMax;
    if (tempMin < minTemp) minTemp = tempMin;
  }

  return {
    averageTemp: +(totalTemp / length).toFixed(1),
    averageHumidity: +(totalHumidity / length).toFixed(1),
    totalRainfall: +totalRain.toFixed(1),
    maxTemp,
    minTemp,
  };
}

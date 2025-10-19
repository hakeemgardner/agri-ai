// Internal Imports
import { parseGeminiResponse } from "../utils/weatherdashboard/responseParser";
import { Header } from "../components/Header";
import { summarizeWeather } from "../utils/weatherdashboard/weatherSummary";
import { WeatherComponent } from "../pages/components/weatherdashboard/WeatherComponent";
import { FarmingAdvice } from "../pages/components/weatherdashboard/FarmingAdvice";
import { PlantingAndHarvesting } from "../pages/components/weatherdashboard/PlantingAndHarvesting";

// External Imports
import { useState, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";

export const WeatherDashboard = () => {
  // Use States

  const [summarizedForecastData, setSummarizedForecastData] = useState({});
  const [summarizedHistoricalData, setSummarizedHistoricalData] = useState({});
  const [days, setDays] = useState([]);
  const [advice, setAdvice] = useState("");
  const [currentWeather, setCurrentWeather] = useState({});
  const [historicalWeather, setHistoricalWeather] = useState({});

  // Helper function to parse Gemini response

  const parsedAdvice = advice ? parseGeminiResponse(advice) : null;

  // API's
  const gemini_api = import.meta.env.VITE_GEMINI_API_KEY;

  // Weather Information

  const lat = 18.0737;
  const lon = -76.7942;

  const d = new Date();
  const currentYear = d.getFullYear();
  const historicalYear = d.getFullYear() - 2;
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const [forecastRes, archiveRes] = await Promise.all([
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=rain_sum,et0_fao_evapotranspiration,showers_sum,temperature_2m_max,temperature_2m_min,daylight_duration,apparent_temperature_max,uv_index_clear_sky_max,wind_gusts_10m_max,wind_speed_10m_max,wind_direction_10m_dominant,sunrise,sunset,temperature_2m_mean,relative_humidity_2m_mean&daily=weather_code&timezone=auto`
          ),
          fetch(
            `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${historicalYear}-${month}-${day}&end_date=${currentYear}-${month}-${day}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,et0_fao_evapotranspiration,rain_sum,precipitation_sum,apparent_temperature_max,temperature_2m_mean,relative_humidity_2m_mean&daily=weather_code&timezone=auto`
          ),
        ]);
        if (!forecastRes.ok || !archiveRes.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const forecastData = await forecastRes.json();
        const archiveData = await archiveRes.json();

        const forecastDataDaily = forecastData.daily;
        const archiveDataDaily = archiveData.daily;
        console.log(forecastDataDaily);

        console.log(forecastData);
        console.log(archiveData);

        setCurrentWeather(forecastDataDaily);
        setHistoricalWeather(archiveDataDaily);

        const summarizedHistorical = summarizeWeather(archiveData.daily);
        const summarizedForecast = summarizeWeather(forecastData.daily);

        setSummarizedForecastData(summarizedForecast);
        setSummarizedHistoricalData(summarizedHistorical);

        await handleWeatherAdvice(summarizedHistorical, summarizedForecast);
        console.log("📊 Historical Summary:", summarizedHistorical);
        console.log("☀️ Forecast Summary:", summarizedForecast);
        const apiDates = currentWeather.time; // e.g., ['2025-10-13', '2025-10-14', ...]

        // Make sure currentWeather.time exists
        const daysOfWeek = forecastDataDaily.time.map((dateStr) => {
          const date = new Date(dateStr);
          return date.toLocaleDateString("en-US", { weekday: "long" });
        });
        setDays(daysOfWeek);
      } catch (err) {
        console.log(err);
      }
    };

    async function handleWeatherAdvice(historical, forecast) {
      const prompt = `
You are an expert farming advisor. Analyze the provided weather data and generate **only the most critical, actionable farming advice**.

Format the response in this exact structure:

Optimal Planting Window:
[Specify the best crops to plant right now and the recommended timing. Include any weather considerations.]

Pest Alert:
[Highlight potential pest or disease risks due to weather conditions. Provide 1–2 actionable monitoring or prevention tips.]

Planting Advice:
[Give 2–3 practical, imperative steps farmers should take when planting crops under current and forecasted conditions.]

Harvesting Tips:
[Give 2–3 practical, imperative steps for harvesting crops now or in the coming days considering weather patterns.]

**Weather Data:**
- Historical (Past 2 Years): Avg Temp: ${historical.averageTemp}°C, Avg Humidity: ${historical.averageHumidity}%, Total Rainfall: ${historical.totalRainfall}mm
- Forecast (Next Few Days): Avg Temp: ${forecast.averageTemp}°C, Avg Humidity: ${forecast.averageHumidity}%, Total Rainfall: ${forecast.totalRainfall}mm

**Instructions:**
- Be concise and direct; use imperative sentences like "Delay," "Increase," "Avoid," "Apply."
- Focus only on crop-related actions.
- Do not explain the "why" or discuss location explicitly.
- Each section should contain actionable points only.
`;
      const ai = new GoogleGenAI({ apiKey: gemini_api });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          thinkingConfig: {
            thinkingBudget: 0, // Disables thinking
          },
        },
      });
      const cleanText = response.text
        .replace(/\*\*/g, "") // remove bold
        .replace(/\*/g, "") // remove single asterisks (italics or bullet markdown)
        .replace(/[_#>-]/g, "") // remove other markdown symbols (# headers, > quotes, - bullets)
        .replace(/\n\s*\n/g, "\n") // clean double line breaks
        .trim();

      setAdvice(cleanText);
    }

    fetchWeather();
  }, []);

  return (
    <div className="dark:bg-background-dark font-display bg-background-light text-neutral-800 dark:text-neutral-200">
      <Header />

      <main className="container mx-auto flex-grow px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">
              Weather &amp; Farming Advice
            </h1>
          </div>
          <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Here */}
            <WeatherComponent currentWeather={currentWeather} days={days} />
            {/* Here */}
            <div className="flex flex-col justify-between rounded-xl bg-primary/90 p-6 text-white shadow-lg dark:bg-primary/80">
              <FarmingAdvice parsedAdvice={parsedAdvice} />
              {/* <button className="dark:bg-background-dark mt-6 w-full rounded-lg bg-background-light px-4 py-2 font-bold text-primary transition-opacity hover:opacity-90">
                View Detailed Report
              </button> */}
            </div>
          </div>
          <PlantingAndHarvesting parsedAdvice={parsedAdvice} />
        </div>
      </main>
    </div>
  );
};

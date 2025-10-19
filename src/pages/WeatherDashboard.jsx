import { useState, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
export const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState({});
  const [advice, setAdvice] = useState("");

  const gemini_key = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,rain_sum,showers_sum,precipitation_sum,temperature_2m_max,temperature_2m_min,apparent_temperature_max,wind_speed_10m_max,wind_gusts_10m_max,et0_fao_evapotranspiration,temperature_2m_mean,relative_humidity_2m_mean,wind_speed_10m_mean"
      );
      const data = await response.json();
      const daily = data.daily;
      setWeatherData(daily);
      console.log(daily);
    };

    const handleAdvice = async () => {
      const ai = new GoogleGenAI({ apiKey: gemini_key });

      const prompt = `
You are an expert agricultural advisor. Based on the following 7-day weather forecast data, 
give detailed, location-neutral farming advice for smallholder farmers.

Here is the data:
Today's temperature ${
        weatherData.temperature_2m_max
          ? weatherData.temperature_2m_max[0]
          : "Loading"
      }, humidity${
        weatherData.relative_humidity_2m_mean
          ? weatherData.relative_humidity_2m_mean[0]
          : "Loading"
      }, windspeed ${
        weatherData.wind_speed_10m_mean
          ? weatherData.wind_speed_10m_mean[0]
          : "Loading"
      }

Please include:
1. **General summary** of expected weather (temperature trends, rain, wind).
2. **Optimal planting advice** – Should farmers plant now or wait? Which crops would do well?
3. **Irrigation advice** – Should they water more or less this week?
4. **Pest or disease warnings** – Are conditions likely to favor pests or fungi?
5. **Harvesting tips** – If temperatures, rain, or wind could affect crop maturity or storage.
6. **Preventive measures** – Steps to protect crops or soil.

Keep it concise but practical. Avoid generic statements; base all advice on the actual data values.
`;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      console.log(response.text);
    };

    handleAdvice();
    fetchWeather();
  }, []);

  const tomorrowHighTemp = weatherData.temperature_2m_max
    ? weatherData.temperature_2m_max[1]
    : "Loading";
  const tomorrowLowTemp = weatherData.temperature_2m_min
    ? weatherData.temperature_2m_min[1]
    : "Loading";
  const dayAfterTomorrowHighTemp = weatherData.temperature_2m_max
    ? weatherData.temperature_2m_max[2]
    : "Loading";
  const dayAfterTomorrowLowTemp = weatherData.temperature_2m_min
    ? weatherData.temperature_2m_min[2]
    : "Loading";
  const twoDaysAfterTomorrowHighTemp = weatherData.temperature_2m_max
    ? weatherData.temperature_2m_max[3]
    : "Loading";
  const twoDaysAfterTomorrowLowTemp = weatherData.temperature_2m_min
    ? weatherData.temperature_2m_min[3]
    : "Loading";

  const daysOfWeek = [
    {
      day: "Tomorrow",
      weather: "Sunny",
      high: tomorrowHighTemp,
      low: tomorrowLowTemp,
    },
    {
      day: "Wednesday",
      weather: "Showers",
      high: dayAfterTomorrowHighTemp,
      low: dayAfterTomorrowLowTemp,
    },
    {
      day: "Thursday",
      weather: "Storm",
      high: twoDaysAfterTomorrowHighTemp,
      low: twoDaysAfterTomorrowLowTemp,
    },
  ];

  return (
    <div className="min-h-screen w-full font-sans ">
      {/* Header Section */}
      <div className="px-10 pt-10">
        <h1 className="text-4xl font-bold text-green-800">
          Weather & Farming Advice
        </h1>
        <p className="text-lg text-gray-600 mt-1 ml-2">
          St. Elizabeth Parish, Jamaica
        </p>
      </div>

      {/* Weather & Farming Advice Section */}
      <div className="flex flex-wrap justify-center gap-10 p-10">
        {/* Weather Card */}
        <div className="shadow-2xl h-[530px] w-[700px] rounded-2xl md:h-[420px] bg-white p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-3xl">
          <div className=" w-[100] h-[150px] flex flex-wrap justify-center p-5 gap-50  ">
            <div className="w-auto">
              <h1 className="text-[50px] w-auto ml-[20px] p-[10px] text-green-800 font-bold">
                {weatherData.temperature_2m_mean
                  ? weatherData.temperature_2m_mean[0]
                  : "Loading.."}
                °C
              </h1>
              <p className="text-[20px] ml-[30px] -mt-3 text-gray-600">
                Partly Cloudy
              </p>
            </div>
            <div className=" w-auto flex p-5 flex-row mt-[-200px] gap-5 md:mt-[0px]">
              <div className="bg-green-400 w-20 p-2  h-20 text-center rounded-2xl">
                <p>
                  {weatherData.relative_humidity_2m_mean
                    ? weatherData.relative_humidity_2m_mean[0]
                    : "Loading.."}
                </p>
                <p>Humidity</p>
              </div>
              <div className="bg-green-400 w-20 p-2  h-20 text-center rounded-2xl">
                <p>
                  {weatherData.wind_speed_10m_mean
                    ? weatherData.wind_speed_10m_mean[0]
                    : "Loading.."}
                </p>
                <p>wind</p>
              </div>
            </div>
          </div>
          <h2 className="text-[22px] font-semibold mt-30 mb-2 md:mt-[0]">
            Short-Term Forecast
          </h2>

          {/* Forecast Items */}
          <div className="space-y-3">
            {daysOfWeek.map((item, index) => (
              <div
                key={index}
                className="flex justify-between bg-green-200 rounded-2xl p-3 text-center font-medium text-gray-700 transition-transform duration-200 hover:-translate-y-1"
              >
                <span>{item.day}</span>
                <span>{item.weather}</span>
                <span>{item.high}</span>
                <span>{item.low}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Farming Advice Card */}
        <div className="bg-[#1e8606] h-[430px] rounded-2xl w-[400px] text-white p-6 shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-3xl">
          <h1 className="text-[35px] font-bold mb-3">Farming Advice</h1>

          <div className="mb-6">
            <h2 className="text-[25px] font-bold">Optimal Planting Window</h2>
            <p className="text-[17px] mt-2">
              Ideal conditions for planting root vegetables. The forecast
              indicates sufficient rain, reducing the need for extensive
              irrigation.
            </p>
          </div>

          <div>
            <h2 className="text-[25px] font-bold">Pest Alert</h2>
            <p className="text-[17px] mt-2">
              High humidity may increase fungal risk. Proactive treatment is
              recommended for tomato and potato crops.
            </p>
          </div>
        </div>
      </div>

      {/* Planting & Harvest Section */}
      <div className="flex flex-wrap justify-center p-10">
        <div className="shadow-2xl bg-white rounded-2xl w-full max-w-[1100px] flex flex-wrap gap-10 justify-center p-6 transition-transform duration-300 hover:-translate-y-1">
          <div className="h-[200px] w-[500px] p-5">
            <h1 className="text-xl font-bold mb-2">
              Planting & Harvesting Advice
            </h1>
            <h2 className="font-bold text-green-700">Time to Plant!</h2>
            <p className="mt-2 text-gray-700">
              Based on current weather patterns and soil moisture, it's an ideal
              time to plant leafy greens like callaloo and pak choi. Ensure
              proper spacing.
            </p>
          </div>
          <div className="h-[200px] w-[500px] p-5">
            <h2 className="font-bold text-green-700">
              Harvest Sweet Potatoes!
            </h2>
            <p className="mt-2 text-gray-700">
              The dry spell expected next week is perfect for harvesting sweet
              potatoes. This will help them cure properly and prevent rot.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/** @format */

import React from "react";

export const WeatherDashboard = () => {
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
                28°C
              </h1>
              <p className="text-[20px] ml-[30px] -mt-3 text-gray-600">
                Partly Cloudy
              </p>
            </div>
            <div className=" w-auto flex p-5 flex-row mt-[-200px] gap-5 md:mt-[0px]">
              <div className="bg-green-400 w-20 p-2  h-20 text-center rounded-2xl">75% <br />Humidity</div>
              <div className="bg-green-400 w-20 p-2  h-20 text-center rounded-2xl">15Km/h <br />wind</div>
            </div>
          </div>
          <h2 className="text-[22px] font-semibold mt-30 mb-2 md:mt-[0]">
            Short-Term Forecast
          </h2>

          {/* Forecast Items */}
          <div className="space-y-3">
            {[
              { day: "Tomorrow", weather: "Sunny", high: "30°C", low: "22°C" },
              {
                day: "Wednesday",
                weather: "Showers",
                high: "29°C",
                low: "23°C",
              },
              { day: "Thursday", weather: "Storm", high: "27°C", low: "21°C" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-between bg-green-200 rounded-2xl p-3 text-center font-medium text-gray-700 transition-transform duration-200 hover:-translate-y-1">
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

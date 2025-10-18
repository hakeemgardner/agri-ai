import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

export const FertilizerAdvice = () => {
  const [advice, setAdvice] = useState("");
  const [crop, setCrop] = useState("");
  const [soil, setSoil] = useState("");

  const gemini_key = import.meta.env.VITE_GEMINI_API_KEY;

  const handleCrop = (e) => {
    setCrop(e.target.value);
  };

  const handleSoil = (e) => {
    setSoil(e.target.value);
  };

  const handleAdvice = async () => {
    if (crop === "Select Crop Type" || soil === "Select Soil Type") {
      alert("You need to select a crop or a soil type");
      return;
    }
    console.log(crop, soil);
    try {
      const ai = new GoogleGenAI({ apiKey: gemini_key });

      const prompt = `You are an expert agricultural advisor.Based on the following data, recommend a fertilizer mix, soil treatment plan, and management advice.

        Crop: ${crop}
        Soil Type: ${soil}

        Provide:
        1. Ideal NPK (Nitrogen-Phosphorus-Potassium) ratio and reasoning.
        2. Organic or mineral amendments (if suitable).
        3. Any additional care tips for maximizing yield and soil health.
        Keep it short, around 5 sentences, clear, and practical for farmers in the Caribbean region.
        `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      setAdvice(response.text);
      console.log(response.text);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" h-[700px] flex flex-wrap p-20 justify-center gap-6">
      <div className=" h-[500px] w-[400px] rounded-2xl p-5 justify-center">
        <h1 className="text-4xl font-bold">
          Fertilizer <br />
          Advice
        </h1>
        <h2 className="text-gray-600">
          Get Ai-powered recommendation for <br /> your crops.{" "}
        </h2>
        <h2 className="mt-5 font-bold">Mi Crop Type</h2>
        <select
          value={crop}
          onChange={handleCrop}
          className="mt-3 font-bold text-[17px]  border-gray-300 cursor-pointer border-2 w-[100%] p-2 rounded-[10px] h-[50px]  bg-white text-gray-700 focus:outline-none focus:ring-2 space-x-2 transform transition-transform duration-200 hover:-translate-y-1"
        >
          <option className="font-bold" value="Select crop Type">
            Select Crop Type
          </option>
          <option className="font-bold" value="Yam">
            Yam
          </option>
          <option className="font-bold" value="Sweet Potato">
            Sweet Potato
          </option>
          <option className="font-bold" value="Pimento">
            Pimento
          </option>
          <option className="font-bold" value="Callaloo">
            Callaloo
          </option>
          <option className="font-bold" value="Schotch Bonnet Pepper">
            Schotch Bonnet Pepper
          </option>
        </select>
        <h2 className="mt-6 font-bold">Mi soil Type</h2>
        <select
          value={soil}
          onChange={handleSoil}
          className=" mt-3 font-bold text-[17px] cursor-pointer border-2 w-[100%] p-2 rounded-[10px] h-[50px] border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 space-x-2 transform transition-transform duration-200 hover:-translate-y-1"
        >
          <option className="font-bold " value="Select Soil Type">
            Select Soil Type
          </option>
          <option className="font-bold" value="Clay loam">
            Clay loam
          </option>
          <option className="font-bold" value="Sandy Loam">
            Sandy Loam
          </option>
          <option className="font-bold" value="red (Red Dirt)">
            red (Red Dirt)
          </option>
        </select>
        <button
          onClick={handleAdvice}
          className="bg-green-600 mt-10 p-3 w-[100%] rounded-[5px] hover:cursor-pointer "
        >
          Get Advice
        </button>
      </div>
      <div className=" bg-green-100 h-[450px] w-[340px] rounded-2xl p-5">
        <h1 className="text-2xl font-bold">Your Recommendation</h1>
        <h2>Here's our AI Suggests:</h2>
        <div className="h-[100px] w-[100%] bg-white mt-5 rounded-[5px] justify-center text-center p-3">
          <h2 className="font-bold">Fertilizer Mix</h2>
          <p>{advice}</p>
        </div>
        <div className="h-[100px] w-[100%] bg-white mt-5 rounded-[5px] justify-center text-center p-3">
          <h2 className="font-bold">Fertilizer Mix</h2>
          <p>Apply at planting and every 4 weeks after.</p>
        </div>
        <p className="mt-5">
          Disclaimer: Always follow manufacturer's instructions for application
          rates and safety. This is a recommendation, not a guarantee.
        </p>
      </div>
    </div>
  );
};

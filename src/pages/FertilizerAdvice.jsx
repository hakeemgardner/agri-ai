// Internal Imports
import { parseRecommendation } from "../utils/Fertilizer Advice/responseParser";
import { FertilizerAdivceForm } from "../pages/components/fertilizer advice/FertilizerAdivceForm";
import { FertilizerAdviceInstructions } from "../pages/components/fertilizer advice/FertilizerAdviceInstructions";
import { HeaderCard } from "../pages/components/fertilizer advice/HeaderCard";
import { NpkRatioVisualization } from "../pages/components/fertilizer advice/NpkRatioVisualization";
import { PrimaryRecommendation } from "../pages/components/fertilizer advice/PrimaryRecommendation";
import { AIResponse } from "../pages/components/fertilizer advice/AIResponse";
import { ProTips } from "../pages/components/fertilizer advice/ProTips";
//External Imports
import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { Calendar, ThermometerSun, Clock } from "lucide-react";
import Header from "../Components/Header";

export const FertilizerAdvice = () => {
  const [selectCrop, setSelectCrop] = useState("");
  const [selectSoil, setSelectSoil] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  function handleCropSelection(event) {
    if (event.target.value === "Select Crop Type") {
      return;
    }
    setSelectCrop(event.target.value);
  }

  function handleSoilSelection(event) {
    if (event.target.value === "Select Soil Type") {
      return;
    }
    setSelectSoil(event.target.value);
  }

  const gemini_api = import.meta.env.VITE_GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey: gemini_api });

  // Function to parse AI response and create structured data

  async function handleFertilizerAdvice() {
    if (!selectCrop || !selectSoil) {
      alert("Please select both crop type and soil type");
      return;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an agricultural expert. Based on the crop type and soil type, generate a **fertilizer recommendation** in this exact format:
Fertilizer Mix: 10-10-10 NPK Blend
Application Timing: Step-by-step guide (easy to understand):
1. At planting — apply a starter dose of 10-10-10 around the seed/seedling.
2. 3–4 weeks after emergence — side-dress with 10-10-10 once.
3. Repeat side-dressing every 3–4 weeks as the crop grows (stop at flowering/fruit set or 2–3 weeks before harvest for leafy crops).
4. Monitor plant health and soil; adjust frequency if plants show deficiency or excess.
Disclaimer: Always follow manufacturer's instructions.
Keep it concise. No extra text, no explanations. Crop Type: ${selectCrop} Soil Type: ${selectSoil}`,
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });

    setFertilizer(response.text);
    setRecommendation(
      parseRecommendation(response.text, selectCrop, selectSoil)
    );
    setShowResults(true);
  }

  return (
    <div className="dark:bg-background-dark font-display min-h-screen bg-background-light">
      <Header />

      {!showResults ? (
        <main className="container mx-auto flex-grow px-4 py-8 sm:px-6 md:py-16 lg:px-8">
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-8">
              <FertilizerAdivceForm
                handleCropSelection={handleCropSelection}
                handleSoilSelection={handleSoilSelection}
                handleFertilizerAdvice={handleFertilizerAdvice}
                selectCrop={selectCrop}
                selectSoil={selectSoil}
              />
            </div>
            <div className="space-y-6 rounded-xl bg-primary/10 p-6 dark:bg-primary/20">
              <FertilizerAdviceInstructions />
            </div>
          </div>
        </main>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50 p-6 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="mx-auto max-w-7xl">
            {/* Back Button */}
            <button
              onClick={() => setShowResults(false)}
              className="mb-6 flex items-center gap-2 font-bold text-primary transition-colors hover:text-primary/80"
            >
              ← Back to Form
            </button>

            {/* Header Card */}
            <div className="mb-6 rounded-2xl border border-green-100 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <HeaderCard recommendation={recommendation} />
            </div>

            {/* NPK Ratio Visualization */}
            <div className="mb-6 rounded-2xl border border-green-100 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <NpkRatioVisualization recommendation={recommendation} />
              {/* Primary Recommendation */}
              <div className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
                <PrimaryRecommendation recommendation={recommendation} />
              </div>
            </div>

            {/* AI Response */}
            <AIResponse recommendation={recommendation} />
            {/* Pro Tips */}
            <div className="rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 p-6 text-white shadow-lg">
              <ProTips />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

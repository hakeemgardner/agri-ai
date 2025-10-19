// Internal Imports
import { InfoCard } from "../pages/components/InfoCard";
import { UploadArea } from "../pages/components/UploadArea";
import  Header  from "../Components/Header";
import { HeaderCard } from "../pages/components/HeaderCard";
import { parseGeminiResponse } from "../utils/responseParser";
import { AskAgainButton } from "../pages/components/AskAgainButton";

// External Imports
import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import {
  CloudRain,
  Shield,
  Stethoscope,
  Info,
  AlertTriangle,
} from "lucide-react";

export const CropDiseaseDetectionPage = () => {
  const [cropDetectionResult, setCropDetectionResult] = useState([]);
  const [diseaseDetectionResult, setDiseaseDetectionResult] = useState([]);
  const [advice, setAdvice] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const api_key = import.meta.env.VITE_PLANT_ID_API_KEY;
  const gemini_api = import.meta.env.VITE_GEMINI_API_KEY;

  // Helper function to parse Gemini response

  // Convert image to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = reject;
    });
  };

  // Handle file upload and detection
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const base64 = await fileToBase64(file);

    try {
      const response = await fetch(
        "https://crop.kindwise.com/api/v1/identification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Api-Key": api_key,
          },
          body: JSON.stringify({ images: [base64] }),
        }
      );

      const data = await response.json();
      const cropResults = data.result.crop.suggestions.map((s) => ({
        name: s.name,
        probability: s.probability,
      }));

      const diseaseResults = data.result.disease.suggestions.map((s) => ({
        name: s.name,
        probability: s.probability,
      }));

      const cropName = cropResults[0].name;
      const diseaseName = diseaseResults[0].name;
      const diseaseConfidence = diseaseResults[0].probability * 100;

      setCropDetectionResult(cropName);
      setDiseaseDetectionResult(diseaseName);
      setConfidence(diseaseConfidence);
      setAdvice(""); // Reset advice when new image is uploaded
    } catch (error) {
      console.error("Error detecting disease:", error);
    } finally {
      setIsLoading(false);
    }
  };
// Hello world
  // Gemini Advice
  const ai = new GoogleGenAI({ apiKey: gemini_api });
  const prompt = `
Provide detailed but practical farming information about ${diseaseDetectionResult} in ${cropDetectionResult}.
Format the response in this exact structure:

Cause:
[Explain the disease's causal agent and how it spreads.]

Symptoms:
[Describe early and late signs on the crop.]

Weather Conditions:
[Describe weather patterns that favor the disease.]

Prevention:
[Provide 2–3 actionable steps for preventing outbreaks.]

Treatment & Management:
[Provide 2–3 practical steps farmers can take to treat or manage the disease.]

Keep the language clear and simple for farmers. Do not include any livestock advice.
`;

  async function handleDiseaseAdvice() {
    setIsLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      });
      const cleanText = response.text
        .replace(/\*\*/g, "")
        .replace(/\*/g, "")
        .replace(/[_#>-]/g, "")
        .replace(/\n\s*\n/g, "\n")
        .trim();

      setAdvice(cleanText);
    } catch (error) {
      console.error("Error getting advice:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Info Card Component

  const parsedAdvice = advice ? parseGeminiResponse(advice) : null;

  return (
    <div className="dark:bg-background-dark font-display text-foreground-light dark:text-foreground-dark bg-background-light">
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="container mx-auto flex-grow px-4 py-8 sm:py-12 lg:py-16">
          <div className="mx-auto max-w-4xl">
            {/* Upload Area */}

            <UploadArea
              isLoading={isLoading}
              handleFileUpload={handleFileUpload}
            />
            {/* Detection Results */}
            <div className="mt-12">
              <div className="mb-6 flex items-center gap-4">
                <h3 className="jamaican-black text-3xl font-bold dark:text-white">
                  Detection Results
                </h3>
                <div className="h-1 w-16 rounded-full bg-primary"></div>
              </div>

              {!cropDetectionResult && !diseaseDetectionResult ? (
                // Empty State
                <div className="dark:bg-subtle-dark/50 border-border-light dark:border-border-dark rounded-xl border bg-background-light p-6 text-center md:p-8">
                  <span className="material-symbols-outlined text-foreground-light/40 dark:text-foreground-dark/40 text-6xl">
                    image_search
                  </span>
                  <p className="text-foreground-light/60 dark:text-foreground-dark/60 mt-4 text-lg">
                    Your results will appear here after you upload an image.
                  </p>
                  <p className="text-foreground-light/60 dark:text-foreground-dark/60 mt-2">
                    Need more help? Our AI is ready to assist.
                  </p>
                </div>
              ) : (
                // Results Display
                <div className="space-y-6">
                  {/* Header Card */}
                  <div className="dark:bg-subtle-dark dark:border-border-dark rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                    <HeaderCard
                      confidence={confidence}
                      cropDetectionResult={cropDetectionResult}
                      diseaseDetectionResult={diseaseDetectionResult}
                    />
                  </div>

                  {/* AI Advice Section */}
                  {!parsedAdvice ? (
                    <div className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white shadow-lg">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <h3 className="mb-1 text-xl font-bold">
                            Need Detailed Advice?
                          </h3>
                          <p className="text-green-50">
                            Get comprehensive treatment and prevention guidance
                          </p>
                        </div>
                        <button
                          onClick={handleDiseaseAdvice}
                          disabled={isLoading}
                          className="rounded-lg bg-white px-6 py-3 font-bold text-green-600 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isLoading ? "Loading..." : "Ask Agri-AI"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Detailed Advice Cards
                    <div className="space-y-4">
                      <InfoCard icon={Info} title="Cause" accentColor="red">
                        <p className="leading-relaxed">{parsedAdvice.cause}</p>
                      </InfoCard>

                      <InfoCard
                        icon={AlertTriangle}
                        title="Symptoms"
                        accentColor="orange"
                      >
                        <div>
                          {parsedAdvice.symptoms.early && (
                            <>
                              <h4 className="mb-2 font-semibold text-gray-800 dark:text-white">
                                Early Signs:
                              </h4>
                              <p className="mb-3 leading-relaxed">
                                {parsedAdvice.symptoms.early}
                              </p>
                            </>
                          )}
                          {parsedAdvice.symptoms.late && (
                            <>
                              <h4 className="mb-2 font-semibold text-gray-800 dark:text-white">
                                Late Signs:
                              </h4>
                              <p className="leading-relaxed">
                                {parsedAdvice.symptoms.late}
                              </p>
                            </>
                          )}
                        </div>
                      </InfoCard>

                      <InfoCard
                        icon={CloudRain}
                        title="Weather Conditions"
                        accentColor="blue"
                      >
                        <p className="leading-relaxed">
                          {parsedAdvice.weather}
                        </p>
                      </InfoCard>

                      <InfoCard
                        icon={Shield}
                        title="Prevention"
                        accentColor="green"
                      >
                        <ul className="space-y-3">
                          {parsedAdvice.prevention.map((item, index) => (
                            <li key={index} className="flex gap-3">
                              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
                                {index + 1}
                              </span>
                              <p className="flex-1 leading-relaxed">{item}</p>
                            </li>
                          ))}
                        </ul>
                      </InfoCard>

                      <InfoCard
                        icon={Stethoscope}
                        title="Treatment & Management"
                        accentColor="purple"
                      >
                        <ul className="space-y-3">
                          {parsedAdvice.treatment.map((item, index) => (
                            <li key={index} className="flex gap-3">
                              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-sm font-bold text-white">
                                {index + 1}
                              </span>
                              <p className="flex-1 leading-relaxed">{item}</p>
                            </li>
                          ))}
                        </ul>
                      </InfoCard>

                      {/* Ask Again Button */}
                      <AskAgainButton
                        handleDiseaseAdvice={handleDiseaseAdvice}
                        isLoading={isLoading}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

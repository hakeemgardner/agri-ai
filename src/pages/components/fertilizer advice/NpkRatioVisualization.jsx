import { TrendingUp } from "lucide-react";
import { getNutrientStroke } from "../../../utils/fertilizer advice/nutrientColor";

export const NpkRatioVisualization = ({ recommendation }) => {
  return (
    <>
      <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-800 dark:text-white">
        <TrendingUp className="h-6 w-6 text-green-600" />
        Recommended NPK Ratio
      </h2>

      <div className="mb-6 grid grid-cols-3 gap-6">
        {Object.entries(recommendation.npkRatio).map(([nutrient, value]) => (
          <div key={nutrient} className="text-center">
            <div className="relative mx-auto mb-3 h-32 w-32">
              <svg className="h-32 w-32 -rotate-90 transform">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke={getNutrientStroke(nutrient)}
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${value * 3.52} 352`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-800 dark:text-white">
                  {value}
                </span>
              </div>
            </div>
            <div className="text-lg font-bold text-gray-800 capitalize dark:text-white">
              {nutrient}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {nutrient === "nitrogen" && "Leaf Growth"}
              {nutrient === "phosphorus" && "Root & Flower"}
              {nutrient === "potassium" && "Overall Health"}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

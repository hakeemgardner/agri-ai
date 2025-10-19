import { Leaf, AlertTriangle } from "lucide-react";

export const HeaderCard = ({
  confidence,
  cropDetectionResult,
  diseaseDetectionResult,
}) => {
  const getConfidenceColor = (conf) => {
    if (conf >= 90) return "text-red-600";
    if (conf >= 70) return "text-orange-500";
    return "text-yellow-600";
  };
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <span className="dark:text-foreground-dark text-gray-600">
                Crop:{" "}
                <span className="font-semibold text-gray-900 capitalize dark:text-white">
                  {cropDetectionResult}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="dark:text-foreground-dark text-gray-600">
                Disease:{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {diseaseDetectionResult}
                </span>
              </span>
            </div>
          </div>
        </div>
        {confidence && (
          <div className="text-right">
            <div className="dark:text-foreground-dark/70 mb-1 text-sm text-gray-500">
              Confidence
            </div>
            <div
              className={`text-3xl font-bold ${getConfidenceColor(confidence)}`}
            >
              {confidence.toFixed(1)}%
            </div>
          </div>
        )}
      </div>
    </>
  );
};

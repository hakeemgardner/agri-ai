import { AlertCircle } from "lucide-react";

export const AIResponse = ({ recommendation }) => {
  return (
    <>
      <div className="mb-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-800 dark:text-white">
          <AlertCircle className="h-6 w-6 text-blue-600" />
          Detailed AI Recommendations
        </h2>
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-gray-600 dark:bg-gray-700">
          <p className="whitespace-pre-line text-gray-800 dark:text-gray-200">
            {recommendation.rawResponse}
          </p>
        </div>
      </div>
    </>
  );
};

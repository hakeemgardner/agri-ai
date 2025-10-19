import { Leaf, Sprout, Sun, Droplet, MapPin } from "lucide-react";

export const HeaderCard = ({ recommendation }) => {
  return (
    <>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold text-gray-800 dark:text-white">
            <Sprout className="h-8 w-8 text-green-600" />
            Your Fertilizer Plan
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Customized recommendations for {recommendation.cropType}
          </p>
        </div>
        <div className="text-right">
          <div className="mb-1 text-sm text-gray-500">Confidence Score</div>
          <div className="text-3xl font-bold text-green-600">
            {recommendation.primaryRecommendation.confidence}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-3 dark:border-green-700 dark:from-green-900/30 dark:to-green-800/30">
          <Leaf className="mb-1 h-6 w-6 text-green-600" />
          <div className="text-xs text-gray-600 dark:text-gray-300">
            Crop Type
          </div>
          <div className="text-lg font-bold text-gray-800 dark:text-white">
            {recommendation.cropType}
          </div>
        </div>
        <div className="rounded-lg border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100 p-3 dark:border-amber-700 dark:from-amber-900/30 dark:to-amber-800/30">
          <Sun className="mb-1 h-6 w-6 text-amber-600" />
          <div className="text-xs text-gray-600 dark:text-gray-300">Season</div>
          <div className="text-lg font-bold text-gray-800 dark:text-white">
            {recommendation.season}
          </div>
        </div>
        <div className="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-3 dark:border-blue-700 dark:from-blue-900/30 dark:to-blue-800/30">
          <Droplet className="mb-1 h-6 w-6 text-blue-600" />
          <div className="text-xs text-gray-600 dark:text-gray-300">
            Soil Type
          </div>
          <div className="text-lg font-bold text-gray-800 dark:text-white">
            {recommendation.soilType}
          </div>
        </div>
        <div className="rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-3 dark:border-purple-700 dark:from-purple-900/30 dark:to-purple-800/30">
          <MapPin className="mb-1 h-6 w-6 text-purple-600" />
          <div className="text-xs text-gray-600 dark:text-gray-300">
            Location
          </div>
          <div className="text-sm font-bold text-gray-800 dark:text-white">
            {recommendation.location}
          </div>
        </div>
      </div>
    </>
  );
};

import { Package } from "lucide-react";

export const PrimaryRecommendation = ({ recommendation }) => {
  return (
    <>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="mb-2 text-2xl font-bold">
            {recommendation.primaryRecommendation.name}
          </h3>
          <p className="text-green-100">
            {recommendation.primaryRecommendation.type}
          </p>
        </div>
        <Package className="h-12 w-12 opacity-80" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
          <div className="mb-1 text-sm text-green-100">Application Rate</div>
          <div className="font-bold">
            {recommendation.primaryRecommendation.amount}
          </div>
        </div>
        <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
          <div className="mb-1 text-sm text-green-100">Frequency</div>
          <div className="font-bold">
            {recommendation.primaryRecommendation.frequency}
          </div>
        </div>
        <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
          <div className="mb-1 text-sm text-green-100">Estimated Cost</div>
          <div className="font-bold">
            {recommendation.primaryRecommendation.cost}
          </div>
        </div>
      </div>
    </>
  );
};

import { Package } from "lucide-react";

export const FertilizerAdviceInstructions = () => {
  return (
    <>
      <div>
        <h3 className="text-background-dark text-2xl font-bold dark:text-background-light">
          Your Recommendation
        </h3>
        <p className="text-background-dark/70 mt-1 dark:text-background-light/70">
          Here's what our AI suggests:
        </p>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Package className="mx-auto mb-4 h-16 w-16 text-primary/40" />
          <p className="text-background-dark/60 dark:text-background-light/60">
            Select your crop and soil type, then click "Get Advice" to see
            detailed recommendations
          </p>
        </div>
      </div>
    </>
  );
};

import { CheckCircle } from "lucide-react";

export const ProTips = () => {
  return (
    <>
      <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
        <CheckCircle className="h-6 w-6" />
        Application Best Practices
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-start gap-3 rounded-lg bg-white/20 p-3 backdrop-blur-sm">
          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          <span>Water thoroughly after fertilizer application</span>
        </div>
        <div className="flex items-start gap-3 rounded-lg bg-white/20 p-3 backdrop-blur-sm">
          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          <span>Apply in morning or evening to avoid leaf burn</span>
        </div>
        <div className="flex items-start gap-3 rounded-lg bg-white/20 p-3 backdrop-blur-sm">
          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          <span>Keep fertilizer 6 inches from plant stems</span>
        </div>
        <div className="flex items-start gap-3 rounded-lg bg-white/20 p-3 backdrop-blur-sm">
          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          <span>Always wear gloves when handling fertilizers</span>
        </div>
        <div className="flex items-start gap-3 rounded-lg bg-white/20 p-3 backdrop-blur-sm">
          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          <span>Store in cool, dry place away from children</span>
        </div>
        <div className="flex items-start gap-3 rounded-lg bg-white/20 p-3 backdrop-blur-sm">
          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          <span>Follow manufacturer's instructions carefully</span>
        </div>
      </div>
    </>
  );
};

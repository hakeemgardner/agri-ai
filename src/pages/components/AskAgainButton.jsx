export const AskAgainButton = ({ handleDiseaseAdvice, isLoading }) => {
  return (
    <div className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="mb-1 text-xl font-bold">Have More Questions?</h3>
          <p className="text-green-50">
            Upload another image or ask for different advice
          </p>
        </div>
        <button
          onClick={handleDiseaseAdvice}
          disabled={isLoading}
          className="rounded-lg bg-white px-6 py-3 font-bold text-green-600 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-xl disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Refresh Advice"}
        </button>
      </div>
    </div>
  );
};

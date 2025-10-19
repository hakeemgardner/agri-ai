export const FarmingAdvice = ({ parsedAdvice }) => {
  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold">
        Farming Advice
      </h3>
      <div className="space-y-4">
        {parsedAdvice ? (
          <div>
            <p className="text-lg font-bold">Optimal Planting Window</p>
            <p className="text-sm opacity-90">{parsedAdvice.window}</p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="loading loading-spinner loading-sm"></span>
            <span>Loading advice...</span>
          </div>
        )}

        <div>
          <p className="text-lg font-bold">Pest Alert</p>
          {parsedAdvice ? (
            <p className="text-sm opacity-90">{parsedAdvice.alert}</p>
          ) : (
            <div className="flex items-center gap-2">
              <span className="loading loading-spinner loading-sm"></span>
              <span>Loading alert...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

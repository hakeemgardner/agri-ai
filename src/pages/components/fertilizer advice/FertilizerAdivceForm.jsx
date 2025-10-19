export const FertilizerAdivceForm = ({
  handleCropSelection,
  handleSoilSelection,
  handleFertilizerAdvice,
  selectCrop,
  selectSoil,
}) => {
  return (
    <>
      <div>
        <h2 className="text-background-dark text-4xl font-black md:text-5xl dark:text-background-light">
          Fertilizer Advice
        </h2>
        <p className="text-background-dark/70 mt-2 text-lg dark:text-background-light/70">
          Get AI-powered recommendations for your crops.
        </p>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <label
            className="text-background-dark text-lg font-bold dark:text-background-light"
            htmlFor="crop-type"
          >
            Mi Crop Type
          </label>
          <select
            className="form-select dark:bg-background-dark text-background-dark w-full rounded-lg border-2 border-primary/30 bg-background-light p-4 text-lg focus:border-primary focus:ring-primary dark:border-primary/50 dark:text-background-light"
            id="crop-type"
            value={selectCrop}
            onChange={handleCropSelection}
          >
            <option>Select Crop Type</option>
            <option>Sugar Cane</option>
            <option>Coffee</option>
            <option>Bananas</option>
            <option>Pimento</option>
            <option>Citrus</option>
            <option>Yam</option>
            <option>Sweet Potatoes</option>
          </select>
        </div>
        <div className="space-y-2">
          <label
            className="text-background-dark text-lg font-bold dark:text-background-light"
            htmlFor="soil-type"
          >
            Mi Soil Type
          </label>
          <select
            className="form-select dark:bg-background-dark text-background-dark w-full rounded-lg border-2 border-primary/30 bg-background-light p-4 text-lg focus:border-primary focus:ring-primary dark:border-primary/50 dark:text-background-light"
            id="soil-type"
            value={selectSoil}
            onChange={handleSoilSelection}
          >
            <option>Select Soil Type</option>
            <option>Alluvial Soils</option>
            <option>Red Limestone Soils</option>
            <option>Loam Soils (including sandy loams)</option>
            <option>Coastal Alluvial / Friable Soils</option>
          </select>
        </div>
        <button
          onClick={handleFertilizerAdvice}
          className="text-background-dark dark:text-background-dark w-full transform rounded-lg bg-primary px-6 py-4 text-xl font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary/90"
        >
          Get Advice
        </button>
      </div>
    </>
  );
};

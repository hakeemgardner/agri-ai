export const UploadArea = ({ isLoading, handleFileUpload }) => {
  return (
    <>
      <div className="mb-10 text-center">
        <h2 className="jamaican-black text-4xl font-black tracking-tight md:text-5xl dark:text-white">
          Crop Disease Detection
        </h2>
        <p className="text-foreground-light/80 dark:text-foreground-dark/80 mx-auto mt-4 max-w-2xl text-lg md:text-xl">
          Upload a clear photo of an affected leaf. Our AI will analyze it and
          provide an instant diagnosis and treatment plan.
        </p>
      </div>
      <div className="dark:bg-subtle-dark border-subtle-light dark:border-border-dark rounded-xl border-2 border-dashed bg-background-light p-8 text-center transition-all duration-300 hover:border-primary hover:bg-primary/5 md:p-12 dark:hover:bg-primary/10">
        <div className="flex flex-col items-center justify-center space-y-6">
          <span className="material-symbols-outlined text-7xl text-primary">
            cloud_upload
          </span>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold tracking-tight">
              Drag &amp; Drop or Click to Upload
            </h3>
            <p className="text-foreground-light/70 dark:text-foreground-dark/70">
              PNG, JPG, or WEBP files up to 10MB.
            </p>
          </div>
          <label className="relative cursor-pointer" htmlFor="file-upload">
            <div className="inline-flex transform items-center justify-center rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary/90">
              {isLoading ? "Analyzing..." : "Upload Photo"}
            </div>
            <input
              className="sr-only"
              id="file-upload"
              name="file-upload"
              type="file"
              onChange={handleFileUpload}
              disabled={isLoading}
            />
          </label>
        </div>
      </div>
    </>
  );
};

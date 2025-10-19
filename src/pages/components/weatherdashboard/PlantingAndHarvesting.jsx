const plantingImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBcySV4xw_gzfdDfWvomM8zul3vR3qX9VDDXQESTesTC8xFO8qCHtyuOFeFE9I40-wM_EHpWV6RXAxdYMXqWiA8Xs5JHiCEsjyxyacq_EvTOpMFdOPNz-UWht1SEz-iyyI3ZjKp4RLy-NZ577OhCOWUg-VmP3XCjA8hrPiFiacOzG1Jfv1ANncUez4TnQmKk_0H_q7VyVyK8_H9c7WQtGq0SdLje8S3irfJulBLf8lDKP91_4VHSvSWazP2jxg6sIc-x0PzGJb2L7I";
const harvestingImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB3_Zy4PaiU6SNPP4aVxtM60HL16x14iUbVGVmec8-VFzhTEeO06soowBOkd6AvtGuJECRjD80aDogoabNRq9kIyJQv2jktvhsZRg9pQUvuBnuNmiX4D0bWz4zN9gsGtAB3GG2sYvDNeOSndeh5a7eNbekIw-wxO78g1dncziofybVRN1hw7wGLEDqNcqZzcIz4B74sh3AJjZSC69SujsNMZboKsu8XJeXOxy3FEQDS3JZbYxKIUBSQHpQlJL1_lB3wfGGWAfT5qUE";
export const PlantingAndHarvesting = ({ parsedAdvice }) => {
  return (
    <div className="dark:bg-background-dark rounded-xl border border-primary/20 bg-background-light p-6 shadow-sm dark:border-primary/30">
      <h3 className="mb-4 text-xl font-bold">
        Planting &amp; Harvesting Advice
      </h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex gap-4">
          <img
            alt="Planting"
            className="h-24 w-24 rounded-lg object-cover"
            src={plantingImage}
          />
          <div>
            {parsedAdvice ? (
              <>
                <p className="text-lg font-bold text-primary">Time to plant</p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {parsedAdvice.advice}
                </p>
              </>
            ) : (
              "Loading"
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <img
            alt="Harvesting"
            className="h-24 w-24 rounded-lg object-cover"
            src={harvestingImage}
          />
          <div>
            {parsedAdvice ? (
              <>
                <p className="text-lg font-bold text-primary">
                  Harvest Sweet Potatoes
                </p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {parsedAdvice.tips}
                </p>
              </>
            ) : (
              "Loading"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";

export const FertilizerAdvice = () => {
  return <div className=" h-[700px] flex flex-wrap p-20 justify-center gap-6">
    <div className=" h-[500px] w-[400px] rounded-2xl p-5 justify-center">
       <h1 className="text-4xl font-bold">Fertilizer <br />Advice</h1>
       <h2 className="text-gray-600">Get Ai-powered recommendation for <br /> your crops. </h2>
       <h2 className="mt-5 font-bold">Mi Crop Type</h2>
        <select className="mt-3 font-bold text-[17px]  border-gray-300 cursor-pointer border-2 w-[100%] p-2 rounded-[10px] h-[50px]  bg-white text-gray-700 focus:outline-none focus:ring-2 space-x-2 transform transition-transform duration-200 hover:-translate-y-1">
              <option className="font-bold" value="">
                Select crop Type
              </option>
              <option className="font-bold" value="">
                Yam
              </option>
              <option className="font-bold" value="jm">
                Sweet Potato
              </option>
              <option className="font-bold" value="us">
                United States
              </option>
              <option className="font-bold" value="ca">
                Callaloo
              </option>
              <option className="font-bold" value="">
                Schotch Bonnet Pepper
              </option>
            </select>
            <h2 className="mt-6 font-bold">Mi soil Type</h2>
        <select className=" mt-3 font-bold text-[17px] cursor-pointer border-2 w-[100%] p-2 rounded-[10px] h-[50px] border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 space-x-2 transform transition-transform duration-200 hover:-translate-y-1">
              <option className="font-bold " value="">
                Select Soil Type
              </option>
              <option className="font-bold" value="">
                Clay loam
              </option>
              <option className="font-bold" value="jm">
                Sandy Loam
              </option>
              <option className="font-bold" value="us">
                red (Red Dirt)
              </option>
            </select>
            <button className="bg-green-600 mt-10 p-3 w-[100%] rounded-[5px] ">Get Advice</button>
    </div>
    <div className=" bg-green-100 h-[450px] w-[340px] rounded-2xl p-5">
      <h1 className="text-2xl font-bold">Your Recommendation</h1>
      <h2>Here's our AI Suggests:</h2>
      <div className="h-[100px] w-[100%] bg-white mt-5 rounded-[5px] justify-center text-center p-3">
        <h2 className="font-bold">
          Fertilizer Mix
        </h2>
        <p>20-20-20 Npx Blend</p>
      </div>
      <div className="h-[100px] w-[100%] bg-white mt-5 rounded-[5px] justify-center text-center p-3">
        <h2 className="font-bold">
          Fertilizer Mix
        </h2>
        <p>Apply at planting and every 4 weeks after.</p>
      </div>
      <p className="mt-5">Disclaimer: Always follow manufacturer's instructions for application rates and safety. This is a recommendation, not a guarantee.</p>
    </div>
    
  </div>;
};

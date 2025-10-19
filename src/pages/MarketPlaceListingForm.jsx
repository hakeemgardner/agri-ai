
import React from "react";
import { CreateProduct } from "../database/product_service/create_product";

export const MarketPlaceListingForm = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl mt-5 font-bold">ADD MI CROP</h1>
      <div className=" w-[100%] h-[700px] justify-center flex flex-wrap">
        <div className=" w-[600px] h-[600px] rounded-2xl p-10">
          <h2 className="text-2xl font-bold">Category</h2>
          <select
            className="bg-white mt-5 p-3 font-bold rounded-2xl border-2 shadow-2xl border-gray-400"
            name="text"
            id="">
            <option value="">Select the categary</option>
            <option value="">vegetable</option>
            <option value="">Fruits</option>
            <option value="">Dairy</option>
            <option value="">Grains</option>
            <option value="">Meat</option>
            <option value="">Poultry</option>
            <option value="">Seafood</option>
          </select>
          <div className="border-dashed h-[300px] w-[100%] shadow-2xl border-2 rounded-3xl mt-10 text-2xl hover:border-green-400 hover:bg-green-100">
            <h1 className="mt-5 font-bold">
              Drag and Drop To Upload Your Image.
            </h1>
            <button className="bg-green-400 p-3 rounded-2xl mt-40 hover:bg-green-500">
              Upload Image
            </button>
          </div>
          <div className=" s p-10 rounded-2xl text-center justify-center flex flex-wrap gap-5">
            <input
              className="bg-white shadow rounded-2xl p-3"
              type="number"
              step={0.01}
              placeholder="Price 0.00"
            />
            <input
              className="bg-white shadow rounded-2xl p-3 s"
              type="number"
              placeholder="Amount"
            />
            <input
              className="bg-white rounded-2xl p-3 shadow"
              type="number"
              placeholder=" Weight 0.00"
              step={0.01}
            />
            <input
              className="bg-white rounded-2xl p-3 shadow"
              type="number"
              placeholder="Weight unit 0.00"
              step={0.01}
            />
            <select className="w-[100%] p-3 rounded-2xl bg-white shadow" name="" id="">
              <option value="">Select Parish</option>
              <option value="Kingston">Kingston</option>
              <option value="St. Andrew">St. Andrew</option>
              <option value="St. Catherine">St. Catherine</option>
              <option value="Clarendon">Clarendon</option>
              <option value="Manchester">Manchester</option>
              <option value="St. Elizabeth">St. Elizabeth</option>
              <option value="Westmoreland">Westmoreland</option>
              <option value="Hanover">Hanover</option>
              <option value="St. James">St. James</option>
              <option value="Trelawny">Trelawny</option>
              <option value="St. Ann">St. Ann</option>
              <option value="St. Mary">St. Mary</option>
              <option value="Portland">Portland</option>
              <option value="St. Thomas">St. Thomas</option>
            </select>
            <button className="bg-green-400 text-[20px] p-3 w-[150px] rounded-2xl hover:bg-green-500">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

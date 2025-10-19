import React, { useEffect, useState } from "react";
import { ReadCurrentUser } from "../database/farmer_service/read_current_farmer";
import { UpdateCurrentUser } from "../database/farmer_service/update_service";
import { FetchCurrentUserProducts } from "../database/product_service/read_single_product";

export const Profile = () => {
  const [_userInfo, setuserInfo] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      const user = await ReadCurrentUser();
      FetchCurrentUserProducts();
      setuserInfo(user);
    }
    fetchData();

    return;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = await UpdateCurrentUser(_userInfo);
    if (updatedUser) {
      setuserInfo(updatedUser);
    }
  }
  
  return (
    <div className="min-h-screen bg-[#fffdf6] font-sans text-gray-800">
      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-2">Profile</h1>
        <p className="text-gray-500 mb-8">
          Manage your account settings and preferences.
        </p>

        <div className="bg-white shadow-md border border-gray-100 rounded-xl p-6 flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/90"
              alt="user avatar"
              className="rounded-full w-20 h-20 border border-gray-200"
            />
            <div>
              <h2 className="font-semibold text-lg">{_userInfo?.name || 'Loading...'}</h2>
              <p className="text-gray-500">Farmer</p>
              <p className="text-sm text-gray-400">
                Joined AgriConnect AI in {_userInfo?.created_at ? new Date(_userInfo.created_at).getFullYear() : '2025'}
              </p>
            </div>
          </div>
          <button className="bg-green-400 hover:bg-green-500 text-sm font-semibold px-4 py-2 rounded-md transition">
            Edit Profile
          </button>
        </div>

        <form className="space-y-10" onSubmit={handleSubmit}>
          <section>
            <h3 className="text-xl font-semibold mb-4 ">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-600 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={_userInfo?.name || ''}
                  onChange={(e) => setuserInfo({..._userInfo, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={_userInfo?.email || ''}
                  onChange={(e) => setuserInfo({..._userInfo, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={_userInfo?.telephone || ''}
                  onChange={(e) => setuserInfo({..._userInfo, telephone: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Parish</label>
                <select
                  name="parish"
                  value={_userInfo?.parish || ''}
                  onChange={(e) => setuserInfo({..._userInfo, parish: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none">
                  <option value="">Select Parish</option>
                  <option>St. Catherine</option>
                  <option>Clarendon</option>
                  <option>Manchester</option>
                  <option>St. Elizabeth</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-400 hover:bg-green-500 font-semibold text-gray-800 px-6 py-3 mt-10 rounded-lg transition">
              Save Changes
            </button>
          </section>
          <h1 className="text-[20px] font-bold">Farmer Products</h1>
          <div className="flex justify-center gap-5">
            <div className="bg-background-light rounded-xl overflow-hidden border p-15 w-80 justify-center text-center uborder-border-light shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className=""></div>
              <div className="p-6 w-[200px]">
                <h4 className="text-2xl font-bold text-content-light dark:text-content-dark">
                  Banana
                </h4>
                <p className="text-lg text-content-light/80 mt-1">$5/Hand</p>
                <button className="mt-6 w-full h-14 bg-green-400 text-content-dark text-lg font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
                  Contact Farmer
                </button>
              </div>
            </div>
            <div className="bg-background-light rounded-xl overflow-hidden border p-15 w-80 justify-center text-center uborder-border-light shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className=""></div>
              <div className="p-6 w-[200px]">
                <h4 className="text-2xl font-bold text-content-light dark:text-content-dark">
                  Banana
                </h4>
                <p className="text-lg text-content-light/80 mt-1">$5/Hand</p>
                <button className="mt-6 w-full h-14 bg-green-400 text-content-dark text-lg font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
                  Contact Farmer
                </button>
              </div>
            </div>
            <div className="bg-background-light rounded-xl overflow-hidden border p-15 w-80 justify-center text-center uborder-border-light shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className=""></div>
              <div className="p-6 w-[200px]">
                <h4 className="text-2xl font-bold text-content-light dark:text-content-dark">
                  Banana
                </h4>
                <p className="text-lg text-content-light/80 mt-1">$5/Hand</p>
                <button className="mt-6 w-full h-14 bg-green-400 text-content-dark text-lg font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
                  Contact Farmer
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};
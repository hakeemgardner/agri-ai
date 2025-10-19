import React, { useEffect, useState } from "react";
import { ReadCurrentUser } from "../database/farmer_service/read_current_farmer";
import { UpdateCurrentUser } from "../database/farmer_service/update_service";
import { FetchCurrentUserProducts } from "../database/product_service/read_single_product";
import { logoutUser } from "../database/farmer_service/log_out";

export const Profile = () => {
  const [_userInfo, setuserInfo] = useState(null);
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      const user = await ReadCurrentUser();
      const userProducts = await FetchCurrentUserProducts();
      setuserInfo(user);
      setProducts(userProducts || []);
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
  
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
    
    const result = await DeleteProduct(productId);
    if (result) {
      // Remove the deleted product from the state
      setProducts(products.filter(product => product.id !== productId));
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
          <button onClick={logoutUser} className="bg-green-400 hover:bg-green-500 text-sm font-semibold px-4 py-2 rounded-md transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" role="img">
              <title>Logout</title>
              <path d="M10 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20 12H9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17 9l3 3-3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <form className="space-y-10" onSubmit={handleSubmit}>
          <section>
            <h3 className="text-xl font-semibold mb-4">
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
        </form>

        <div className="mt-10">
          <h1 className="text-[20px] font-bold mb-6">My Products</h1>
          
          {products.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p>No products found. Start adding products to your marketplace!</p>
            </div>
          ) : (
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-5 min-w-max">
                {products.map((product, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl overflow-hidden border border-gray-200 w-72 flex-shrink-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                      {product.image_url ? (
                        <img 
                          src={product.image_url} 
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 text-center">
                          <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm">No Image</p>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h4 className="text-2xl font-bold text-gray-800 mb-2">
                        {product.title}
                      </h4>
                      <p className="text-sm text-gray-500 mb-2">
                        Category: {product.category}
                      </p>
                      <p className="text-lg font-semibold text-green-600 mb-1">
                        ${product.price}/{product.weight_unit}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        Available: {product.amount} units
                      </p>
                      <p className="text-sm text-gray-600 mb-3">
                        Weight: {product.weight} {product.weight_unit}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        📍 {product.parish}
                      </p>
                      <div className="flex gap-2">
                        <button className="flex-1 h-12 bg-green-400 text-gray-800 text-base font-bold rounded-lg hover:bg-green-500 transition-colors">
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="flex-1 h-12 bg-red-500 text-white text-base font-bold rounded-lg hover:bg-red-600 transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
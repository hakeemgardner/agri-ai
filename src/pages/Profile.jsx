import React, { useEffect, useState } from "react";
import { ReadCurrentUser } from "../database/farmer_service/read_current_farmer";
import { UpdateCurrentUser } from "../database/farmer_service/update_service";
import { FetchCurrentUserProducts } from "../database/product_service/read_single_product";
import { logoutUser } from "../database/farmer_service/log_out";
import { UpdateProduct } from "../database/farmer_service/update_product";

export const Profile = () => {
  const [_userInfo, setuserInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    category: "",
    price: "",
    quantity: 0,
    weight: "",
    weight_unit: "lb",
    parish: "",
  });
  
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

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditForm({
      title: product.title,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
      weight: product.weight,
      weight_unit: product.weight_unit,
      parish: product.parish,
    });
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const result = await UpdateProduct(editingProduct.id, editForm);
    if (result) {
      // Update the product in the local state
      setProducts(products.map(p => p.id === editingProduct.id ? result : p));
      setEditingProduct(null);
    }
  }

  const closeModal = () => {
    setEditingProduct(null);
  }

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
              <h2 className="font-semibold text-lg"></h2>
              <p className="text-gray-500">Farmer</p>
              <p className="text-sm text-gray-400">
                Joined AgriConnect AI in 2025
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

        <form className="space-y-10">
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
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Parish</label>
                <select
                  name="parish"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none">
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
          <h1 className="text-[20px] font-bold">Farmer Producs </h1>
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
                        <button
                          onClick={() => handleEdit(product)}
                          className="flex-1 h-12 bg-green-400 text-gray-800 text-base font-bold rounded-lg hover:bg-green-500 transition-colors">
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

      {/* Card */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Edit Product</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-3xl leading-none">&times;</button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Product Title</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Category</label>
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editForm.price}
                    onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Amount Available</label>
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Weight</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editForm.weight}
                    onChange={(e) => setEditForm({...editForm, weight: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Weight Unit</label>
                  <select
                    value={editForm.weight_unit}
                    onChange={(e) => setEditForm({...editForm, weight_unit: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
                    required>
                    <option value="lb">lb (Pounds)</option>
                    <option value="kg">kg (Kilograms)</option>
                    <option value="oz">oz (Ounces)</option>
                    <option value="g">g (Grams)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Parish</label>
                  <select
                    value={editForm.parish}
                    onChange={(e) => setEditForm({...editForm, parish: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
                    required>
                    <option value="">Select Parish</option>
                    <option>St. Catherine</option>
                    <option>Clarendon</option>
                    <option>Manchester</option>
                    <option>St. Elizabeth</option>
                    <option>Kingston</option>
                    <option>St. Andrew</option>
                    <option>St. Thomas</option>
                    <option>Portland</option>
                    <option>St. Mary</option>
                    <option>St. Ann</option>
                    <option>Trelawny</option>
                    <option>St. James</option>
                    <option>Hanover</option>
                    <option>Westmoreland</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-400 hover:bg-green-500 text-gray-800 font-bold py-3 px-6 rounded-lg transition">
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

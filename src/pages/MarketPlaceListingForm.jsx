import React, { useState } from "react";
import { CreateProduct, uploadImageToSupabase } from "../database/product_service/create_product";
import Header from "../Components/Header";

export const MarketPlaceListingForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    amount: "",
    weight: "",
    weight_unit: "lb",
    parish: "",
    image_url: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Vegetables",
    "Fruits",
    "Dairy",
    "Grains",
    "Meat",
    "Poultry",
    "Seafood"
  ];

  const parishes = [
    "Kingston",
    "St. Andrew",
    "St. Catherine",
    "Clarendon",
    "Manchester",
    "St. Elizabeth",
    "Westmoreland",
    "Hanover",
    "St. James",
    "Trelawny",
    "St. Ann",
    "St. Mary",
    "Portland",
    "St. Thomas"
  ];

  const weightUnits = ["lb", "kg", "oz", "g"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Upload image to Supabase first
      let imageUrl = null;
      if (formData.image) {
        imageUrl = await uploadImageToSupabase(formData.image);
      }

      // Prepare data for submission
      const productData = {
        title: formData.title,
        category: formData.category,
        price: `${parseFloat(formData.price).toFixed(2)}/${formData.weightUnit}`,
        amount: parseInt(formData.amount),
        weight: parseFloat(formData.weight),
        weight_unit: formData.weight_unit,
        location: formData.parish,
        image_url: imageUrl, // Use the Supabase URL instead of base64
      };

      await CreateProduct(productData);
      
      // Reset form
      setFormData({
        title: "",
        category: "",
        price: "",
        amount: "",
        weight: "",
        weight_unit: "lb",
        parish: "",
        image_url: null,
      });
      setImagePreview(null);
      
      alert("Crop listing added successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to add crop listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <Header></Header>

    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Add Your Crop
          </h1>
          <p className="text-lg text-gray-600">
            List your fresh produce on the marketplace
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Crop Details Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              Crop Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Crop Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Crop Name *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Scotch Bonnet Peppers"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Parish */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Parish *
                </label>
                <select
                  name="parish"
                  value={formData.parish}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="">Select parish</option>
                  {parishes.map((parish) => (
                    <option key={parish} value={parish}>
                      {parish}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    placeholder="0.00"
                    required
                    className="w-full pl-8 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  />
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Available Amount *
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Quantity available"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Weight per Unit *
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  step="0.01"
                  placeholder="0.00"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                />
              </div>

              {/* Weight Unit */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Weight Unit *
                </label>
                <select
                  name="weightUnit"
                  value={formData.weightUnit}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  {weightUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              Crop Image
            </h2>
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-3 border-dashed rounded-3xl p-8 text-center transition-all ${
                isDragging
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 bg-gray-50"
              } ${imagePreview ? "h-auto" : "h-72"}`}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded-xl shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData((prev) => ({ ...prev, image: null }));
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <svg width="120" height="80" viewBox="0 0 64 40" xmlns="http://www.w3.org/2000/svg" aria-labelledby="title1" role="img">
                    <title id="title1">Cloud</title>
                    <path d="M20 30H52c4.4 0 8-3.6 8-8 0-4.1-3.1-7.4-7-7.9C50.5 8.9 43.6 4 36 4c-7 0-12.8 4.2-15 10C13.6 15.2 8 19 8 24c0 4.4 3.6 8 8 8z" fill="#E6EEF9"/>
                  </svg>

                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    Drag and drop your image here
                  </h3>
                  <p className="text-gray-500 mb-6">or</p>
                  <label className="inline-block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <span className="bg-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors cursor-pointer inline-block">
                      Browse Files
                    </span>
                  </label>
                </>
              )}
            </div>
            </div>
            <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  Adding Crop...
                </span>
              ) : (
                <span className="flex items-center">
                  List Crop on Marketplace
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
      </div>
    </>
  );
};
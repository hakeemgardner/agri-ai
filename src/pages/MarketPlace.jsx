import CropListings from "../Components/CropsListings";
import FarmerModal from "../Components/FarmerModal";
import React, { useEffect, useState } from "react";
import { FetchAllProduct } from "../database/product_service/read_multi_product";
import { Header } from "../Components/Header";
import { NavLink } from "react-router";
import { QueryFarmer } from "../database/farmer_service/query_farmer";

export const MarketPlace = () => {
  const [cropData, setCropData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParish, setSelectedParish] = useState("All Parishes");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FetchAllProduct();
        console.log("Fetched crop data:", data);
        setCropData(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    

    fetchData();
  }, []);

  // Filter crops based on search and parish
  const filteredCrops = cropData.filter((crop) => {
    const matchesSearch = crop.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesParish = selectedParish === "All Parishes" || crop.location === selectedParish;
    return matchesSearch && matchesParish;
  });

  const handleContactClick = async (crop) => {
    try {
      // If crop has farmer_id, fetch full farmer data
      console.log("The crop is", crop)
      if (crop.farmer_id) {
        const farmerData = await QueryFarmer({id: crop.farmer_id});
        console.log("Farmer Data here", farmerData);
        setSelectedFarmer(farmerData);
        // Wait for state to update before opening modal
        setTimeout(() => setIsModalOpen(true), 0);
      } else {
        // Fallback: use farmer data embedded in crop (for backward compatibility)
        setSelectedFarmer({
          name: crop.farmerName || "Local Farmer",
          phone: crop.farmerPhone || "+1 (876) 555-0000",
          email: crop.farmerEmail || "farmer@farm.jm",
          location: crop.location || "Jamaica",
          farm: crop.farmName || "Local Farm",
          bio: crop.farmerBio || "Dedicated to providing quality produce."
        });
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching farmer data:", error);
      alert("Failed to load farmer information. Please try again.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFarmer(null);
  };

  const parishes = [
    "All Parishes",
    "Kingston",
    "St. Andrew",
    "Portland",
    "St. Thomas",
    "St. Catherine",
    "Clarendon",
    "Manchester",
    "St. Elizabeth",
    "Westmoreland",
    "Hanover",
    "St. James",
    "Trelawny",
    "St. Ann",
    "St. Mary"
  ];

  return (
    <>
    <Header></Header>
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold text-content-light mb-4">
            MarketPlace
          </h2>
          <p className="text-xl text-content-light/80">
            Find fresh, locally-grown produce directly from Jamaican farmers.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="p-2 rounded-xl mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {/* Search Input */}
            <div className="relative col-span-1 md:col-span-2">
              <input
                placeholder="Search for crops (e.g., Scotch Bonnet)"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-14 pr-4 text-lg border-1 drop-shadow-sm rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-content-light dark:text-content-dark transition-all"
              />
            </div>

            {/* Parish Filter */}
            <div className="relative">
              <select
                value={selectedParish}
                onChange={(e) => setSelectedParish(e.target.value)}
                className="cursor-pointer w-full h-14 px-4 text-lg appearance-none border-1 drop-shadow-sm rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-content-light dark:text-content-dark transition-all"
              >
                {parishes.map((parish) => (
                  <option key={parish} value={parish}>
                    {parish}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          {searchQuery || selectedParish !== "All Parishes" ? (
            <div className="mt-4 text-sm text-content-light/70">
              Showing {filteredCrops.length} {filteredCrops.length === 1 ? 'result' : 'results'}
            </div>
          ) : null}
        </div>

        {/* Crop Listings Section */}
        <h3 className="text-3xl font-bold text-content-light mb-8">
          Available Crops
        </h3>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCrops.length > 0 ? (
            filteredCrops.map((crop) => (
              <CropListings
                key={crop.id || crop.title}
                image={crop.image_url || "/src/assets/images/placeholder.jpg"}
                title={crop.title}
                price={crop.price || "Price upon request"}
                quantity={crop.weight_unit}
                farmer={crop}
                onContactClick={handleContactClick}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center px-4 py-16">
              <div className="bg-surface-light dark:bg-surface-dark max-w-md rounded-xl p-12 text-center">
                <svg
                  className="text-muted-light dark:text-muted-dark mx-auto mb-6 h-24 w-24"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <h2 className="text-text-light dark:text-text-dark mb-4 text-3xl font-bold">
                  {cropData.length === 0 ? "No Crops Yet" : "No Matches Found"}
                </h2>
                <p className="text-muted-light dark:text-muted-dark mb-6 text-lg">
                  {cropData.length === 0
                    ? "Mi fren, nuh crops nuh available yet. Check back soon!"
                    : "Try adjusting your search or filter to find what you're looking for."}
                </p>
                {(searchQuery || selectedParish !== "All Parishes") && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedParish("All Parishes");
                    }}
                    className="mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Farmer Contact Modal */}
      <FarmerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        farmer={selectedFarmer}
      />
      </main>
    </>
  );
};
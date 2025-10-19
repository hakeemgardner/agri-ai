import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { ReadData, readFarmers } from "../database/admin_service/read_multi_products";

export const RADAOfficerDashboard = () => {
  const [farmerInfo, setfarmerInfo] = useState([]);
  const [productListing, setproductListing] = useState([]);
  const [message, setmessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      const farmers = await readFarmers();
      const crops = await ReadData();
      
      setRadaData({
        regFarmers: farmers.length,
        activeListing: crops.length
      });

      // Create a map of userId to farmer name for quick lookup
      const farmerMap = farmers.reduce((acc, farmer) => {
        acc[farmer.id] = farmer.name || farmer.farmer_id; // Use name if available, fallback to farmer_id
        return acc;
      }, {});

      // Enrich crop data with farmer names
      const sortedCrops = crops
        .filter((crop) => crop.created_at)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5)
        .map((crop) => ({
          ...crop,
          userName: farmerMap[crop.auth_userId] || "Unknown Farmer"
        }));
  
      setRecentListings(sortedCrops);
    }

    fetchData();
    return;
  
  }, []);

  //time ago function
  function timeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const seconds = Math.floor((now - date) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    async function handleMessageSubmit(e) {
      e.preventDefault();
      await CreateMessage({ message: message });
    }

    return (
      <div className="dark:bg-background-dark font-display text-content-light dark:text-content-dark bg-background-light">
        <div className="flex h-screen flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 md:p-10">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight">
                  RADA Officer Dashboard
                </h2>
                <p className="text-subtle-light dark:text-subtle-dark mt-1">
                  Welcome back, Officer Thompson. Here's your overview.
                </p>
              </div>
              <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col gap-2 rounded-lg border border-primary/20 bg-primary/10 p-6 dark:border-primary/30 dark:bg-primary/20">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium">Registered Farmers</h3>
                    <span className="material-symbols-outlined text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m10 0a4 4 0 00-8 0m8 0a4 4 0 013 3.87v2M9 10a4 4 0 100-8 4 4 0 000 8z" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-4xl font-bold">{radaData.regFarmers}</p>
                </div>
                <div className="flex flex-col gap-2 rounded-lg border border-primary/20 bg-primary/10 p-6 dark:border-primary/30 dark:bg-primary/20">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium">Active Listings</h3>
                    <span className="material-symbols-outlined text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18v4H3V3zm0 6h18v12H3V9zm5 4h4v4H8v-4z" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-4xl font-bold">{radaData.activeListing}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <h3 className="mb-4 text-xl font-bold">Recent Activity</h3>
                  <div className="overflow-x-auto rounded-lg border border-primary/20 dark:border-primary/30">
                    <table className="min-w-full divide-y divide-primary/20 dark:divide-primary/30">
                      <thead className="bg-primary/10 dark:bg-primary/20">
                        <tr>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
                            scope="col"
                          >
                            Activity
                          </th>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
                            scope="col"
                          >
                            Details
                          </th>
                          <th
                            className="px-6 py-3 text-left text-xs font-medium tracking-wider uppercase"
                            scope="col"
                          >
                            Timestamp
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-primary/20 dark:divide-primary/30">
                        {recentListings.map((crop, idx) => (
                          <tr key={idx}>
                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">New Listing</td>
                            <td className="text-subtle-light dark:text-subtle-dark px-6 py-4 text-sm whitespace-nowrap">
                              {crop.userName} listed {crop.weight}kg of {crop.title}
                            </td>
                            <td className="text-subtle-light dark:text-subtle-dark px-6 py-4 text-sm whitespace-nowrap">
                              {timeAgo(crop.created_at)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-xl font-bold">Broadcast Message</h3>
                  <div className="flex flex-col gap-4 rounded-lg border border-primary/20 bg-primary/10 p-6 dark:border-primary/30 dark:bg-primary/20">
                    <textarea
                      className="dark:bg-background-dark placeholder:text-subtle-light dark:placeholder:text-subtle-dark min-h-[120px] w-full resize-none rounded border border-primary/30 bg-background-light p-3 text-sm focus:border-primary focus:ring-primary"
                      placeholder="Type your message here..."
                    ></textarea>
                    <button className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary/90">
                      Send to All Farmers
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

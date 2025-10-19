import CropListings from "../Components/CropsListings";
import FarmerModal from "../Components/FarmerModal";
import React, { useEffect, useState } from "react";
import { FetchAllProduct } from "../database/product_service/read_multi_product";
import { Header } from "../Components/Header";

export const MarketPlace = () => {
  const [cropData, setcropData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await FetchAllProduct();
      console.log(data);
      setcropData(data);
      return;
    }

    fetchData();
    return;
  
  }, []);

  console.log("Hello", cropData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  // Farmer data for each crop
  const farmersData = {
    'Scotch Bonnet Peppers': {
      name: 'Marcus Thompson',
      phone: '+1 (876) 555-0123',
      email: 'marcus.thompson@farm.jm',
      location: 'St. Elizabeth Parish',
      farm: 'Thompson\'s Organic Farm',
      bio: 'Growing premium peppers for over 15 years with organic farming practices.'
    },
    'Callaloo': {
      name: 'Jennifer Blake',
      phone: '+1 (876) 555-0456',
      email: 'jennifer.blake@farm.jm',
      location: 'Clarendon Parish',
      farm: 'Blake Family Greens',
      bio: 'Third-generation farmer specializing in leafy greens and traditional Jamaican vegetables.'
    },
    'Ackee': {
      name: 'Winston Clarke',
      phone: '+1 (876) 555-0789',
      email: 'winston.clarke@farm.jm',
      location: 'Manchester Parish',
      farm: 'Clarke Heritage Farm',
      bio: 'Producing the finest ackee from trees planted by my grandfather. Quality guaranteed.'
    },
    'Sweet Potatoes': {
      name: 'Pauline Stewart',
      phone: '+1 (876) 555-0321',
      email: 'pauline.stewart@farm.jm',
      location: 'Trelawny Parish',
      farm: 'Stewart Root Crops',
      bio: 'Specializing in root vegetables with sustainable farming methods for 20 years.'
    },
    'Plantains': {
      name: 'Robert "Bobby" Graham',
      phone: '+1 (876) 555-0654',
      email: 'bobby.graham@farm.jm',
      location: 'Portland Parish',
      farm: 'Graham Plantain Estate',
      bio: 'Family-run plantation growing the best plantains in Portland for four generations.'
    },
    'Mangoes': {
      name: 'Sandra Williams',
      phone: '+1 (876) 555-0987',
      email: 'sandra.williams@farm.jm',
      location: 'St. Mary Parish',
      farm: 'Williams Mango Grove',
      bio: 'Growing Julie, East Indian, and Bombay mangoes with passion and care since 2005.'
    }
  };

  const handleContactClick = (farmer) => {
    setSelectedFarmer(farmer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    
  <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="max-w-5xl mx-auto ">
      <div className="mb-12 text-center"> 
        <h2 className="text-5xl font-bold text-content-light">MarketPlace</h2>
        <p className="mt-4 text-xl text-content-light/80">Find fresh, locally-grown produce directly from Jamaican farmers.</p>
      </div>
      <div className="bg-subtle-light dark:bg-subtle-dark p-6 rounded-xl mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative col-span-1 md:col-span-2">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-2xl"></span>
            <input
            placeholder="Search for crops(e.g., Scotch Bonnet)" 
            type="text"
            className="w-full h-16 pl-14 pr-4 text-lg bg-[#73d41133] border-2 border-[#73d41133] rounded-lg focus:[#73d411] text-content-[#73d41133]"
            />
          </div>
          <div className="relative">
            <select className="cursor-pointer w-full h-16 px-4 text-lg appearance-none form-select bg-background-light border-2 border-border-light rounded-lg focus:ring-primary focus:border-primary text-content-light ">
                <option>All Parishes</option>
                <option>Kingston</option>
                <option>St. Andrew</option>
                <option>Portland</option>
                <option>St. Thomas</option>
            </select>
          </div>
        </div>
      </div>
      <h3 className="text-3xl font-bold text-content-light mb-8">Crop Listings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CropListings 
          image="/src/assets/images/scotch.jpg"
          title="Scotch Bonnet Peppers"
          price="Price: $5/lb"
          farmer={farmersData['Scotch Bonnet Peppers']}
          onContactClick={handleContactClick}
        />
        <CropListings 
          image="/src/assets/images/callaloo.jpg"
          title="Callaloo"
          price="Price: $2/bunch"
          farmer={farmersData['Callaloo']}
          onContactClick={handleContactClick}
        />
        <CropListings 
          image="/src/assets/images/sweet.jpg"
          title="Sweet Potatoes"
          price="Price: $1.50/lb"
          farmer={farmersData['Sweet Potatoes']}
          onContactClick={handleContactClick}
        />
        <CropListings 
          image="/src/assets/images/plant.jpg"
          title="Plantains"
          price="Price: $2/Hand"
          farmer={farmersData['Plantains']}
          onContactClick={handleContactClick}
        />
        <CropListings 
          image="/src/assets/images/ackee.jpg"
          title="Ackee"
          price="Price: $10/bunch"
          farmer={farmersData['Ackee']}
          onContactClick={handleContactClick}
        />
        <CropListings 
          image="/src/assets/images/callaloo.jpg"
          title="Callaloo"
          price="Price: $2/bunch"
          farmer={farmersData['Callaloo']}
          onContactClick={handleContactClick}
        />
      </div>
    </div>
    {/* Modal */}
      <FarmerModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        farmer={selectedFarmer}
      />
  </main>
  </>
)
};

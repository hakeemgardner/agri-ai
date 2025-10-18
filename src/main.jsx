import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { SignUpPage } from "./pages/auth/SignUpPage.jsx";
import { LoginPage } from "./pages/auth/LoginPage.jsx";
import { MarketPlaceListingForm } from "./pages/MarketPlaceListingForm.jsx";
import { MarketPlace } from "./pages/MarketPlace.jsx";
import { CropDiseaseDetectionPage } from "./pages/CropDiseaseDetectionPage.jsx";
import { FertilizerAdvice } from "./pages/FertilizerAdvice.jsx";
import { WeatherDashboard } from "./pages/WeatherDashboard.jsx";
import { RADAOfficerDashboard } from "./pages/RADAOfficerDashboard.jsx";
import { Profile } from "./pages/Profile.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/buyer-market-place"
          element={<MarketPlaceListingForm />}
        />
        <Route path="/market-place" element={<MarketPlace />} />
        <Route
          path="/crop-disease-detection"
          element={<CropDiseaseDetectionPage />}
        />
        <Route path="/fertilizer-advice" element={<FertilizerAdvice />} />
        <Route path="/weatherdashboard" element={<WeatherDashboard />} />
        <Route path="/admin" element={<RADAOfficerDashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
    
  </StrictMode>
);

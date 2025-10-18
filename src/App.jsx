// ...existing code...
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
// ...existing code...
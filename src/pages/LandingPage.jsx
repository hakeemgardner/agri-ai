import { Header } from "../Components/Header";
export const LandingPage = () => {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <section
          className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/src/assets/images/hero.jpg')" }}
        >
          <div className="text-center px-4 max-w-4xl text-white">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-shadow">
              Empowering Jamaican Farmers with AI
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-shadow">
              AgriConnect is a government-supported platform providing small
              farmers with AI and digital tools to connect with buyers, detect
              crop diseases, and receive personalized farming advice.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button className="px-4 py-2 text-sm font-bold bg-green-500 text-background-dark rounded-full hover:bg-primary/90 transition-colors shadow-md cursor-pointer hover:scale-105">
                Join as a Farmer
              </button>
              <button className="hidden md:block px-4 py-2 text-sm font-bold bg-green-500 text-background-dark rounded-full hover:bg-primary/90 transition-colors shadow-md cursor-pointer hover:scale-105 shadow-lg">
                Find Crops as a Buyer
              </button>
            </div>
          </div>
        </section>
        <section className="py-16 sm:py-24 bg-background-light dark:bg-background-dark">
          <div className="container mx-auto px-6 lg:px-10">
            <div className="text-center max-w-mxl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                Core Features
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Explore the key features of AgriAi designed to enhance your
                farming experience and connect you with the market.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col bg-white  rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div
                  className="w-full h-48 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/src/assets/images/Vege.jpg')",
                  }}
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Marketplace
                  </h3>
                  <p className="mt-2 text-base text-gray-600">
                    Connect with buyers directly, showcase your produce, and
                    expand your market reach.
                  </p>
                </div>
              </div>

              <div className="flex flex-col bg-white  rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div
                  className="w-full h-48 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/src/assets/images/ai.jpg')",
                  }}
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    AI Advisor
                  </h3>
                  <p className="mt-2 text-base text-gray-600">
                    Utilize AI-powered tools for early crop disease detection
                    and personalized fertilizer recommendations.
                  </p>
                </div>
              </div>

              <div className="flex flex-col bg-white  rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div
                  className="w-full h-48 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/src/assets/images/farm.jpg')",
                  }}
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Farming Advice
                  </h3>
                  <p className="mt-2 text-base text-gray-600">
                    Connect with buyers directly, showcase your produce, and
                    expand your market reach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="bg-background-light dark:bg-background-dark border-t border-primary/20 dark:border-primary/30">
          <div className="container mx-auto px-6 lg:px-10 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <a
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                href="#"
              >
                Terms of Service
              </a>
              <a
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                href="#"
              >
                Privacy Policy
              </a>
              <a
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                href="#"
              >
                Contact Us
              </a>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 AgriConnect. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

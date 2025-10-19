import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { supabase } from "../../client";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    async function getIsLoggedIn() {
      const currentUser = await supabase.auth.getUser();
      if (currentUser === null) return alert("User doesnt exisit");
      const { data, error } = await supabase
        .from("farmer_profile")
        .select("*")
        .eq("user_id", currentUser.data.user.id);
      if (error) {
        alert(error.message);
        return;
      }
      const user = data[0];
      console.log(user);
      if (user.isFarmer === true) {
        setisLoggedIn(true);
      } else {
        setisLoggedIn(false);
      }

      if (user.isAdmin === true) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
    getIsLoggedIn();
  }, []);
  
  return (
    <header className="sticky top-0 z-1000 bg-white shadow-sm">
      <nav className="mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg
            className="h-8 w-8 text-green-500"
            fill="currentColor"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
              fill="currentColor"
            ></path>
          </svg>
          <NavLink to="/" className="text-xl font-bold text-gray-900">
            AgriAI
          </NavLink>
        </div>
        {/* Destop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "dark:text-content-dark text-lg font-medium text-primary transition-colors hover:text-primary"
                : "text-content-light dark:text-content-dark text-lg font-medium transition-colors hover:text-primary"
            }
            to="/market-place"
            end
          >
            Marketplace
          </NavLink>
          {isLoggedIn ? (
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="text-content-light dark:text-content-dark text-lg font-medium transition-colors hover:cursor-pointer hover:text-primary focus:outline-none">
                AI Tools
              </button>
              {isDropdownOpen && (
                <div className="dark:bg-background-dark ring-opacity-5 absolute left-0 mt-0 w-56 rounded-md bg-background-light shadow-lg ring-1 ring-black">
                  <div className="py-2">
                    <NavLink
                      to="/fertilizer-advice"
                      className={({ isActive }) =>
                        isActive
                          ? "text-content-light dark:text-content-dark block bg-primary px-4 py-2 text-white"
                          : "text-content-light dark:text-content-dark block px-4 py-2 hover:bg-primary/10 hover:text-primary"
                      }
                    >
                      Fertilizer Advisor
                    </NavLink>
                    <NavLink
                      to="/crop-disease-detection"
                      className={({ isActive }) =>
                        isActive
                          ? "text-content-light dark:text-content-dark block bg-primary px-4 py-2 text-white"
                          : "text-content-light dark:text-content-dark block px-4 py-2 hover:bg-primary/10 hover:text-primary"
                      }
                    >
                      AI Crop Disease Detector
                    </NavLink>
                    <NavLink
                      to="/weatherdashboard"
                      className={({ isActive }) =>
                        isActive
                          ? "text-content-light dark:text-content-dark block bg-primary px-4 py-2 text-white"
                          : "text-content-light dark:text-content-dark block px-4 py-2 hover:bg-primary/10 hover:text-primary"
                      }
                    >
                      Weather AI
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
          {isAdmin ? (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "dark:text-content-dark text-lg font-medium text-primary transition-colors hover:text-primary"
                  : "text-content-light dark:text-content-dark text-lg font-medium transition-colors hover:text-primary"
              }
            >
              Dashboard
            </NavLink>
          ) : (
            ""
          )}
        </div>

        {/* Destop Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/sign-up">
            <button className="px-4 py-2 text-sm font-bold bg-green-500 text-white rounded-full hover:bg-green-700 transition-colors shadow-md cursor-pointer">
              Join as Farmer
            </button>
          </NavLink>
          <NavLink to="/market-place">
            <button className="px-4 py-2 text-sm font-bold bg-green-500 text-white rounded-full hover:bg-green-700 transition-colors shadow-md cursor-pointer">
              Find Crop As Buyer
            </button>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-900" />
          ) : (
            <Menu className="h-6 w-6 text-gray-900" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-6 py-4 flex flex-col gap-4">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "dark:text-content-dark text-lg font-medium text-primary transition-colors hover:text-primary"
                  : "text-content-light dark:text-content-dark text-lg font-medium transition-colors hover:text-primary"
              }
              to="/market-place"
              end
            >
              Marketplace
            </NavLink>
            {isLoggedIn ? (
              <>
                <NavLink
                  to="/fertilizer-advice"
                  className={({ isActive }) =>
                    isActive
                      ? "dark:text-content-dark text-lg font-medium text-primary transition-colors hover:text-primary"
                      : "text-content-light dark:text-content-dark text-lg font-medium transition-colors hover:text-primary"
                  }
                >
                  Fertilizer Advisor
                </NavLink>
                <NavLink
                  to="/crop-disease-detection"
                  className={({ isActive }) =>
                    isActive
                      ? "dark:text-content-dark text-lg font-medium text-primary transition-colors hover:text-primary"
                      : "text-content-light dark:text-content-dark text-lg font-medium transition-colors hover:text-primary"
                  }
                >
                  AI Crop Disease Detector
                </NavLink>
                <NavLink
                  to="/weatherdashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "dark:text-content-dark text-lg font-medium text-primary transition-colors hover:text-primary"
                      : "text-content-light dark:text-content-dark text-lg font-medium transition-colors hover:text-primary"
                  }
                >
                  Weather AI
                </NavLink>
              </>
            ) : (
              ""
            )}
            {isAdmin ? (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "dark:text-content-dark text-lg font-medium text-primary transition-colors hover:text-primary"
                    : "text-content-light dark:text-content-dark text-lg font-medium transition-colors hover:text-primary"
                }
                to="/admin"
              >
                Dashboard
              </NavLink>
            ) : (
              ""
            )}

            <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
              <NavLink to="/sign-up">
                <button className="px-4 py-2 text-sm font-bold bg-green-500 text-white rounded-full hover:bg-green-700 transition-colors shadow-md cursor-pointer">
                  Join as Farmer
                </button>
              </NavLink>
              <NavLink to="/market-place">
                <button className="px-4 py-2 text-sm font-bold bg-green-500 text-white rounded-full hover:bg-green-700 transition-colors shadow-md cursor-pointer">
                  Find Crop As Buyer
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

import { NavLink } from "react-router-dom"
import { useState } from "react"
import { Menu, X } from "lucide-react";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }


    return(
        <header className="sticky top-0 z-1000 bg-white shadow-sm">
            <nav className="mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <svg className="h-8 w-8 text-green-500" fill="currentColor"  viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
                    </svg>
                    <NavLink className="text-xl font-bold text-gray-900">AgriAI</NavLink>
                </div>
                {/* Destop Nav */}
                <div className="hidden md:flex items-center gap-8">
                   <a className="text-sm font-medium hover:text-green-500 transition-colors" href="#">Features</a>
                   <NavLink className="text-sm font-medium hover:text-green-500 transition-colors" to="/Dashboard">Dashboard</NavLink>
                   <NavLink className="text-sm font-medium hover:text-green-500 transition-colors" to="/MarketPlace">MarketPlace</NavLink>  
                </div>

                {/* Destop Buttons */}
                <div className="hidden md:flex items-center gap-2">
                    <NavLink to="/SignUpPage">
                      <button className="px-4 py-2 text-sm font-bold bg-green-500 text-white rounded-full hover:bg-green-700 transition-colors shadow-md cursor-pointer">
                        Join as Farmer
                      </button>
                    </NavLink>
                    <NavLink to="/LoginPage">
                      <button className="px-4 py-2 text-sm font-bold bg-green-500 text-white rounded-full hover:bg-green-700 transition-colors shadow-md cursor-pointer">
                        Find Crop As Buyer
                      </button>
                    </NavLink>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={toggleMenu} aria-label="Toggle menu" className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                   {isMenuOpen ? ( <X className="h-6 w-6 text-gray-900" /> ) : ( <Menu className="h-6 w-6 text-gray-900" /> )} 
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                  <div className="px-6 py-4 flex flex-col gap-4">  
                    <a href="#" onClick={toggleMenu}  className="text-sm font-medium hover:text-green-500 transition-colors py-2">Features</a>
                    <NavLink className="text-sm font-medium hover:text-green-500 transition-colors py-2" to="/Dashboard">Dashboard</NavLink>
                    <NavLink className="text-sm font-medium hover:text-green-500 transition-colors py-2" to="/MarketPlace">MarketPlace</NavLink>
                    <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                            <NavLink to="/SignUpPage">
                        <button className="px-4 py-2 text-sm font-bold bg-green-500 text-white rounded-full hover:bg-green-700 transition-colors shadow-md cursor-pointer">
                            Join as Farmer
                        </button>
                        </NavLink>
                        <NavLink to="/LoginPage">
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
}

export default Header;

import { useState, useEffect } from "react";
import { Menu, X, User, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";

import supabase from "../lib/supabase";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useNavigate()
  const location = useLocation(); // <-- Detects route changes

  const [authUser, setAuthUser] = useState(false)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const checkUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (!error && data?.user) {
      setAuthUser(true);
    } else {
      setAuthUser(false);
    }
  };
  useEffect(() => {
    checkUser();
  }, [location.pathname]); 


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-luxe-black/90 backdrop-blur-md border-b border-luxe-darkgray">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-luxe-yellow font-montserrat text-2xl font-bold flex items-center"
          >
            <img src="https://cnjvkaeaedsifidpbfmo.supabase.co/storage/v1/object/public/car-images//Screenshot_2025-06-12_092100-removebg-preview%20(1).png" alt="Logo" className="h-8 mr-2" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-luxe-white hover:text-luxe-yellow transition-colors">
              Home
            </Link>
            <Link to="/vehicles" className="text-luxe-white hover:text-luxe-yellow transition-colors">
              Vehicles
            </Link>
          
            <Link to="/about" className="text-luxe-white hover:text-luxe-yellow transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-luxe-white hover:text-luxe-yellow transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {
              !authUser ?
                <Button
                  variant="outline"
                  onClick={() => router('login')}
                  className="border-luxe-yellow text-luxe-yellow hover:bg-luxe-yellow hover:text-luxe-black"
                >
                  <User size={18} className="" />
                  Login
                </Button>
                :
                <Button
                  variant="outline"
                  onClick={() => router('profile')}
                  className="border-luxe-yellow text-luxe-yellow hover:bg-luxe-yellow hover:text-luxe-black"
                >
                  <User size={18} className="mr-2" />

                </Button>
            }

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-luxe-white hover:text-luxe-yellow"
            onClick={toggleMenu}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 top-[72px] bg-luxe-black/95 flex flex-col md:hidden transition-transform duration-300 ease-in-out z-40",
        menuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="container mx-auto px-4 py-8 flex flex-col space-y-6 bg-black">
          <Link
            to="/"
            className="text-luxe-white text-xl hover:text-luxe-yellow transition-colors"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/vehicles"
            className="text-luxe-white text-xl hover:text-luxe-yellow transition-colors"
            onClick={toggleMenu}
          >
            Vehicles
          </Link>
        
          <Link
            to="/about"
            className="text-luxe-white text-xl hover:text-luxe-yellow transition-colors"
            onClick={toggleMenu}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-luxe-white text-xl hover:text-luxe-yellow transition-colors"
            onClick={toggleMenu}
          >
            Contact
          </Link>
          <div className="pt-4 border-t border-luxe-darkgray flex flex-col space-y-4">
            {
              !authUser ?
                <Button
                  variant="outline"
                  onClick={() => router('login')}
                  className="border-luxe-yellow text-luxe-yellow hover:bg-luxe-yellow hover:text-luxe-black"
                >
                  <User size={18} className="mr-2" />
                  Login
                </Button>
                :
                <Button
                  variant="outline"
                  onClick={() => router('profile')}
                  className="border-luxe-yellow text-luxe-yellow hover:bg-luxe-yellow hover:text-luxe-black"
                >
                  <User size={18} className="" />
                </Button>
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Youtube, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-luxe-black border-t border-luxe-darkgray pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link 
              to="/" 
              className="text-luxe-yellow font-montserrat text-2xl font-bold flex items-center"
            >
              <span className="mr-1">CHELO</span>
              <span className="text-luxe-white">RIDE</span>
            </Link>
            <p className="mt-4 text-luxe-gray">
              Premium self drive cars in Vizag, Taxi booking services, and car rentals in Visakhapatnam. 
                From local rides to Vizag to Araku, beach car rental - we've got you covered!
            </p>
            
            <div className="flex mt-6 space-x-4">
              <a
              href="https://www.instagram.com/chelo_ride_vizag/"
              className="text-luxe-gray hover:text-luxe-yellow transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              >
              <Instagram size={20} />
              </a>
              <a
              href="https://www.youtube.com/@Dreamcarindiaa"
              className="text-luxe-gray hover:text-luxe-yellow transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              >
              <Youtube size={20} />
              </a>
              <a
              href="https://www.facebook.com/dreamcarsvizag/?ref=_xav_ig_profile_page_web#"
              className="text-luxe-gray hover:text-luxe-yellow transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              >
              <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-luxe-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-luxe-gray hover:text-luxe-yellow transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="text-luxe-gray hover:text-luxe-yellow transition-colors">
                  Vehicles
                </Link>
              </li>
            
              <li>
                <Link to="/about" className="text-luxe-gray hover:text-luxe-yellow transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-luxe-gray hover:text-luxe-yellow transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-luxe-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-luxe-yellow mr-2 mt-1 flex-shrink-0" />
                <span className="text-luxe-gray">102, botta nilayam, Lane No. S-3, Sampath Nagar, Srinivasa Nagar, Pothinamallayya Palem, Visakhapatnam, Andhra Pradesh 530041</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-luxe-yellow mr-2 flex-shrink-0" />
                <span className="text-luxe-gray">+91 8919617664</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-luxe-yellow mr-2 flex-shrink-0" />
                <span className="text-luxe-gray">dreamcarsvizag@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-luxe-darkgray mt-12 pt-6 text-luxe-gray text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} CHELORIDE. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacypolicy" className="hover:text-luxe-yellow transition-colors">
                Privacy Policy
              </Link>
              <Link to="/TermsandConditions" className="hover:text-luxe-yellow transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

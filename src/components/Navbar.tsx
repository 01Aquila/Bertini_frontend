
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="py-4 px-6 bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-startup-blue font-heading">Startup</span>
            <span className="font-heading text-lg text-startup-black">Conception 3.0</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-800 hover:text-startup-blue font-medium transition duration-300">
              Accueil
            </Link>
            <Link to="/products" className="text-gray-800 hover:text-startup-blue font-medium transition duration-300">
              Produits
            </Link>
            <Link to="/bertiny" className="text-gray-800 hover:text-startup-blue font-medium transition duration-300">
              Bertiny3.0
            </Link>
            <Link to="/about" className="text-gray-800 hover:text-startup-blue font-medium transition duration-300">
              À propos
            </Link>
            <Link to="/contact" className="text-gray-800 hover:text-startup-blue font-medium transition duration-300">
              Contact
            </Link>
            <Link to="/faq" className="text-gray-800 hover:text-startup-blue font-medium transition duration-300">
              FAQ
            </Link>
          </div>
          
          <div className="hidden md:block">
            <Button variant="default" asChild className="bg-startup-blue hover:bg-startup-blue/90">
              <Link to="/contact">
                Nous contacter
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden rounded-md p-2 text-gray-800 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="px-2 py-1 text-gray-800 hover:text-startup-blue font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/products" 
                className="px-2 py-1 text-gray-800 hover:text-startup-blue font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Produits
              </Link>
              <Link 
                to="/bertiny" 
                className="px-2 py-1 text-gray-800 hover:text-startup-blue font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Bertiny3.0
              </Link>
              <Link 
                to="/about" 
                className="px-2 py-1 text-gray-800 hover:text-startup-blue font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
              <Link 
                to="/contact" 
                className="px-2 py-1 text-gray-800 hover:text-startup-blue font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/faq" 
                className="px-2 py-1 text-gray-800 hover:text-startup-blue font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Button variant="default" asChild className="w-full bg-startup-blue hover:bg-startup-blue/90">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  Nous contacter
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

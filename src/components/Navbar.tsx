import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/products", label: "Produits" },
    { to: "/bertiny", label: "Bertiny3.0" },
    { to: "/about", label: "À propos" }
  ];

  const isActiveLink = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="py-4 px-6 bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-startup-blue font-heading">Conception</span>
            <span className="font-heading text-lg text-startup-black"> 3.0</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`font-medium transition duration-300 ${isActiveLink(to)
                    ? "text-startup-blue border-b-2 border-startup-blue"
                    : "text-gray-800 hover:text-startup-blue"
                  }`}
              >
                {label}
              </Link>
            ))}
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
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-2 py-1 font-medium ${isActiveLink(to)
                      ? "text-startup-blue border-b-2 border-startup-blue"
                      : "text-gray-800 hover:text-startup-blue"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
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
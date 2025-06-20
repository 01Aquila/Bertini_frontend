import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/products", label: "Produits" },
    { to: "/bertiny", label: "Bertiny3.0" },
    { to: "/réparateur3.0", label: "Réparateur3.0" },
    { to: "/about", label: "À propos" }
  ];

  const isActiveLink = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.nav 
      className={`py-4 px-6 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white shadow-md backdrop-blur-lg" 
          : "bg-white/80 backdrop-blur-md"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.span 
              className="text-2xl font-bold text-startup-blue font-heading"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              S. Conception
            </motion.span>
            <span className="font-heading text-lg text-startup-black relative">
              3.0
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-startup-blue group-hover:w-full transition-all duration-300"></span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`font-medium transition duration-300 relative py-1 ${
                  isActiveLink(to)
                    ? "text-startup-blue"
                    : "text-gray-800 hover:text-startup-blue"
                }`}
                aria-current={isActiveLink(to) ? "page" : undefined}
              >
                {label}
                {isActiveLink(to) && (
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-startup-blue"
                    layoutId="navbar-underline"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Button 
              variant="default" 
              asChild 
              className="bg-startup-blue hover:bg-startup-blue/90 font-medium px-6 py-2 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Link to="/contact">
                Nous contacter
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-full p-2 text-gray-800 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-startup-blue focus:ring-opacity-50"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden pt-4 pb-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="flex flex-col space-y-4 bg-white/95 rounded-lg p-4 shadow-lg"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
              >
                {navLinks.map(({ to, label }, index) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <Link
                      to={to}
                      className={`px-3 py-2 rounded-md font-medium block ${
                        isActiveLink(to)
                          ? "text-white bg-startup-blue"
                          : "text-gray-800 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={isActiveLink(to) ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + navLinks.length * 0.1 }}
                >
                  <Button 
                    variant="default" 
                    asChild 
                    className="w-full bg-startup-blue hover:bg-startup-blue/90 shadow-sm"
                  >
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                      Nous contacter
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
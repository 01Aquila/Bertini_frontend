import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, ArrowUp, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Wave SVG Background */}
      <div className="absolute top-0 left-0 w-full -translate-y-[98%]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="fill-startup-blue">
          <path fillOpacity="1" d="M0,192L48,176C96,160,192,128,288,117.3C384,107,480,117,576,144C672,171,768,213,864,202.7C960,192,1056,128,1152,106.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      {/* Newsletter Section */}
      <div className="bg-gradient-to-b from-startup-blue to-startup-blue-light pt-12 pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/20 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-startup-blue-light/10 rounded-full blur-3xl"></div>
            
            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 font-heading">
                  Restez connecté à nos innovations
                </h3>
                <p className="text-white/80 mb-0 max-w-md">
                  Abonnez-vous à notre newsletter pour recevoir nos dernières actualités et offres exclusives.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Votre email" 
                  className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Adresse email"
                />
                <Button className="bg-white text-startup-blue hover:bg-white/90 font-medium px-6 py-3 whitespace-nowrap">
                  S'inscrire
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="bg-startup-blue-light pt-16 pb-12 text-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-40 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-startup-blue/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Column 1 */}
            <div>
              <Link to="/" className="flex items-center space-x-2 mb-6 group">
                <motion.span 
                  className="text-2xl font-bold text-white font-heading"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  Startup
                </motion.span>
                <span className="font-heading text-lg text-white relative">
                  Conception 3.0
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
              <p className="text-sm text-white/90 max-w-xs mb-6 leading-relaxed">
                Une entreprise innovante dédiée à la promotion de l'autonomie des jeunes par l'innovation locale, le partage de la connaissance et la conscientisation.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition duration-300 group"
                >
                  <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a 
                  href="https://www.tiktok.com/@Bertini.tlcom.3.0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition duration-300 group"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    width="16" 
                    height="16" 
                    fill="currentColor" 
                    className="bi bi-tiktok group-hover:scale-110 transition-transform" 
                    viewBox="0 0 16 16"
                  >
                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"/>
                  </svg>
                </a>
                <a 
                  href="https://wa.me/237691200242" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition duration-300 group"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    fill="currentColor" 
                    className="bi bi-whatsapp group-hover:scale-110 transition-transform" 
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-lg font-bold mb-5 font-heading relative inline-block">
                Navigation
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-white/40"></span>
              </h3>
              <ul className="space-y-3">
                {[
                  { to: "/", label: "Accueil" },
                  { to: "/products", label: "Produits" },
                  { to: "/bertiny", label: "Bertiny3.0" },
                  { to: "/réparateur3.0", label: "Réparateur3.0" },
                  { to: "/about", label: "À propos" },
                  { to: "/contact", label: "Contact" }
                ].map((link, index) => (
                  <motion.li 
                    key={link.to}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link 
                      to={link.to} 
                      className="text-white/80 hover:text-white transition duration-300 flex items-center gap-1.5 group"
                    >
                      <span className="w-0 h-0.5 bg-white group-hover:w-3 transition-all duration-300"></span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-lg font-bold mb-5 font-heading relative inline-block">
                Contact
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-white/40"></span>
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 group">
                  <div className="mt-1 p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition duration-300">
                    <Phone className="w-4 h-4 text-white/90" />
                  </div>
                  <span className="text-white/90">+237 651 172 706</span>
                </li>
                <li className="flex items-start space-x-3 group">
                  <div className="mt-1 p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition duration-300">
                    <Mail className="w-4 h-4 text-white/90" />
                  </div>
                  <span className="text-white/90 break-all">startupconception3.0@gmail.com</span>
                </li>
                <li className="flex items-start space-x-3 group">
                  <div className="mt-1 p-2 bg-white/10 rounded-full group-hover:bg-white/20 transition duration-300">
                    <MapPin className="w-4 h-4 text-white/90" />
                  </div>
                  <span className="text-white/90">Yaoundé, Ekounou-Ekie-Concentré</span>
                </li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="text-lg font-bold mb-5 font-heading relative inline-block">
                Horaires d'ouverture
                <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-white/40"></span>
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-white/80">Lundi - Vendredi:</span>
                  <span className="text-white font-medium">8h - 18h</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/80">Samedi:</span>
                  <span className="text-white font-medium">9h - 16h</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/80">Dimanche:</span>
                  <span className="text-white font-medium">Fermé</span>
                </li>
              </ul>
              
              <div className="mt-6 bg-white/10 rounded-lg p-4 border border-white/20">
                <p className="text-sm text-white/90 mb-3">Besoin d'assistance?</p>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full bg-white/10 border-white/30 hover:bg-white hover:text-startup-blue transition-all"
                >
                  <Link to="/contact">
                    Contactez-nous
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/70 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Startup Conception 3.0. Tous droits réservés.
            </p>
            
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-sm text-white/70 hover:text-white transition-colors">Politique de confidentialité</Link>
              <Link to="/terms" className="text-sm text-white/70 hover:text-white transition-colors">Conditions d'utilisation</Link>
              <button
                onClick={scrollToTop}
                className="ml-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors group"
                aria-label="Retour en haut"
              >
                <ArrowUp className="h-5 w-5 group-hover:translate-y-[-2px] transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

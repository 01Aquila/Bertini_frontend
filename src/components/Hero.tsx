import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  imageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function Hero({ 
  title, 
  subtitle, 
  imageUrl = "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2620&auto=format&fit=crop",
  ctaText = "Découvrez nos services",
  ctaLink = "/products"
}: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-white min-h-[90vh] flex items-center">
      {/* Background Image with Overlay and Parallax Effect */}
      <motion.div
        className="absolute inset-0 z-0" 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-startup-blue/95 via-startup-blue/85 to-startup-blue-light/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_100%)]"></div>
      </motion.div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-[5%] w-72 h-72 bg-startup-blue-light/10 rounded-full blur-3xl"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="max-w-3xl">
            <motion.span 
              className="inline-block px-4 py-1.5 mb-6 text-white bg-white/10 backdrop-blur-md rounded-full text-sm font-medium border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Innovation & Excellence
            </motion.span>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-heading mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {title.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {subtitle}
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button 
                asChild 
                className="bg-white text-startup-blue hover:bg-white/90 text-lg px-8 py-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Link to={ctaLink} className="flex items-center">
                  {ctaText}
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                asChild 
                className="bg-transparent border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl"
              >
                <Link to="/about">
                  En savoir plus
                </Link>
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="hidden md:block relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
              <motion.div 
                className="relative z-10 aspect-video rounded-lg overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={imageUrl} 
                  alt="Innovation technologique" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <p className="font-bold text-lg">Découvrez notre vision</p>
                    <p className="text-sm text-white/80">Innovation locale pour l'autonomie des jeunes</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-startup-blue-light/30 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <span className="text-white/80 text-sm mb-2">Découvrir</span>
        <motion.div 
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <motion.div className="w-1.5 h-3 bg-white rounded-full"></motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

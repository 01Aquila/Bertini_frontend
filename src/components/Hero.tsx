
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
    <div className="relative overflow-hidden bg-white">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-startup-blue/90 to-startup-blue-light/80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-heading mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {title}
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button asChild className="bg-white text-startup-blue hover:bg-white/90 text-lg px-8 py-6">
              <Link to={ctaLink}>
                {ctaText}
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

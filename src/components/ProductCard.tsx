
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProductCardProps {
  name: string;
  price: string | number;
  description: string;
  imageUrl?: string;
  link?: string;
  index?: number;
}

export function ProductCard({
  name,
  price,
  description,
  imageUrl = "https://images.unsplash.com/photo-1586892478025-2b5472316991?q=80&w=1974&auto=format&fit=crop",
  link = "/contact",
  index = 0
}: ProductCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Image */}
      <div 
        className="h-48 w-full bg-gray-200 overflow-hidden"
      >
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 font-heading mb-2">{name}</h3>
        <p className="text-startup-blue font-semibold mb-3">{typeof price === 'number' ? `${price.toLocaleString()} FCFA` : price}</p>
        <p className="text-gray-600 mb-4 text-sm flex-1">{description}</p>
        <Button asChild className="bg-startup-blue hover:bg-startup-blue/90 w-full mt-auto">
          <Link to={link}>
            Commander
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

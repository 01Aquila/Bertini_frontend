import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

// Service item component for consistent styling
export interface ServiceItemProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  index: number;
  light?: boolean;
}

export const ServiceItem = ({ 
  icon: Icon, 
  title, 
  description, 
  index,
  light = false 
}: ServiceItemProps) => {
  return (
    <motion.div 
      className={`p-6 rounded-xl ${
        light 
          ? 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15' 
          : 'bg-white border border-gray-100 shadow-lg hover:shadow-xl'
      } transition-all duration-300 group relative overflow-hidden`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      {/* Background decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-startup-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-start gap-5 relative z-10">
        <div className={`flex-shrink-0 ${
          light 
            ? 'bg-white/20 text-white' 
            : 'bg-gradient-to-br from-startup-blue/20 to-startup-blue/10 text-startup-blue'
        } p-3.5 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-6 w-6" />
        </div>
        
        <div className="flex-grow">
          <h3 className={`text-lg font-bold ${
            light ? 'text-white' : 'text-gray-900'
          } mb-2 group-hover:translate-x-1 transition-transform duration-300`}>
            {title}
          </h3>
          
          {description && (
            <p className={`${
              light ? 'text-white/80' : 'text-gray-600'
            } text-sm leading-relaxed`}>
              {description}
            </p>
          )}
          
          {/* Hidden arrow that appears on hover */}
          <div className="mt-3 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className={`text-xs font-medium ${
              light ? 'text-white/90' : 'text-startup-blue'
            }`}>
              En savoir plus
            </span>
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 ml-1 ${light ? 'text-white/90' : 'text-startup-blue'}`}
              viewBox="0 0 20 20" 
              fill="currentColor"
              initial={{ x: -5 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <path 
                fillRule="evenodd" 
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </motion.svg>
          </div>
        </div>
      </div>
      
      {/* Decorative corner lines */}
      <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${
        light ? 'border-white/30' : 'border-startup-blue/30'
      } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${
        light ? 'border-white/30' : 'border-startup-blue/30'
      } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    </motion.div>
  );
};

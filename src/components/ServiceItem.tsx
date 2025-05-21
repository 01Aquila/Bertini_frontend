import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

// Service item component for consistent styling
export interface ServiceItemProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  index: number;
}

export const ServiceItem = ({ icon: Icon, title, description, index }: ServiceItemProps) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-start gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="bg-startup-blue/10 p-3 rounded-full">
        <Icon className="h-6 w-6 text-startup-blue" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        {description && <p className="text-gray-600 text-sm">{description}</p>}
      </div>
    </motion.div>
  );
};

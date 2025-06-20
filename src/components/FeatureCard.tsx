import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index?: number;
  variant?: 'default' | 'bordered' | 'minimal';
}

export function FeatureCard({ 
  title, 
  description, 
  icon: Icon, 
  index = 0,
  variant = 'default'
}: FeatureCardProps) {
  const variants = {
    default: "bg-white p-6 rounded-xl shadow-lg hover:shadow-xl border border-gray-100",
    bordered: "bg-transparent p-6 rounded-xl border-2 border-startup-blue/20 hover:border-startup-blue/50",
    minimal: "bg-white/50 backdrop-blur-sm p-6 rounded-xl hover:bg-white/80"
  };

  const iconVariants = {
    default: "w-14 h-14 bg-gradient-to-tr from-startup-blue to-startup-blue-light rounded-xl flex items-center justify-center mb-5 shadow-md",
    bordered: "w-14 h-14 bg-startup-blue/10 rounded-xl flex items-center justify-center mb-5 border border-startup-blue/30",
    minimal: "w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-5 shadow-sm"
  };

  return (
    <motion.div
      className={`${variants[variant]} transition-all duration-300 group`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5 }}
    >
      <div className={iconVariants[variant]}>
        <Icon className={`w-7 h-7 text-startup-blue group-hover:scale-110 transition-transform duration-300`} />
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-startup-blue transition-colors duration-300">{title}</h3>
      
      <p className="text-gray-600">{description}</p>
      
      {/* Arrow indicator for hover */}
      <div className="mt-4 flex justify-end">
        <motion.div 
          className="w-6 h-6 rounded-full border-2 border-startup-blue/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
          whileHover={{ scale: 1.2, backgroundColor: "rgba(15, 76, 129, 0.1)" }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-startup-blue"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </motion.div>
      </div>

      {/* Decorative element */}
      <div className="absolute -z-10 top-0 right-0 w-full h-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-startup-blue/5 rounded-full blur-xl"></div>
      </div>
    </motion.div>
  );
}

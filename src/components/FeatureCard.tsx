
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index?: number;
}

export function FeatureCard({ title, description, icon: Icon, index = 0 }: FeatureCardProps) {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="w-12 h-12 bg-startup-blue/10 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-startup-blue" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

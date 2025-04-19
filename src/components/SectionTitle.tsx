
import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionTitle({ title, subtitle, center = false }: SectionTitleProps) {
  return (
    <div className={`mb-12 max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-gray-900 font-heading mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          className="text-xl text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

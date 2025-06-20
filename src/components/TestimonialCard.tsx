import { motion } from "framer-motion";
import { QuoteIcon } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  testimonial: string;
  avatar?: string;
  index?: number;
  rating?: number;
  position?: string;
}

export function TestimonialCard({ 
  name, 
  testimonial, 
  avatar, 
  index = 0, 
  rating = 5,
  position
}: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 relative h-full flex flex-col hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5 }}
    >
      {/* Quotation mark */}
      <div className="absolute -top-3 -left-3 bg-startup-blue w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg">
        <QuoteIcon className="h-5 w-5" />
      </div>
      
      {/* Decorative element */}
      <div className="absolute top-6 right-6">
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-15">
          <path d="M23 0L28.5317 17.4683L46 23L28.5317 28.5317L23 46L17.4683 28.5317L0 23L17.4683 17.4683L23 0Z" fill="currentColor"/>
        </svg>
      </div>
      
      {/* Testimonial text */}
      <div className="mb-6 flex-grow">
        <motion.p 
          className="text-gray-700 leading-relaxed italic relative text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
          viewport={{ once: true }}
        >
          "{testimonial}"
        </motion.p>
      </div>
      
      {/* Rating stars */}
      <motion.div 
        className="mb-5 flex text-yellow-400"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
        viewport={{ once: true }}
      >
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </motion.div>
      
      {/* Author info */}
      <motion.div 
        className="flex items-center mt-auto pt-4 border-t border-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="w-12 h-12 bg-gradient-to-tr from-startup-blue to-startup-blue-light rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-lg mr-4 border-2 border-white shadow-md">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          ) : (
            name.charAt(0).toUpperCase() + (name.split(' ')[1] ? name.split(' ')[1].charAt(0).toUpperCase() : '')
          )}
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{name}</h3>
          {position && <p className="text-sm text-gray-500">{position}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
}


import { motion } from "framer-motion";

interface TestimonialCardProps {
  name: string;
  testimonial: string;
  avatar?: string;
  index?: number;
}

export function TestimonialCard({ name, testimonial, avatar, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-startup-blue rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-lg mr-4">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          ) : (
            name.charAt(0)
          )}
        </div>
        <h3 className="font-semibold">{name}</h3>
      </div>
      <p className="text-gray-600 italic">{testimonial}</p>
      <div className="mt-4 flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </motion.div>
  );
}

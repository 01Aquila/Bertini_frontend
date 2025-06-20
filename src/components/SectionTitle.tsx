import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
  withLine?: boolean;
}

export function SectionTitle({ 
  title, 
  subtitle, 
  center = false,
  light = false,
  withLine = true
}: SectionTitleProps) {
  // Split the title into words for animated reveal
  const titleWords = title.split(' ');
  
  return (
    <div className={`mb-12 ${center ? 'mx-auto text-center' : ''} ${light ? 'text-white' : ''} relative`}>
      <motion.div 
        className="mb-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <span className={`inline-block text-sm font-semibold uppercase tracking-wider mb-2 ${
          light ? 'text-white/80' : 'text-startup-blue'
        }`}>
          {center ? "— Notre vision —" : "— Innovation"}
        </span>
      </motion.div>
      
      <motion.h2 
        className={`text-3xl md:text-4xl font-bold font-heading mb-4 leading-tight ${
          light ? 'text-white' : 'text-gray-900'
        } relative inline-block`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        {titleWords.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {word}
          </motion.span>
        ))}
        {withLine && (
          <motion.span 
            className={`absolute -bottom-2 left-0 h-1 rounded-full ${light ? 'bg-white' : 'bg-startup-blue'} ${center ? 'left-1/2 transform -translate-x-1/2' : ''}`}
            initial={{ width: 0 }}
            whileInView={{ width: center ? '60px' : '120px' }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
          />
        )}
      </motion.h2>
      
      {subtitle && (
        <motion.p 
          className={`text-xl ${light ? 'text-white/90' : 'text-gray-600'} max-w-2xl ${center ? 'mx-auto' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {subtitle}
        </motion.p>
      )}
      
      {/* Decorative elements */}
      {center && (
        <div className="absolute -z-10 opacity-10">
          <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full border-2 border-dashed border-gray-400 animate-spin-slow" style={{ animationDuration: '15s' }}></div>
          <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-startup-blue"></div>
        </div>
      )}
    </div>
  );
}

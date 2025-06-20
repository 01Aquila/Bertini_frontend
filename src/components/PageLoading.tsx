import { motion } from 'framer-motion';

interface PageLoadingProps {
  message?: string;
  variant?: 'default' | 'minimal' | 'logo';
}

const PageLoading = ({ 
  message = "Chargement de la page...", 
  variant = 'default'
}: PageLoadingProps) => {
  // Variants for the dots animation
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Variants for each dot
  const loadingCircleVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  };

  // Transition for the dots
  const loadingCircleTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut",
  };

  // Logo animation variant
  const logoVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  };

  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center p-8">
        <motion.div 
          className="flex space-x-2"
          variants={loadingContainerVariants}
          initial="start"
          animate="end"
        >
          <motion.span
            className="h-3 w-3 bg-startup-blue rounded-full"
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
          <motion.span
            className="h-3 w-3 bg-startup-blue rounded-full"
            variants={loadingCircleVariants}
            transition={{
              ...loadingCircleTransition,
              delay: 0.2,
            }}
          />
          <motion.span
            className="h-3 w-3 bg-startup-blue rounded-full"
            variants={loadingCircleVariants}
            transition={{
              ...loadingCircleTransition,
              delay: 0.4,
            }}
          />
        </motion.div>
        <p className="ml-3 text-gray-600 text-sm">{message}</p>
      </div>
    );
  }

  if (variant === 'logo') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center"
        >
          <motion.div 
            className="flex items-center space-x-2 mb-6"
            variants={logoVariants}
            animate="animate"
          >
            <span className="text-3xl font-bold text-startup-blue font-heading">S. Conception</span>
            <span className="font-heading text-xl text-startup-black">3.0</span>
          </motion.div>
          <div className="relative w-16 h-16">
            <motion.div 
              className="absolute inset-0 rounded-full border-t-4 border-startup-blue"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-0 rounded-full border-r-4 border-startup-blue/30"
              animate={{ rotate: -180 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <p className="mt-6 text-gray-600 text-lg">{message}</p>
        </motion.div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-50">
      <motion.div 
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative">
          {/* Outer ring */}
          <motion.div 
            className="h-24 w-24 rounded-full border-4 border-gray-200 border-t-startup-blue border-b-startup-blue-light"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner ring */}
          <motion.div 
            className="absolute top-2 left-2 right-2 bottom-2 border-4 border-gray-100 border-r-startup-blue-light border-l-startup-blue rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Center dot */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 bg-startup-blue rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        
        <motion.p 
          className="mt-8 text-gray-700 text-lg font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {message}
        </motion.p>
        
        {/* Loading progress dots */}
        <motion.div 
          className="flex space-x-2 mt-4"
          variants={loadingContainerVariants}
          initial="start"
          animate="end"
        >
          <motion.span
            className="h-2 w-2 bg-startup-blue rounded-full"
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
          <motion.span
            className="h-2 w-2 bg-startup-blue rounded-full"
            variants={loadingCircleVariants}
            transition={{
              ...loadingCircleTransition,
              delay: 0.2,
            }}
          />
          <motion.span
            className="h-2 w-2 bg-startup-blue rounded-full"
            variants={loadingCircleVariants}
            transition={{
              ...loadingCircleTransition,
              delay: 0.4,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PageLoading; 
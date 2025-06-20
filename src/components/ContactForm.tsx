import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";

interface ContactFormProps {
  submitButtonText?: string;
  successMessage?: string;
  light?: boolean;
  rounded?: boolean;
}

export function ContactForm({ 
  submitButtonText = "Envoyer le message", 
  successMessage = "Nous vous contacterons bientôt.",
  light = false,
  rounded = false
}: ContactFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
  };

  // Validation logic
  const validate = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name) errors.name = "Le nom est requis";
    
    if (!formData.email) {
      errors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Format d'email invalide";
    }
    
    if (!formData.phone) {
      errors.phone = "Le téléphone est requis";
    } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      errors.phone = "Format de téléphone invalide";
    }
    
    if (!formData.message) errors.message = "Le message est requis";
    
    return errors;
  };

  const errors = validate();
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched for validation
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true
    });
    
    if (!isValid) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message envoyé!",
        description: successMessage,
        className: "bg-green-50 border-green-200",
      });
      setIsSubmitted(true);
      
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
        setTouched({
          name: false,
          email: false,
          phone: false,
          message: false
        });
        setIsSubmitting(false);
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  const inputLabelClass = light 
    ? "text-white/90 font-medium" 
    : "text-gray-700 font-medium";
  
  const inputClass = `${light 
    ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-white/30" 
    : "bg-white focus:ring-startup-blue/30"} ${rounded ? "rounded-xl" : ""}`;

  return (
    <AnimatePresence>
      {isSubmitted ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={`text-center p-8 ${light ? "bg-white/10" : "bg-green-50"} rounded-2xl border ${light ? "border-white/20" : "border-green-100"} flex flex-col items-center`}
        >
          <div className={`w-16 h-16 rounded-full ${light ? "bg-white/20" : "bg-green-100"} flex items-center justify-center mb-4`}>
            <CheckCircle className={`h-8 w-8 ${light ? "text-white" : "text-green-500"}`} />
          </div>
          <h3 className={`text-xl font-bold mb-2 ${light ? "text-white" : "text-green-800"}`}>Merci pour votre message!</h3>
          <p className={`${light ? "text-white/80" : "text-green-600"}`}>{successMessage}</p>
        </motion.div>
      ) : (
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div custom={0} variants={formItemVariants}>
            <label htmlFor="name" className={`block text-sm ${inputLabelClass} mb-1.5`}>
              Nom complet
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className={`h-5 w-5 ${light ? "text-white/50" : "text-gray-400"}`} />
              </div>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Votre nom"
                required
                className={`${inputClass} pl-10 w-full`}
                aria-invalid={touched.name && errors.name ? "true" : "false"}
              />
              {touched.name && errors.name && (
                <p className={`mt-1 text-xs ${light ? "text-red-300" : "text-red-500"} flex items-center`}>
                  <AlertCircle className="h-3 w-3 mr-1" /> {errors.name}
                </p>
              )}
            </div>
          </motion.div>
          
          <motion.div custom={1} variants={formItemVariants}>
            <label htmlFor="email" className={`block text-sm ${inputLabelClass} mb-1.5`}>
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className={`h-5 w-5 ${light ? "text-white/50" : "text-gray-400"}`} />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="votre-email@exemple.com"
                required
                className={`${inputClass} pl-10 w-full`}
                aria-invalid={touched.email && errors.email ? "true" : "false"}
              />
              {touched.email && errors.email && (
                <p className={`mt-1 text-xs ${light ? "text-red-300" : "text-red-500"} flex items-center`}>
                  <AlertCircle className="h-3 w-3 mr-1" /> {errors.email}
                </p>
              )}
            </div>
          </motion.div>
          
          <motion.div custom={2} variants={formItemVariants}>
            <label htmlFor="phone" className={`block text-sm ${inputLabelClass} mb-1.5`}>
              Téléphone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className={`h-5 w-5 ${light ? "text-white/50" : "text-gray-400"}`} />
              </div>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+237 6XX XXX XXX"
                required
                className={`${inputClass} pl-10 w-full`}
                aria-invalid={touched.phone && errors.phone ? "true" : "false"}
              />
              {touched.phone && errors.phone && (
                <p className={`mt-1 text-xs ${light ? "text-red-300" : "text-red-500"} flex items-center`}>
                  <AlertCircle className="h-3 w-3 mr-1" /> {errors.phone}
                </p>
              )}
            </div>
          </motion.div>
          
          <motion.div custom={3} variants={formItemVariants}>
            <label htmlFor="message" className={`block text-sm ${inputLabelClass} mb-1.5`}>
              Message
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <MessageSquare className={`h-5 w-5 ${light ? "text-white/50" : "text-gray-400"}`} />
              </div>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Comment pouvons-nous vous aider?"
                required
                className={`${inputClass} pl-10 w-full`}
                rows={5}
                aria-invalid={touched.message && errors.message ? "true" : "false"}
              />
              {touched.message && errors.message && (
                <p className={`mt-1 text-xs ${light ? "text-red-300" : "text-red-500"} flex items-center`}>
                  <AlertCircle className="h-3 w-3 mr-1" /> {errors.message}
                </p>
              )}
            </div>
          </motion.div>
          
          <motion.div custom={4} variants={formItemVariants}>
            <Button 
              type="submit" 
              className={`w-full ${rounded ? "rounded-xl" : ""} ${
                light 
                  ? "bg-white text-startup-blue hover:bg-white/90" 
                  : "bg-startup-blue hover:bg-startup-blue/90 text-white"
              } font-medium py-6 mt-2 relative overflow-hidden group`}
              disabled={isSubmitting}
            >
              <span className="relative z-10">
                {isSubmitting ? "Envoi en cours..." : submitButtonText}
              </span>
              {!isSubmitting && (
                <span className="absolute inset-0 h-full w-full bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              )}
              {isSubmitting && (
                <svg className="animate-spin ml-2 h-4 w-4 text-current inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
            </Button>
          </motion.div>
          
          <motion.p 
            custom={5} 
            variants={formItemVariants} 
            className={`text-xs text-center ${light ? "text-white/60" : "text-gray-500"} mt-4`}
          >
            * Nous respectons votre vie privée et ne partagerons jamais vos informations.
          </motion.p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

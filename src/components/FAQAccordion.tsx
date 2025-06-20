import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  light?: boolean;
}

export function FAQAccordion({ faqs, light = false }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <AccordionItem 
            value={`item-${index}`}
            className={`mb-4 rounded-lg overflow-hidden ${
              light 
                ? 'bg-white/10 border-white/20' 
                : 'bg-white shadow-md hover:shadow-lg border border-gray-100'
            } transition-all duration-300`}
          >
            <AccordionTrigger 
              className={`text-lg py-5 px-6 font-medium ${
                light 
                  ? 'text-white hover:text-white/80' 
                  : 'text-gray-900 hover:text-startup-blue'
              } group flex items-center`}
            >
              <span className="flex-grow text-left">{faq.question}</span>
              <div className={`h-6 w-6 rounded-full flex items-center justify-center transition-colors ${
                light ? 'bg-white/20 group-hover:bg-white/30' : 'bg-startup-blue/10 group-hover:bg-startup-blue/20'
              }`}>
                <ChevronIcon light={light} />
              </div>
            </AccordionTrigger>
            
            <AccordionContent 
              className={`px-6 pb-5 ${
                light ? 'text-white/90' : 'text-gray-600'
              } leading-relaxed`}
            >
              <div className="pl-4 border-l-2 border-startup-blue/30">
                {faq.answer}
              </div>
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      ))}
    </Accordion>
  );
}

// Custom chevron icon component with animation
const ChevronIcon = ({ light = false }) => (
  <svg 
    width="12" 
    height="12" 
    viewBox="0 0 12 12" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`transform transition-transform duration-300 group-data-[state=open]:rotate-180 ${
      light ? 'text-white' : 'text-startup-blue'
    }`}
  >
    <path 
      d="M2.5 4.5L6 8L9.5 4.5" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
  </svg>
);

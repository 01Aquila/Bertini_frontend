
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem value={`item-${index}`} key={index} className="border-b border-gray-200">
          <AccordionTrigger className="text-lg py-4 font-medium text-gray-900 hover:text-startup-blue">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 py-4">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wrench, SmartphoneCharging, Unlock, Monitor, Zap, Tv, Package, Lightbulb } from "lucide-react";
import { ServiceItem } from "@/components/ServiceItem";
import type { LucideIcon } from "lucide-react";

// Interface for service items
interface ServiceItemData {
  icon: LucideIcon;
  title: string;
  description: string;
}

const Réparateur = () => {
  // Define services array for easy mapping
  const services: ServiceItemData[] = [
    {
      icon: SmartphoneCharging,
      title: "Réparation de téléphones Android",
      description: "Service complet de réparation pour tous modèles de téléphones Android."
    },
    {
      icon: SmartphoneCharging,
      title: "Réparation d'iPhone",
      description: "Expertise spécialisée pour la réparation de tous les modèles d'iPhone."
    },
    {
      icon: Unlock,
      title: "Déblocage et désimblocage",
      description: "Services de déblocage et désimblocage pour tout type de téléphone portable."
    },
    {
      icon: Monitor,
      title: "Maintenance informatique",
      description: "Entretien et réparation d'ordinateurs, installation de logiciels et plus."
    },
    {
      icon: Zap,
      title: "Électricité bâtiment",
      description: "Installation et dépannage électrique pour résidences et entreprises."
    },
    {
      icon: Tv,
      title: "Réparation d'écrans plasma",
      description: "Service spécialisé dans la réparation d'écrans plasma et LCD."
    },
    {
      icon: Package,
      title: "Vente d'accessoires téléphoniques",
      description: "Large gamme d'accessoires de qualité pour tous types de téléphones."
    },
    {
      icon: Lightbulb,
      title: "Réparation d'appareils électroménagers",
      description: "Réparation et maintenance d'appareils électroménagers divers."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <Hero 
        title="Réparateur 3.0"
        subtitle="Service de réparation professionnel par Bertini Télécom 3.0"
        imageUrl="https://images.unsplash.com/photo-1581092921461-d3217bc8b0b2?q=80&w=2940&auto=format&fit=crop"
        ctaText="Nous contacter"
        ctaLink="/contact"
      />

      {/* Introduction Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=2874&auto=format&fit=crop" 
              alt="Réparateur 3.0 en action"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <div>
            <SectionTitle 
              title="Notre expertise à votre service"
              subtitle="Solutions de réparation complètes"
            />
            
            <motion.p 
              className="text-gray-600 mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Le Réparateur 3.0, section de Bertini Télécom 3.0, offre une gamme complète de services de réparation et de maintenance. Notre équipe d'experts techniques est déterminée à fournir des services de haute qualité pour répondre à tous vos besoins, des téléphones portables aux appareils électroménagers.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button asChild className="bg-startup-blue hover:bg-startup-blue/90">
                <Link to="/contact">
                  Demander un devis
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-startup-blue/5 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Nos services de réparation"
            subtitle="Expertise technique pour tous vos appareils"
            center
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
            {services.map((service, index) => (
              <ServiceItem 
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <SectionTitle 
          title="Pourquoi nous choisir"
          subtitle="Un service de qualité supérieure"
          center
        />
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-md text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-startup-blue/10 p-4 rounded-full mx-auto mb-6 w-20 h-20 flex items-center justify-center">
              <Wrench className="h-10 w-10 text-startup-blue" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Expertise technique</h3>
            <p className="text-gray-600">
              Notre équipe de techniciens qualifiés possède des années d'expérience dans la réparation et la maintenance d'appareils électroniques.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-md text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="bg-startup-blue/10 p-4 rounded-full mx-auto mb-6 w-20 h-20 flex items-center justify-center">
              <Monitor className="h-10 w-10 text-startup-blue" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Équipement moderne</h3>
            <p className="text-gray-600">
              Nous utilisons les outils et équipements les plus récents pour garantir des réparations de haute qualité et durables pour tous vos appareils.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-md text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-startup-blue/10 p-4 rounded-full mx-auto mb-6 w-20 h-20 flex items-center justify-center">
              <Package className="h-10 w-10 text-startup-blue" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Service rapide</h3>
            <p className="text-gray-600">
              Nous comprenons l'importance de vos appareils dans votre vie quotidienne, c'est pourquoi nous nous efforçons d'offrir un service rapide et efficace.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-startup-blue to-startup-blue-light text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-heading mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Besoin d'une réparation?
          </motion.h2>
          <motion.p 
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Contactez Réparateur 3.0 dès aujourd'hui pour faire réparer vos appareils par des experts.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button asChild className="bg-white text-startup-blue hover:bg-white/90 text-lg px-8 py-6">
              <Link to="/contact">
                Contactez-nous
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Réparateur;
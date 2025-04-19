
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <Hero 
        title="À propos de Startup Conception 3.0"
        subtitle="Notre histoire, notre mission et nos valeurs"
        imageUrl="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2940&auto=format&fit=crop"
      />

      {/* History Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <SectionTitle 
          title="Notre histoire" 
          subtitle="Depuis nos débuts en 2019"
        />
        
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-4">
            Créée en avril 2019, Startup Conception 3.0 est née de la volonté de promouvoir l'innovation locale et de donner aux jeunes les outils nécessaires pour être autonomes dans un monde en constante évolution.
          </p>
          <p className="text-gray-600">
            Notre parcours a commencé avec une simple idée: créer des solutions innovantes adaptées aux besoins locaux tout en partageant nos connaissances et notre savoir-faire avec la jeunesse camerounaise.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-startup-blue/5 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Notre mission" 
            subtitle="Ce qui nous guide au quotidien"
            center
          />
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Production locale</h3>
              <p className="text-gray-600">
                Nous concevons et développons des solutions adaptées au marché local, en répondant aux besoins spécifiques de notre communauté.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Partage de la connaissance</h3>
              <p className="text-gray-600">
                Nous croyons fermement que la connaissance doit être accessible à tous et nous nous engageons à partager notre expertise avec les jeunes.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Conscientisation</h3>
              <p className="text-gray-600">
                Nous travaillons à sensibiliser les jeunes sur l'importance de l'innovation, de l'entrepreneuriat et de l'autonomie dans le monde moderne.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <SectionTitle 
          title="Nos valeurs" 
          subtitle="Ce en quoi nous croyons"
          center
        />
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation</h3>
            <p className="text-gray-600">
              Nous cherchons constamment à repousser les limites et à trouver des solutions créatives aux défis quotidiens.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Qualité</h3>
            <p className="text-gray-600">
              Nous nous engageons à fournir des produits et services de la plus haute qualité, sans compromis.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Unité et paix</h3>
            <p className="text-gray-600">
              Nous croyons que la collaboration et la compréhension mutuelle sont essentielles pour bâtir un avenir meilleur.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Service client</h3>
            <p className="text-gray-600">
              La satisfaction de nos clients est notre priorité absolue, et nous nous efforçons toujours d'aller au-delà de leurs attentes.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;


import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

// Define interface for Bertiny page data
interface BertinyPageData {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  price?: string;
  images?: {
    id: string;
    image: {
      id: string;
      url: string;
      alt?: string;
      thumbnailURL?: string | null;
    };
  }[];
  features?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// Define fallback data to use if API fails
const fallbackData: BertinyPageData = {
  id: "fallback",
  title: "Machine automatique de distribution de boissons",
  subtitle: "Une solution innovante pour vos besoins de rafraîchissement",
  description: "Bertiny3.0 est une machine automatique de distribution de boissons fonctionnant avec des pièces de monnaie. Elle offre une distribution rapide, hygiénique et autonome de vos boissons préférées.",
  price: "200 000 FCFA - 250 000 FCFA",
  images: [
    {
      id: "img1",
      image: {
        url: "/api/media/file/event1.png",
        alt: "Bertiny3.0 Machine",
        id: "img1-id"
      }
    }
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const Bertiny = () => {
  // State for loading, data, and error handling
  const [loading, setLoading] = useState(true);
  const [bertinyData, setBertinyData] = useState<BertinyPageData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch Bertiny page data
  useEffect(() => {
    const fetchBertinyData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("https://bertini-backend.vercel.app/api/bertini-page", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = response.data;
        console.log("Bertiny data:", data);

        if (data?.docs && Array.isArray(data.docs) && data.docs.length > 0) {
          setBertinyData(data.docs[0]);
        } else {
          console.error("Invalid bertini-page data format", data);
          setBertinyData(fallbackData);
          setError("Impossible de charger les données de Bertiny");
        }
      } catch (error) {
        console.error("Error fetching bertini-page data:", error);
        setBertinyData(fallbackData);
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    fetchBertinyData();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <Hero
        title="Bertiny3.0"
        subtitle={bertinyData?.subtitle || "La fraîcheur à portée de main"}
        imageUrl="https://images.unsplash.com/photo-1527490087278-9c75be0b8052?q=80&w=2946&auto=format&fit=crop"
        ctaText="Nous contacter"
        ctaLink="/contact"
      />

      {/* Product Description */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        {/* {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8 text-center">
            {error}
          </div>
        )} */}

        {loading ? (
          // Loading state with skeleton UI
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden shadow-xl bg-gray-200 animate-pulse h-64 md:h-80"></div>

            <div>
              <div className="h-10 bg-gray-200 rounded w-4/5 mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-3/5 mb-8 animate-pulse"></div>

              <div className="h-24 bg-gray-200 rounded w-full mb-8 animate-pulse"></div>

              <div className="mb-8">
                <div className="h-5 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-2/5 animate-pulse"></div>
              </div>

              <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-xl"
            >
              <img
                src={bertinyData?.images?.[0]?.image?.url
                  ? `https://bertini-backend.vercel.app${bertinyData.images[0].image.url}`
                  : "https://images.unsplash.com/photo-1592547097938-7942b22df3db?q=80&w=2816&auto=format&fit=crop"}
                alt={bertinyData?.images?.[0]?.image?.alt || "Bertiny3.0 Machine"}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div>
              <SectionTitle
                title={bertinyData?.title || "Machine automatique de distribution de boissons"}
                subtitle={bertinyData?.subtitle || "Une solution innovante pour vos besoins de rafraîchissement"}
              />

              <motion.p
                className="text-gray-600 mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {bertinyData?.description || "Bertiny3.0 est une machine automatique de distribution de boissons fonctionnant avec des pièces de monnaie. Elle offre une distribution rapide, hygiénique et autonome de vos boissons préférées."}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <p className="font-semibold mb-2 text-startup-blue">Prix estimé:</p>
                <p className="text-2xl font-bold text-gray-900">{bertinyData?.price || "200 000 FCFA - 250 000 FCFA"}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
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
        )}
      </section>

      {/* Features */}
      <section className="py-16 bg-startup-blue/5 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Fonctionnalités clés"
            subtitle="Ce qui rend Bertiny3.0 unique"
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
              <h3 className="text-xl font-bold mb-4 text-gray-900">Acceptation de pièces</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-startup-blue" />
                  <span>Pièces de 50 FCFA</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-startup-blue" />
                  <span>Pièces de 100 FCFA</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-startup-blue" />
                  <span>Pièces de 200 FCFA</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-startup-blue" />
                  <span>Pièces de 500 FCFA</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">Avantages</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-startup-blue" />
                  <span>Pratique et accessible</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-startup-blue" />
                  <span>Distribution rapide</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-startup-blue" />
                  <span>Système hygiénique</span>
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5 text-startup-blue" />
                  <span>Fonctionnement autonome</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <SectionTitle
          title="Caractéristiques techniques"
          subtitle="Conçue pour répondre à tous vos besoins"
          center
        />

        <div className="mt-12 bg-white shadow-md rounded-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <motion.div
              className="p-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">Dimensions</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Hauteur: 1m à 1,70m</li>
                <li>Largeur: 30-60 cm</li>
                <li>Profondeur: 30-60 cm</li>
              </ul>
            </motion.div>

            <motion.div
              className="p-6 border-t md:border-t-0 md:border-l border-gray-200"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">Capacité</h3>
              <ul className="space-y-2 text-gray-600">
                <li>10 à 100 litres selon les commandes</li>
                <li>Distribution adaptable selon les besoins</li>
                <li>Système de réfrigération intégré</li>
              </ul>
            </motion.div>
          </div>
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
            Intéressé par Bertiny3.0?
          </motion.h2>
          <motion.p
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Contactez-nous dès aujourd'hui pour en savoir plus ou pour commander votre machine.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button asChild className="bg-white text-startup-blue hover:bg-white/90 text-lg px-8 py-6">
              <Link to="/contact">
                Nous contacter
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Bertiny;

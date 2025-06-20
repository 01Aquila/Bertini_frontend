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
import { useBertinyPage } from "@/hooks/useGlobal";
import PageLoading from "@/components/PageLoading";

// Define interface for Bertiny page data from Collection
interface BertinyPageCollection {
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

// Define interface for Bertiny page global data
interface BertinyGlobalData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: { url: string };
  productTitle: string;
  productDescription: string;
  productImage: { url: string };
  featuresTitle: string;
  featuresSubtitle: string;
  features: {
    featureTitle: string;
    featureDescription: string;
    featureIcon: string;
  }[];
  specsTitle: string;
  specsSubtitle: string;
  specifications: {
    specName: string;
    specValue: string;
  }[];
  pricingTitle: string;
  price: string;
  priceDescription: string;
  buyButtonText: string;
  faqTitle: string;
  faqSubtitle: string;
  faqItems: {
    question: string;
    answer: string;
  }[];
}

// Define fallback data to use if API fails
const fallbackData: BertinyPageCollection = {
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
  // State for loading, data, and error handling for Collection data
  const [loading, setLoading] = useState(true);
  const [bertinyData, setBertinyData] = useState<BertinyPageCollection | null>(null);
  const [error, setError] = useState<string | null>(null);

  // State for Global data
  const { data: globalData, loading: globalLoading } = useBertinyPage();
  const [bertinyGlobalData, setBertinyGlobalData] = useState<BertinyGlobalData | null>(null);

  // Fetch Bertiny page collection data
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

  // Set global data when loaded
  useEffect(() => {
    if (globalData) {
      setBertinyGlobalData(globalData);
    }
  }, [globalData]);

  if (loading || globalLoading) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <Hero
        title={bertinyGlobalData?.heroTitle || "Bertiny3.0"}
        subtitle={bertinyGlobalData?.heroSubtitle || bertinyData?.subtitle || "La fraîcheur à portée de main"}
        imageUrl={bertinyGlobalData?.heroImage?.url || "https://images.unsplash.com/photo-1527490087278-9c75be0b8052?q=80&w=2946&auto=format&fit=crop"}
        ctaText="Nous contacter"
        ctaLink="/contact"
      />

      {/* Product Description */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8 text-center">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-xl"
          >
            <img
              src={
                bertinyGlobalData?.productImage?.url ||
                (bertinyData?.images?.[0]?.image?.url
                  ? `https://bertini-backend.vercel.app${bertinyData.images[0].image.url}`
                  : "https://images.unsplash.com/photo-1592547097938-7942b22df3db?q=80&w=2816&auto=format&fit=crop")
              }
              alt={bertinyGlobalData?.productTitle || bertinyData?.title || "Bertiny3.0 Machine"}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div>
            <SectionTitle
              title={bertinyGlobalData?.productTitle || bertinyData?.title || "Machine automatique de distribution de boissons"}
              subtitle={bertinyGlobalData?.heroSubtitle || bertinyData?.subtitle || "Une solution innovante pour vos besoins de rafraîchissement"}
            />

            <motion.p
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {bertinyGlobalData?.productDescription || bertinyData?.description || "Bertiny3.0 est une machine automatique de distribution de boissons fonctionnant avec des pièces de monnaie. Elle offre une distribution rapide, hygiénique et autonome de vos boissons préférées."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="font-semibold mb-2 text-startup-blue">Prix estimé:</p>
              <p className="text-2xl font-bold text-gray-900">{bertinyGlobalData?.price || bertinyData?.price || "200 000 FCFA - 250 000 FCFA"}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button asChild className="bg-startup-blue hover:bg-startup-blue/90">
                <Link to="/contact">
                  {bertinyGlobalData?.buyButtonText || "Demander un devis"}
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-startup-blue/5 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title={bertinyGlobalData?.featuresTitle || "Fonctionnalités clés"}
            subtitle={bertinyGlobalData?.featuresSubtitle || "Ce qui rend Bertiny3.0 unique"}
            center
          />

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {bertinyGlobalData?.features ? (
              // Use features from global data if available
              bertinyGlobalData.features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-startup-blue/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Check className="text-startup-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.featureTitle}</h3>
                  <p className="text-gray-600">{feature.featureDescription}</p>
                </motion.div>
              ))
            ) : (
              // Default features
              <>
                <motion.div
                  className="bg-white p-6 rounded-xl shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-startup-blue/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Check className="text-startup-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Paiement par pièces</h3>
                  <p className="text-gray-600">Accepte les pièces de monnaie standard pour faciliter l'achat de boissons sans surveillance.</p>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-xl shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-startup-blue/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Check className="text-startup-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Distribution automatisée</h3>
                  <p className="text-gray-600">Système entièrement automatisé pour une distribution rapide et efficace des boissons.</p>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-xl shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-startup-blue/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Check className="text-startup-blue" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Maintenance facile</h3>
                  <p className="text-gray-600">Conception robuste nécessitant peu d'entretien et facile à recharger.</p>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <SectionTitle
          title={bertinyGlobalData?.specsTitle || "Spécifications techniques"}
          subtitle={bertinyGlobalData?.specsSubtitle || "Détails et caractéristiques"}
          center
        />

        <div className="mt-12 bg-white rounded-xl shadow-md p-8 max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {bertinyGlobalData?.specifications ? (
              // Use specifications from global data if available
              bertinyGlobalData.specifications.map((spec, index) => (
                <div key={index} className="border-b border-gray-100 pb-4">
                  <p className="text-gray-500 text-sm">{spec.specName}</p>
                  <p className="font-medium">{spec.specValue}</p>
                </div>
              ))
            ) : (
              // Default specifications
              <>
                <div className="border-b border-gray-100 pb-4">
                  <p className="text-gray-500 text-sm">Dimensions</p>
                  <p className="font-medium">60cm x 40cm x 120cm</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <p className="text-gray-500 text-sm">Poids</p>
                  <p className="font-medium">45kg</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <p className="text-gray-500 text-sm">Capacité</p>
                  <p className="font-medium">100-150 boissons</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <p className="text-gray-500 text-sm">Alimentation</p>
                  <p className="font-medium">220V - 50Hz</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <p className="text-gray-500 text-sm">Consommation</p>
                  <p className="font-medium">100W en fonctionnement</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <p className="text-gray-500 text-sm">Température</p>
                  <p className="font-medium">5°C - 15°C</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-startup-blue/5 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title={bertinyGlobalData?.faqTitle || "Questions fréquentes"}
            subtitle={bertinyGlobalData?.faqSubtitle || "Tout ce que vous devez savoir sur Bertiny3.0"}
            center
          />

          <div className="mt-12 max-w-4xl mx-auto">
            {bertinyGlobalData?.faqItems ? (
              // Use FAQ items from global data if available
              bertinyGlobalData.faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white mb-4 rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              // Default FAQ items
              <>
                <motion.div
                  className="bg-white mb-4 rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Comment fonctionne Bertiny3.0?</h3>
                    <p className="text-gray-600">
                      Bertiny3.0 accepte des pièces de monnaie, puis distribue automatiquement la boisson sélectionnée. Il suffit d'insérer l'argent, de faire votre sélection, et la boisson est distribuée.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white mb-4 rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Quels types de boissons peut-on distribuer?</h3>
                    <p className="text-gray-600">
                      Bertiny3.0 peut être configuré pour distribuer une variété de boissons embouteillées ou en canette, selon vos besoins spécifiques.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white mb-4 rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Est-ce que Bertiny3.0 nécessite une connexion électrique?</h3>
                    <p className="text-gray-600">
                      Oui, Bertiny3.0 nécessite une connexion électrique standard pour fonctionner, notamment pour le système de refroidissement et le mécanisme de distribution.
                    </p>
                  </div>
                </motion.div>
              </>
            )}
          </div>

          <div className="text-center mt-12">
            <Button asChild className="bg-startup-blue hover:bg-startup-blue/90">
              <Link to="/contact">
                {bertinyGlobalData?.buyButtonText || "Demander plus d'informations"}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Bertiny;

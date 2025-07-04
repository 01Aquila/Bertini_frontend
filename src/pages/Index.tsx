
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { FeatureCard } from "@/components/FeatureCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, ThumbsUp, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHomepage } from "@/hooks/useGlobal";
import PageLoading from "@/components/PageLoading";

// Define proper types for our products
interface Product {
  _id: string;
  name: string;
  price: string | number;
  description: string;
  image: {
    url: string;
  };
}

// Define type for Bertiny Special
interface BertinySpecial {
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
  createdAt?: string;
  updatedAt?: string;
}

// Define type for Homepage Global Data
interface HomepageData {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroImage: { url: string };
  advantages: {
    title: string;
    description: string;
    iconName: string;
  }[];
  aboutTitle: string;
  aboutParagraph: string;
  aboutImage: { url: string };
  aboutCtaText: string;
  testimonials: {
    name: string;
    testimonial: string;
  }[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
}

// Fallback products in case API fails
const fallbackProducts: {
  applications: Product[];
  smartphones: Product[];
} = {
  applications: [
    {
      _id: "app1",
      name: "Filmora Premium",
      price: "5 000",
      description: "Application de divertissement premium offrant une expérience utilisateur exceptionnelle.",
      image: {
        url: null
      }
    },
    {
      _id: "app2",
      name: "Capcut",
      price: "5 000",
      description: "Application innovante pour la productivité et la gestion de projet.",
      image: {
        url: null
      }
    }
  ],
  smartphones: [
    {
      _id: "phone1",
      name: "iPhone 15 Pro",
      price: "750 000",
      description: "Smartphone haut de gamme avec des fonctionnalités avancées.",
      image: {
        url: null
      }
    },
    {
      _id: "phone2",
      name: "Galaxy S23 Ultra",
      price: "650 000",
      description: "Smartphone Android premium avec un stylet et un appareil photo de qualité professionnelle.",
      image: {
        url: null
      }
    }
  ]
};

// Icon mapping for advantages section
const iconMapping = {
  "CheckCircle": CheckCircle,
  "ThumbsUp": ThumbsUp,
  "Lock": Lock,
};

// Default advantages as fallback
const defaultAdvantages = [
  {
    title: "Produits locaux",
    description: "Des produits conçus au Cameroun pour le marché local.",
    iconName: "CheckCircle"
  },
  {
    title: "Service client réactif",
    description: "Une équipe disponible pour répondre à toutes vos questions.",
    iconName: "ThumbsUp"
  },
  {
    title: "Paiement sécurisé",
    description: "Vos transactions sont protégées par les dernières technologies de sécurité.",
    iconName: "Lock"
  }
];

// Default testimonials as fallback
const defaultTestimonials = [
  {
    id: 1,
    name: "Kamdem Éric",
    testimonial: "Je suis très satisfait de l'application Filmora Premium, elle est vraiment exceptionnelle !",
  },
  {
    id: 2,
    name: "Marius Kamdem",
    testimonial: "Je suis très satisfait de l'application Capcut, elle est vraiment exceptionnelle !",
  },
  {
    id: 3,
    name: "Doriane Tchoumba",
    testimonial: "Je suis très satisfaite de l'application Netflix, elle est vraiment exceptionnelle !",
  },
  {
    id: 4,
    name: "Jean Pierre Kamdem",
    testimonial: "Je suis très satisfait de l'application ChatGPT, elle est vraiment exceptionnelle !",
  }
];

const Index = () => {
  // State for Homepage global data
  const { data: homepageData, loading: homepageLoading } = useHomepage();
  const [pageData, setPageData] = useState<HomepageData | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [loadingSmartphones, setLoadingSmartphones] = useState(true);
  const [loadingBertinySpecial, setLoadingBertinySpecial] = useState(true);
  const [applications, setApplications] = useState<Product[]>([]);
  const [smartphones, setSmartphones] = useState<Product[]>([]);
  const [bertinySpecial, setBertinySpecial] = useState<BertinySpecial[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    setLoadingApplications(true);
    setError(null);
    try {
      const response = await axios.get("https://bertini-backend.vercel.app/api/applications", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      console.log("Applications data:", data.docs);

      if (data?.docs && Array.isArray(data.docs)) {
        setApplications(data.docs.slice(0, 2)); // Only get 2 applications
      } else {
        console.error("Invalid applications data format", data);
        // Use fallback data
        setApplications(fallbackProducts.applications);
      }
    } catch (error) {
      console.error("Application fetch error:", error);
      // Use fallback data on error
      setApplications(fallbackProducts.applications);
    } finally {
      setLoadingApplications(false);
    }
  };

  const fetchSmartphones = async () => {
    setLoadingSmartphones(true);
    setError(null);
    try {
      const response = await axios.get("https://bertini-backend.vercel.app/api/smartphones", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      console.log("Smartphones data:", data.docs);

      if (data?.docs && Array.isArray(data.docs)) {
        setSmartphones(data.docs.slice(0, 2)); // Only get 2 smartphones
      } else {
        console.error("Invalid smartphones data format", data);
        // Use fallback data
        setSmartphones(fallbackProducts.smartphones);
      }
    } catch (error) {
      console.error("Smartphone fetch error:", error);
      // Use fallback data on error
      setSmartphones(fallbackProducts.smartphones);
    } finally {
      setLoadingSmartphones(false);
    }
  };

  const fetchBertinySpecial = async () => {
    setLoadingBertinySpecial(true);
    setError(null);
    try {
      const response = await axios.get("https://bertini-backend.vercel.app/api/bertini-page", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      console.log("Bertiny Special data:", data.docs);

      if (data?.docs && Array.isArray(data.docs)) {
        setBertinySpecial(data.docs.slice(0, 1)); // Only get 1 Bertiny Special
      }
    } catch (error) {
      console.error("Bertiny Special fetch error:", error);
    } finally {
      setLoadingBertinySpecial(false);
    }
  };

  // Update homepage data when loaded from CMS
  useEffect(() => {
    if (homepageData) {
      setPageData(homepageData);
    }
  }, [homepageData]);

  useEffect(() => {
    fetchApplications();
    fetchSmartphones();
    fetchBertinySpecial();
  }, []);
  
  // Show loading state if homepage data is loading
  if (homepageLoading) {
    return <PageLoading />;
  }
  
  // Get advantages to display (from CMS or fallback)
  const advantagesToShow = pageData?.advantages || defaultAdvantages;
  
  // Get testimonials to display (from CMS or fallback)
  const testimonialsToShow = pageData?.testimonials || defaultTestimonials;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <Hero
        title="Découvrez les solutions innovantes de Startup Conception 3.0"
        subtitle="Des produits conçus pour améliorer votre quotidien"
        ctaText="Découvrez nos services"
        imageUrl="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2620&auto=format&fit=crop"
      />

      {/* Featured Products Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <SectionTitle
          title="Nos produits phares"
          subtitle="Des solutions innovantes pour tous vos besoins"
          center
        />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-8 mb-4 text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {(loadingApplications || loadingSmartphones) ? (
            // Loading state - show 4 placeholder cards
            Array(4).fill(0).map((_, index) => (
              <div key={`loading-${index}`} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 w-full bg-gray-200 animate-pulse" />
                <div className="p-5">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-3 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded w-full mt-4 animate-pulse" />
                </div>
              </div>
            ))
          ) : (
            // Combine applications and smartphones
            [...applications, ...smartphones].map((product, index) => (
              <ProductCard
                key={product._id || `product-${index}`}
                _id={product._id}
                productType={index < applications.length ? "application" : "smartphone"}
                name={product.name || "Produit sans nom"}
                price={product.price?.toString() || "Prix non disponible"}
                description={
                  product.description || "Aucune description disponible"
                }
                imageUrl={product?.image?.url ? `https://bertini-backend.vercel.app${product?.image?.url}` : '/images/placeholder.png'}
                index={index}
              />
            ))
          )}
        </div>

        <div className="mt-12 text-center">
          <Button asChild className="bg-startup-blue hover:bg-startup-blue/90">
            <Link to="/products">
              Voir tous nos produits
            </Link>
          </Button>
        </div>
      </section>

      {/* Bertiny Special Section */}
      <section className="py-16 bg-startup-blue/5">
        <div className="max-w-7xl mx-auto px-4">
          {loadingBertinySpecial ? (
            // Loading state for Bertiny Special
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="h-64 md:h-80 bg-gray-200 rounded-2xl animate-pulse"></div>
              <div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-24 bg-gray-200 rounded w-full mb-6 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              </div>
            </div>
          ) : bertinySpecial.length > 0 ? (
            // Display Bertiny Special data
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <motion.img
                  src={bertinySpecial[0]?.images?.[0]?.image?.url 
                    ? `https://bertini-backend.vercel.app${bertinySpecial[0].images[0].image.url}` 
                    : "/images/placeholder.png"}
                  alt={bertinySpecial[0]?.title || "Bertiny3.0"}
                  className="rounded-2xl shadow-xl w-full h-auto"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                />
              </div>
              <div>
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-gray-900 font-heading mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {bertinySpecial[0]?.title || "Bertiny3.0"}
                </motion.h2>
                <motion.p
                  className="text-xl text-gray-600 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="font-semibold">{bertinySpecial[0]?.subtitle || "La fraîcheur à portée de main"}</span>
                </motion.p>
                <motion.p
                  className="text-gray-600 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {bertinySpecial[0]?.description
                    ? `${bertinySpecial[0].description.slice(0, 150)}${bertinySpecial[0].description.length > 150 ? "..." : ""}`
                    : "Machine automatique de distribution de boissons fonctionnant avec des pièces de monnaie. Distribution rapide, hygiénique et autonome."}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Button asChild className="bg-startup-blue hover:bg-startup-blue/90">
                    <Link to="/bertiny">
                      En savoir plus
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          ) : (
            // Fallback if no data is available
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <motion.img
                  src="https://images.unsplash.com/photo-1527490087278-9c75be0b8052?q=80&w=2946&auto=format&fit=crop"
                  alt="Bertiny3.0"
                  className="rounded-2xl shadow-xl"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                />
              </div>
              <div>
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-gray-900 font-heading mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Bertiny3.0
                </motion.h2>
                <motion.p
                  className="text-xl text-gray-600 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="font-semibold">La fraîcheur à portée de main</span>
                </motion.p>
                <motion.p
                  className="text-gray-600 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Machine automatique de distribution de boissons fonctionnant avec des pièces de monnaie. Distribution rapide, hygiénique et autonome.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Button asChild className="bg-startup-blue hover:bg-startup-blue/90">
                    <Link to="/bertiny">
                      En savoir plus
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <SectionTitle
          title="Nos avantages"
          subtitle="Pourquoi choisir Startup Conception 3.0"
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                      {advantagesToShow.map((advantage, index) => {
             const IconComponent = iconMapping[advantage.iconName] || CheckCircle;
             
             return (
              <FeatureCard
                key={index}
                title={advantage.title}
                description={advantage.description}
                icon={IconComponent}
                index={index}
              />
             );
           })}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-startup-blue text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2
                className="text-3xl md:text-4xl font-bold font-heading mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {pageData?.aboutTitle || "À propos de nous"}
              </motion.h2>
              <motion.p
                className="text-white/90 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                {pageData?.aboutParagraph || "Startup Conception 3.0 est une entreprise qui conçoit des solutions innovantes pour améliorer la vie quotidienne, avec des valeurs d'innovation, de qualité et de service client."}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                                  <Button asChild className="bg-white text-startup-blue hover:bg-white/90">
                    <Link to="/about">
                      {pageData?.aboutCtaText || "En savoir plus"}
                    </Link>
                  </Button>
              </motion.div>
            </div>
            <motion.div
              className="rounded-xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src={pageData?.aboutImage?.url || "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2940&auto=format&fit=crop"}
                alt="Notre équipe"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <SectionTitle
          title="Témoignages clients"
          subtitle="Ce que nos clients pensent de nos produits"
          center
        />

        <div className="grid grid-cols-2 gap-6 mt-12 max-w-2xl mx-auto">
          {testimonialsToShow.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              testimonial={testimonial.testimonial}
              index={index}
            />
          ))}
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
            {pageData?.ctaTitle || "Prêt à découvrir nos services?"}
          </motion.h2>
          <motion.p
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {pageData?.ctaSubtitle || "Contactez-nous dès aujourd'hui pour en savoir plus sur nos produits et services."}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button asChild className="bg-white text-startup-blue hover:bg-white/90 text-lg px-8 py-6">
              <Link to="/contact">
                {pageData?.ctaButtonText || "Nous contacter"}
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

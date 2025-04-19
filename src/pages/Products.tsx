
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/SectionTitle";

const phones = [
  {
    name: "Itel S23",
    price: "125 000",
    description: "Smartphone élégant avec écran HD, processeur octa-core et batterie longue durée.",
    imageUrl: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?q=80&w=2980&auto=format&fit=crop"
  },
  {
    name: "Infinix Note 12 Pro",
    price: "150 000",
    description: "Smartphone puissant avec écran AMOLED, appareil photo haute résolution et charge rapide.",
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2127&auto=format&fit=crop"
  },
  {
    name: "Samsung Galaxy A33 5G",
    price: "200 000",
    description: "Smartphone milieu de gamme avec connectivité 5G, écran Super AMOLED et résistance à l'eau.",
    imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=2071&auto=format&fit=crop"
  },
  {
    name: "iPhone 14",
    price: "650 000",
    description: "Smartphone haut de gamme avec puce A15 Bionic, caméras avancées et écran Super Retina XDR.",
    imageUrl: "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=2065&auto=format&fit=crop"
  },
  {
    name: "Tecno Camon 19 Pro",
    price: "175 000",
    description: "Smartphone avec caméra 64MP, écran AMOLED et capacités photo nocturnes impressionnantes.",
    imageUrl: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1964&auto=format&fit=crop"
  },
  {
    name: "Itel A60",
    price: "65 000",
    description: "Smartphone d'entrée de gamme avec batterie longue durée et double caméra.",
    imageUrl: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=2274&auto=format&fit=crop"
  },
  {
    name: "Infinix Hot 12 Play",
    price: "110 000",
    description: "Smartphone avec grand écran, grande batterie et performance fiable.",
    imageUrl: "https://images.unsplash.com/photo-1550367083-9fa5211ceab7?q=80&w=2940&auto=format&fit=crop"
  },
  {
    name: "Samsung Galaxy S22 Ultra",
    price: "800 000",
    description: "Smartphone premium avec stylet S Pen intégré, caméra 108MP et écran Dynamic AMOLED 2X.",
    imageUrl: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=2944&auto=format&fit=crop"
  },
  {
    name: "Tecno Spark 9 Pro",
    price: "130 000",
    description: "Smartphone avec caméra selfie avancée, écran HD+ et processeur octa-core.",
    imageUrl: "https://images.unsplash.com/photo-1624483074739-3d673c1c707f?q=80&w=2942&auto=format&fit=crop"
  },
  {
    name: "iPhone 13",
    price: "550 000",
    description: "Smartphone avec puce A15 Bionic, système de caméra double et écran Super Retina XDR.",
    imageUrl: "https://images.unsplash.com/photo-1638761751551-1d177b02dbc9?q=80&w=2940&auto=format&fit=crop"
  }
];

const applications = [
  {
    name: "Filmora Premium",
    price: "5 000",
    description: "Application de divertissement premium offrant une expérience utilisateur exceptionnelle.",
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2940&auto=format&fit=crop"
  },
  {
    name: "Capcut",
    price: "5 000",
    description: "Application innovante pour la productivité et la gestion de projet.",
    imageUrl: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=2787&auto=format&fit=crop"
  },
  {
    name: "Netflix",
    price: "5 000",
    description: "Service de streaming vidéo premium.",
    imageUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2149&auto=format&fit=crop"
  },
  {
    name: "ChatGPT",
    price: "5 000",
    description: "Outil de conversation basé sur l'IA.",
    imageUrl: "https://images.unsplash.com/photo-1677442135136-760c813170a5?q=80&w=2932&auto=format&fit=crop"
  }
];

const Products = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <Hero 
        title="Notre catalogue de produits"
        subtitle="Découvrez notre sélection de smartphones et applications"
        imageUrl="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2940&auto=format&fit=crop"
        ctaText="Contactez-nous"
        ctaLink="/contact" 
      />

      {/* Applications Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <SectionTitle 
          title="Nos applications" 
          subtitle="Solutions logicielles pour améliorer votre quotidien"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {applications.map((app, index) => (
            <ProductCard 
              key={index}
              name={app.name}
              price={app.price}
              description={app.description}
              imageUrl={app.imageUrl}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Smartphones Section */}
      <section className="py-16 bg-startup-blue/5 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Nos smartphones" 
            subtitle="Une large gamme pour tous les budgets et besoins"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {phones.map((phone, index) => (
              <ProductCard 
                key={index}
                name={phone.name}
                price={phone.price}
                description={phone.description}
                imageUrl={phone.imageUrl}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;

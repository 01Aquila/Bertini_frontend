import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useEffect } from "react";

// Define Product interface
interface Product {
  _id: string;
  name: string;
  price: string | number;
  description: string;
  image?: {
    url: string;
    alt?: string;
  };
  productType?: "smartphone" | "application";
}

// ProductOrder component that receives product as state from navigation
export default function ProductOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product as Product | undefined;

  // Scroll to top when mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle WhatsApp contact
  const WA_NUMBER = "237691200242";
  const waText = product ? encodeURIComponent(
    `Bonjour, je souhaite commander le produit suivant:\n- ${product.name}\nPrix: ${product.price} FCFA\nMerci de me contacter pour finaliser l'achat.`
  ) : "";
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${waText}`;

  // Generate image URL
  const getImageUrl = (product: Product | undefined) => {
    if (!product?.image?.url) return "/images/placeholder.png";
    return `https://bertini-backend.vercel.app${product.image.url}`;
  };

  // If no product was passed, show error
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center px-4 pt-28 pb-10 bg-gradient-to-br from-white via-white to-startup-blue-light">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-12 text-center animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Produit introuvable</h2>
            <p className="text-lg text-gray-700 mb-6">Désolé, nous n'avons pas pu trouver le produit que vous cherchez.</p>
            <Button 
              className="bg-startup-blue hover:bg-startup-blue/90"
              onClick={() => navigate("/products")}
            >
              Voir tous nos produits
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-28 pb-10 bg-gradient-to-br from-white via-white to-startup-blue-light">
        <section className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row gap-6 animate-fade-in">
          {/* Image */}
          <div className="flex-shrink-0">
            <img
              src={getImageUrl(product)}
              alt={product.name}
              className="rounded-2xl w-48 h-48 object-cover shadow-lg border-2 border-startup-blue/20 bg-gray-50"
            />
          </div>
          {/* Details */}
          <div className="flex-1 flex flex-col">
            <h1 className="text-2xl md:text-3xl font-bold font-heading text-startup-blue mb-2">{product.name}</h1>
            <p className="text-lg text-gray-700 font-medium mb-4">{product.description}</p>
            <p className="text-2xl font-bold text-gray-900 mb-7">
              {typeof product.price === "number"
                ? `${Number(product.price).toLocaleString()} FCFA`
                : `${product.price} FCFA`}
            </p>
            <Button
              asChild
              className="bg-startup-blue hover:bg-startup-blue/90 w-full md:w-auto text-lg py-6 font-semibold animate-pulse shadow-none"
            >
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Commander sur WhatsApp"
                className="flex items-center justify-center gap-3"
              >
                <ShoppingCart />
                Commander maintenant <ArrowRight className="ml-1" />
              </a>
            </Button>
            <button
              className="mt-6 text-startup-blue hover:underline text-sm self-start"
              onClick={() => navigate(-1)}
            >
              &larr; Retour au catalogue
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useEffect } from "react";

const ALL_PRODUCTS = [
    // Applications
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
    },
    // Smartphones
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

const formatProductName = (name: string) =>
    name
        .toLowerCase()
        .replace(/[^a-z0-9]+/gi, "-")
        .replace(/^-+|-+$/g, "");

export default function ProductOrder() {
    const { productName = "" } = useParams<{ productName: string }>();
    const navigate = useNavigate();

    // Scroll to top when mounted (for direct visits)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const product =
        ALL_PRODUCTS.find(
            p => formatProductName(p.name) === productName
        ) || ALL_PRODUCTS[0]; // fallback to first if not found

    // WhatsApp pre-filled message
    const WA_NUMBER = "237691200242";
    const waText = encodeURIComponent(
        `Bonjour, je souhaite commander le produit suivant:\n- ${product.name}\nPrix: ${product.price} FCFA\nMerci de me contacter pour finaliser l'achat.`
    );
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${waText}`;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1 flex flex-col items-center justify-center px-4 pt-28 pb-10 bg-gradient-to-br from-white via-white to-startup-blue-light">
                <section className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row gap-6 animate-fade-in">
                    {/* Image */}
                    <div className="flex-shrink-0">
                        <img
                            src={product.imageUrl}
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
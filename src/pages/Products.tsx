
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

// Define the types for our products and pagination response
interface Product {
  _id: string;
  name: string;
  price: string | number;
  description: string;
  image: {
    url: string;
  };
}

interface PaginationResponse {
  docs: Product[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

// Fallback products in case API fails
const fallbackProducts = {
  applications: [
    {
      _id: "app1",
      name: "Produit initial",
      price: "5 000",
      description: "Produit initial de la startup conception 3.0.",
      image: {
        url: "/images/applications/filmora.jpg"
      }
    },
  ],
  smartphones: [
    {
      _id: "sm1",
      name: "Produit initial",
      price: "0",
      description: "Produit initial de la startup conception 3.0.",
      image: {
        url: "/images/smartphones/itel-s23.jpg"
      }
    },
  ]
};

const Products = () => {
  // States for applications
  const [applications, setApplications] = useState<Product[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [applicationsPage, setApplicationsPage] = useState(1);
  const [applicationsPagination, setApplicationsPagination] = useState<PaginationResponse | null>(null);
  const [applicationsError, setApplicationsError] = useState<string | null>(null);

  // States for smartphones
  const [smartphones, setSmartphones] = useState<Product[]>([]);
  const [loadingSmartphones, setLoadingSmartphones] = useState(true);
  const [smartphonesPage, setSmartphonesPage] = useState(1);
  const [smartphonesPagination, setSmartphonesPagination] = useState<PaginationResponse | null>(null);
  const [smartphonesError, setSmartphonesError] = useState<string | null>(null);

  // Fetch applications with pagination
  const fetchApplications = async (page = 1) => {
    setLoadingApplications(true);
    setApplicationsError(null);
    try {
      const response = await axios.get<PaginationResponse>(`https://bertini-backend.vercel.app/api/applications?page=${page}&limit=8`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data?.docs && Array.isArray(response.data.docs)) {
        setApplications(response.data.docs);
        setApplicationsPagination(response.data);
      } else {
        console.error("Invalid applications data format", response.data);
        setApplications(fallbackProducts.applications);
        setApplicationsError("Erreur lors du chargement des applications");
      }
    } catch (error) {
      console.error("Applications fetch error:", error);
      setApplications(fallbackProducts.applications);
      setApplicationsError("Erreur de connexion au serveur");
    } finally {
      setLoadingApplications(false);
    }
  };

  // Fetch smartphones with pagination
  const fetchSmartphones = async (page = 1) => {
    setLoadingSmartphones(true);
    setSmartphonesError(null);
    try {
      const response = await axios.get<PaginationResponse>(`https://bertini-backend.vercel.app/api/smartphones?page=${page}&limit=6`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data?.docs && Array.isArray(response.data.docs)) {
        setSmartphones(response.data.docs);
        setSmartphonesPagination(response.data);
      } else {
        console.error("Invalid smartphones data format", response.data);
        setSmartphones(fallbackProducts.smartphones);
        setSmartphonesError("Erreur lors du chargement des smartphones");
      }
    } catch (error) {
      console.error("Smartphones fetch error:", error);
      setSmartphones(fallbackProducts.smartphones);
      setSmartphonesError("Erreur de connexion au serveur");
    } finally {
      setLoadingSmartphones(false);
    }
  };

  // Handle application pagination navigation
  const handleApplicationsPageChange = (newPage: number) => {
    if (newPage > 0 && (!applicationsPagination || newPage <= applicationsPagination.totalPages)) {
      setApplicationsPage(newPage);
      fetchApplications(newPage);
    }
  };

  // Handle smartphone pagination navigation
  const handleSmartphonesPageChange = (newPage: number) => {
    if (newPage > 0 && (!smartphonesPagination || newPage <= smartphonesPagination.totalPages)) {
      setSmartphonesPage(newPage);
      fetchSmartphones(newPage);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchApplications();
    fetchSmartphones();
  }, []);

  // Render pagination controls
  const renderPagination = (page: number, totalPages: number, hasPrevPage: boolean, hasNextPage: boolean, onPageChange: (page: number) => void) => {
    return (
      <div className="flex items-center justify-center space-x-4 mt-8">
        <Button
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrevPage}
          variant={hasPrevPage ? "default" : "outline"}
          className={`flex items-center ${!hasPrevPage ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Précédent
        </Button>
        <span className="text-sm font-medium">
          Page {page} sur {totalPages}
        </span>
        <Button
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNextPage}
          variant={hasNextPage ? "default" : "outline"}
          className={`flex items-center ${!hasNextPage ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Suivant <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  };

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

        {/* {applicationsError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-6 text-center">
            {applicationsError}
          </div>
        )} */}

        {loadingApplications ? (
          // Loading state - show placeholder cards
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {Array(8).fill(0).map((_, index) => (
              <div key={`loading-app-${index}`} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 w-full bg-gray-200 animate-pulse" />
                <div className="p-5">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-3 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded w-full mt-4 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {applications.length > 0 ? applications.map((app, index) => (
                <ProductCard
                  key={app._id || index}
                  name={app.name || "Application sans nom"}
                  price={app.price?.toString() || "Prix non disponible"}
                  description={app.description
                    ? `${app.description.slice(0, 50)}${app.description.length > 50 ? "..." : ""}`
                    : "Aucune description disponible"
                  }
                  imageUrl={app.image?.url ? `https://bertini-backend.vercel.app${app.image.url}` : "https://images.unsplash.com/photo-1586892478025-2b5472316991?q=80&w=1974&auto=format&fit=crop"}
                  index={index}
                />
              )) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  Aucune application disponible pour le moment.
                </div>
              )}
            </div>

            {applicationsPagination && applicationsPagination.totalPages > 1 && (
              renderPagination(
                applicationsPage,
                applicationsPagination.totalPages,
                applicationsPagination.hasPrevPage,
                applicationsPagination.hasNextPage,
                handleApplicationsPageChange
              )
            )}
          </>
        )}
      </section>

      {/* Smartphones Section */}
      <section className="py-16 bg-startup-blue/5 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Nos smartphones"
            subtitle="Une large gamme pour tous les budgets et besoins"
          />

          {/* {smartphonesError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-6 text-center">
              {smartphonesError}
            </div>
          )} */}

          {loadingSmartphones ? (
            // Loading state - show placeholder cards
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {Array(6).fill(0).map((_, index) => (
                <div key={`loading-phone-${index}`} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="h-48 w-full bg-gray-200 animate-pulse" />
                  <div className="p-5">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-3 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
                    <div className="h-10 bg-gray-200 rounded w-full mt-4 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {smartphones.length > 0 ? smartphones.map((phone, index) => (
                  <ProductCard
                    key={phone._id || index}
                    name={phone.name || "Smartphone sans nom"}
                    price={phone.price?.toString() || "Prix non disponible"}
                    description={phone.description
                      ? `${phone.description.slice(0, 70)}${phone.description.length > 70 ? "..." : ""}`
                      : "Aucune description disponible"
                    }
                    imageUrl={phone.image?.url ? `https://bertini-backend.vercel.app${phone.image.url}` : "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=2944&auto=format&fit=crop"}
                    index={index}
                  />
                )) : (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    Aucun smartphone disponible pour le moment.
                  </div>
                )}
              </div>

              {smartphonesPagination && smartphonesPagination.totalPages > 1 && (
                renderPagination(
                  smartphonesPage,
                  smartphonesPagination.totalPages,
                  smartphonesPagination.hasPrevPage,
                  smartphonesPagination.hasNextPage,
                  handleSmartphonesPageChange
                )
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;

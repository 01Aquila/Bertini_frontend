import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/SectionTitle";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageLoading from "@/components/PageLoading";
import { useProductsPage } from "@/hooks/useGlobal";
import { useApplications, useSmartphones } from "@/hooks/useCollection";

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

// Define type for Products Page Global Data
interface ProductsPageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: { url: string };
  introTitle: string;
  introDescription: string;
  featuredTitle: string;
  featuredSubtitle: string;
  ctaTitle: string;
  ctaText: string;
  ctaButtonText: string;
  ctaImage: { url: string };
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
  // Global data state
  const { data: pageData, loading: pageLoading } = useProductsPage();
  const [productsData, setProductsData] = useState<ProductsPageData | null>(null);

  // Use our custom hooks with caching for applications and smartphones
  const {
    data: applications,
    loading: loadingApplications,
    error: applicationsError,
    pagination: applicationsPagination,
    page: applicationsPage,
    goToPage: handleApplicationsPageChange
  } = useApplications();

  const {
    data: smartphones,
    loading: loadingSmartphones,
    error: smartphonesError,
    pagination: smartphonesPagination,
    page: smartphonesPage,
    goToPage: handleSmartphonesPageChange
  } = useSmartphones();

  // Set global page data when loaded
  useEffect(() => {
    if (pageData) {
      setProductsData(pageData);
    }
  }, [pageData]);

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

  if (pageLoading) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <Hero
        title={productsData?.heroTitle || "Notre catalogue de produits"}
        subtitle={productsData?.heroSubtitle || "Découvrez notre sélection de smartphones et applications"}
        imageUrl={productsData?.heroImage?.url || "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=2940&auto=format&fit=crop"}
        ctaText="Contactez-nous"
        ctaLink="/contact"
      />

      {/* Applications Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <SectionTitle
          title={productsData?.introTitle || "Nos applications"}
          subtitle={productsData?.introDescription || "Solutions logicielles pour améliorer votre quotidien"}
        />

        <div className="mt-12">
          {applicationsError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-center">
              {applicationsError.message || "Erreur lors du chargement des applications"}
            </div>
          )}

          {loadingApplications ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse bg-white rounded-lg overflow-hidden shadow-md h-80">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-5 bg-gray-200 rounded mb-3 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-2/4"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : applications.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {applications.map((application) => (
                  <ProductCard
                    key={application._id}
                    product={application}
                    isApplication={true}
                  />
                ))}
              </div>
              {applicationsPagination && applicationsPagination.totalPages > 1 && (
                renderPagination(
                  applicationsPagination.page,
                  applicationsPagination.totalPages,
                  applicationsPagination.hasPrevPage,
                  applicationsPagination.hasNextPage,
                  handleApplicationsPageChange
                )
              )}
            </>
          ) : (
            <div className="text-center text-gray-500 py-10">
              Aucune application n'est disponible pour le moment.
            </div>
          )}
        </div>
      </section>

      {/* Smartphones Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title={productsData?.featuredTitle || "Nos smartphones"}
            subtitle={productsData?.featuredSubtitle || "Téléphones de qualité à prix compétitifs"}
          />

          <div className="mt-12">
            {smartphonesError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-center">
                {smartphonesError.message || "Erreur lors du chargement des smartphones"}
              </div>
            )}

            {loadingSmartphones ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse bg-white rounded-lg overflow-hidden shadow-md h-80">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-5 bg-gray-200 rounded mb-3 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4 w-2/4"></div>
                      <div className="h-10 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : smartphones.length > 0 ? (
              <>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {smartphones.map((smartphone) => (
                    <ProductCard
                      key={smartphone._id}
                      product={smartphone}
                      isApplication={false}
                    />
                  ))}
                </div>
                {smartphonesPagination && smartphonesPagination.totalPages > 1 && (
                  renderPagination(
                    smartphonesPagination.page,
                    smartphonesPagination.totalPages,
                    smartphonesPagination.hasPrevPage,
                    smartphonesPagination.hasNextPage,
                    handleSmartphonesPageChange
                  )
                )}
              </>
            ) : (
              <div className="text-center text-gray-500 py-10">
                Aucun smartphone n'est disponible pour le moment.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-startup-blue rounded-xl overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:w-1/2 p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{productsData?.ctaTitle || "Vous ne trouvez pas ce que vous cherchez ?"}</h2>
                <p className="text-white/90 mb-6">
                  {productsData?.ctaText || "N'hésitez pas à nous contacter pour toute demande spécifique. Notre équipe est à votre disposition pour répondre à vos besoins."}
                </p>
                <Button asChild className="bg-white text-startup-blue hover:bg-gray-100">
                  <a href="/contact">{productsData?.ctaButtonText || "Nous contacter"}</a>
                </Button>
              </div>
              <div className="md:w-1/2">
                <img
                  src={productsData?.ctaImage?.url || "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2940&auto=format&fit=crop"}
                  alt="Contact us"
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;

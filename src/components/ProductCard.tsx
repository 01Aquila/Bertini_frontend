import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, ChevronRight } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: string | number;
  description: string;
  image: {
    url: string;
  };
}

interface ProductCardProps {
  name?: string;
  price?: string | number;
  description?: string;
  imageUrl?: string;
  link?: string;
  index?: number;
  _id?: string;
  productType?: "smartphone" | "application";
  product?: Product;
  isApplication?: boolean;
}

// Convert product name to url-safe string for use in URLs
const formatProductName = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "");

export function ProductCard({
  name,
  price,
  description,
  imageUrl = "https://images.unsplash.com/photo-1586892478025-2b5472316991?q=80&w=1974&auto=format&fit=crop",
  index = 0,
  _id,
  productType,
  product,
  isApplication,
}: ProductCardProps) {
  // If product prop is provided, extract values from it
  const productName = product?.name || name || "";
  const productPrice = product?.price || price || "";
  const productDesc = product?.description || description || "";
  const productId = product?._id || _id || "";
  const productImage = product?.image?.url || imageUrl;
  const type = isApplication ? "application" : "smartphone";
  const navigate = useNavigate();
  
  // Handle product order navigation with product data
  const handleOrderClick = () => {
    // Create a product object with all necessary data
    const productData = {
      _id: productId || `product-${productName}`,
      name: productName,
      price: productPrice,
      description: productDesc, // Pass the complete description
      image: { url: productImage.includes("bertini-backend.vercel.app") ? productImage.replace("https://bertini-backend.vercel.app", "") : null },
      productType: type
    };
    
    // Navigate to product order page with product data as state
    navigate(`/product-order/${productId || formatProductName(productName)}`, { state: { product: productData } });
  };
  
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full group border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5 }}
    >
      {/* Image Container */}
      <div className="relative h-52 w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          whileHover={{ opacity: 1 }}
        />
        
        <motion.img
          src={productImage}
          alt={productName}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
        />
        
        <div className="absolute top-3 right-3 z-20">
          <motion.div 
            className="bg-startup-blue text-white text-xs font-bold px-2.5 py-1.5 rounded-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            {isApplication ? "Application" : "Smartphone"}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-gray-900 font-heading mb-1 group-hover:text-startup-blue transition-colors duration-200">{productName}</h3>
            <p className="text-startup-blue font-semibold mb-3 flex items-center">
              <span className="text-lg">
                {typeof productPrice === "number" ? `${productPrice.toLocaleString()} FCFA` : productPrice + " FCFA"}
              </span>
              <span className="ml-2 text-xs text-gray-500">TTC</span>
            </p>
          </motion.div>
          
          <p className="text-gray-600 mb-5 text-sm">
            {productDesc && productDesc.length > 80 
              ? `${productDesc.slice(0, 80)}...` 
              : productDesc}
          </p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Button
            className="bg-startup-blue hover:bg-startup-blue/90 w-full mt-auto rounded-lg group/btn transition-all duration-300 flex items-center justify-center gap-2"
            onClick={handleOrderClick}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Commander</span>
            <ChevronRight className="h-4 w-4 opacity-0 -ml-4 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
          </Button>
        </div>
      </div>
      
      {/* Hover effect - shine */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-45 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000"
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
}
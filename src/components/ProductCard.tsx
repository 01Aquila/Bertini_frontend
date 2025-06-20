import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

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
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Image */}
      <div className="h-48 w-full bg-gray-200 overflow-hidden">
        <img
          src={productImage}
          alt={productName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 font-heading mb-2">{productName}</h3>
        <p className="text-startup-blue font-semibold mb-3">
          {typeof productPrice === "number" ? `${productPrice.toLocaleString()} FCFA` : productPrice + " FCFA"}
        </p>
        <p className="text-gray-600 mb-4 text-sm flex-1">
          {productDesc && productDesc.length > 70 
            ? `${productDesc.slice(0, 70)}...` 
            : productDesc}
        </p>
        <Button
          className="bg-startup-blue hover:bg-startup-blue/90 w-full mt-auto"
          onClick={handleOrderClick}
        >
          Commander
        </Button>
      </div>
    </motion.div>
  );
}
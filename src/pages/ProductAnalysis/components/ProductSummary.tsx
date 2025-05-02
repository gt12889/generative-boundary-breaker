
import React, { useState } from "react";
import { BookmarkPlus, Star, StarHalf, Check, Smartphone, Laptop, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ProductSummaryProps {
  product: any;
}

const ProductSummary = ({ product }: ProductSummaryProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(isBookmarked ? "Removed from bookmarks" : "Added to bookmarks");
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-primary text-primary" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-4 w-4 text-primary" />);
    }
    
    return stars;
  };

  // Function to determine which icon to show based on product category
  const renderProductIcon = () => {
    const productCategory = product.category?.toLowerCase() || '';
    const productName = product.name?.toLowerCase() || '';
    
    if (productName.includes('iphone') || productCategory.includes('phone') || productCategory.includes('smartphone')) {
      return <Smartphone className="h-10 w-10 text-primary absolute top-2 right-2 bg-background/70 p-1 rounded-full" />;
    } else if (productName.includes('laptop') || productCategory.includes('laptop') || productCategory.includes('notebook')) {
      return <Laptop className="h-10 w-10 text-primary absolute top-2 right-2 bg-background/70 p-1 rounded-full" />;
    } else if (productName.includes('monitor') || productCategory.includes('monitor') || productCategory.includes('display')) {
      return <Monitor className="h-10 w-10 text-primary absolute top-2 right-2 bg-background/70 p-1 rounded-full" />;
    }
    return null;
  };

  // Use a high-quality placeholder image if the product image is missing or broken
  const getFallbackImage = () => {
    const category = product.category?.toLowerCase() || '';
    
    if (category.includes('phone') || category.includes('smartphone')) {
      return "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";
    } else if (category.includes('laptop')) {
      return "https://images.unsplash.com/photo-1531297484001-80022131f5a1";
    } else {
      return "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d";
    }
  };

  return (
    <motion.div 
      className="md:col-span-3 bg-card border border-border rounded-lg p-6 shadow-sm"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative mb-4">
        <div className="h-48 w-full rounded-lg overflow-hidden bg-muted flex items-center justify-center relative">
          {renderProductIcon()}
          <img
            src={product.image}
            alt={product.name}
            className="object-cover h-full w-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              target.src = getFallbackImage();
            }}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className={`absolute top-2 left-2 bg-background/80 backdrop-blur-sm ${isBookmarked ? 'text-primary' : 'text-muted-foreground'}`}
          onClick={handleBookmark}
        >
          <BookmarkPlus className="h-5 w-5" />
        </Button>
      </div>
      
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <div className="text-muted-foreground mb-4 space-y-1">
        <p className="text-sm">Category: <span className="font-medium text-foreground">{product.category}</span></p>
        <p className="text-sm">Brand: <span className="font-medium text-foreground">{product.brand}</span></p>
        <p className="text-sm">Price: <span className="font-medium text-foreground">${product.price}</span></p>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="flex mr-2">
          {renderStars(product.rating)}
        </div>
        <span className="text-sm font-medium">{product.rating}/5 ({product.reviewCount || '124'} reviews)</span>
      </div>

      <div className="space-y-3">
        <div className="bg-muted/30 rounded p-3">
          <p className="text-sm font-medium">Release Date</p>
          <p className="text-sm">{product.releaseDate}</p>
        </div>
        
        <div className="bg-muted/30 rounded p-3">
          <p className="text-sm font-medium">Availability</p>
          <div className="flex items-center mt-1">
            <Check className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-sm">{product.availability || 'In Stock'}</span>
          </div>
        </div>

        <div className="bg-muted/30 rounded p-3">
          <p className="text-sm font-medium">Key Highlights</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {product.highlights?.map((highlight: string, idx: number) => (
              <Badge key={idx} variant="outline" className="bg-primary/10">
                {highlight}
              </Badge>
            )) || (
              <>
                <Badge variant="outline" className="bg-primary/10">Premium Build</Badge>
                <Badge variant="outline" className="bg-primary/10">High Performance</Badge>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductSummary;

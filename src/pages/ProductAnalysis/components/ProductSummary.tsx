
import React, { useState } from "react";
import { BookmarkPlus, Star, StarHalf, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductSummaryProps {
  product: any;
}

const ProductSummary = ({ product }: ProductSummaryProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

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

  return (
    <motion.div 
      className="md:col-span-3 bg-card border border-border rounded-lg p-6 shadow-sm"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative mb-4">
        <div className="h-48 w-full rounded-lg overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover h-full w-full"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className={`absolute top-2 right-2 bg-background/80 backdrop-blur-sm ${isBookmarked ? 'text-primary' : 'text-muted-foreground'}`}
          onClick={() => setIsBookmarked(!isBookmarked)}
        >
          <BookmarkPlus className="h-5 w-5" />
        </Button>
      </div>
      
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <div className="text-muted-foreground mb-4 space-y-1">
        <p className="text-sm">Category: {product.category}</p>
        <p className="text-sm">Brand: {product.brand}</p>
        <p className="text-sm">Price: ${product.price}</p>
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

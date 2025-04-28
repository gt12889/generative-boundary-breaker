
import React, { useState } from "react";
import { ArrowRight, BookmarkPlus, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ProductSummaryProps {
  product: any;
}

const ProductSummary = ({ product }: ProductSummaryProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <motion.div 
      className="md:col-span-3 bg-muted/10 border border-border rounded-lg p-6"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative mb-4">
        <div className="h-48 w-full rounded-lg overflow-hidden bg-muted/10">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover h-full w-full"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          className={`absolute top-2 right-2 ${isBookmarked ? 'text-primary' : 'text-muted-foreground'}`}
          onClick={() => setIsBookmarked(!isBookmarked)}
        >
          <BookmarkPlus className="h-5 w-5" />
        </Button>
      </div>
      
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <div className="text-muted-foreground mb-4">
        <p className="text-sm">Category: {product.category}</p>
        <p className="text-sm">Brand: {product.brand}</p>
        <p className="text-sm">Price: ${product.price}</p>
      </div>
      
      <div className="space-y-2">
        <div className="bg-muted/10 rounded p-2">
          <p className="text-sm text-muted-foreground">Release Date: {product.releaseDate}</p>
        </div>
        <div className="bg-muted/10 rounded p-2">
          <p className="text-sm text-muted-foreground">Rating: {product.rating}/5</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductSummary;

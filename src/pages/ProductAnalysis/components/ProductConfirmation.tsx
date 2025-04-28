
import React from "react";
import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductConfirmationProps {
  product: any;
  onConfirm: () => void;
  onReset: () => void;
}

const ProductConfirmation = ({ product, onConfirm, onReset }: ProductConfirmationProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        className="max-w-md mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle>Confirm Selection</CardTitle>
            <CardDescription>Is this the product you want to analyze?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative h-24 w-24 rounded-md overflow-hidden bg-muted/10">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
                <p className="text-sm text-muted-foreground">ID: {product.id}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline"
              onClick={onReset}
            >
              <X className="mr-2 h-4 w-4" />
              Choose Different
            </Button>
            <Button onClick={onConfirm}>
              <Check className="mr-2 h-4 w-4" />
              Confirm
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductConfirmation;


import React from "react";
import { ArrowLeft, Share2, Download, BookmarkPlus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DetailHeaderProps {
  productName: string;
  onReset: () => void;
}

const DetailHeader = ({ productName, onReset }: DetailHeaderProps) => {
  const handleShare = () => {
    toast.success("Share link copied to clipboard!");
  };

  const handleDownload = () => {
    toast.success("Analysis report is being downloaded!");
  };

  const handleSave = () => {
    toast.success("Analysis saved to your bookmarks!");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between bg-card/50 backdrop-blur-sm sticky top-0 z-10 py-2 px-2 rounded-lg border border-border"
    >
      <Button 
        variant="ghost" 
        className="flex items-center gap-2" 
        onClick={onReset}
      >
        <ArrowLeft className="h-4 w-4" />
        New Analysis
      </Button>
      <h2 className="text-xl font-semibold text-center">{productName} Analysis</h2>
      <div className="flex gap-2">
        <Button size="icon" variant="ghost" onClick={handleShare}>
          <Share2 className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={handleDownload}>
          <Download className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={handleSave}>
          <BookmarkPlus className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default DetailHeader;


import React, { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Download, Share } from "lucide-react";
import { toast } from "./ui/use-toast";
import html2canvas from "html2canvas";

interface ExportOptionsProps {
  contentRef: React.RefObject<HTMLElement>;
  title?: string;
}

export function ExportOptions({ contentRef, title = "Dashboard" }: ExportOptionsProps) {
  const [isExporting, setIsExporting] = useState(false);
  
  const exportAsPNG = async () => {
    if (!contentRef.current) {
      toast({
        title: "Export Failed",
        description: "There was a problem exporting your content.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsExporting(true);
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });
      
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.png`;
      link.href = image;
      link.click();
      
      toast({
        title: "Export Successful",
        description: "Your dashboard has been exported as PNG.",
      });
    } catch (error) {
      console.error("Error exporting PNG:", error);
      toast({
        title: "Export Failed",
        description: "There was a problem exporting your content.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  const exportAsPDF = () => {
    // PDF export logic would go here
    toast({
      description: "PDF export functionality coming soon!",
    });
  };
  
  const shareLink = () => {
    // Generate a shareable link (this is a simplified example)
    const shareableUrl = window.location.href;
    
    navigator.clipboard.writeText(shareableUrl).then(
      () => {
        toast({
          title: "Link Copied!",
          description: "Share this link to show this dashboard.",
        });
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast({
          title: "Failed to Copy Link",
          description: "Please try again or copy the URL manually.",
          variant: "destructive",
        });
      }
    );
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="end">
        <div className="grid gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="justify-start"
            onClick={exportAsPNG}
            disabled={isExporting}
          >
            <Download className="h-4 w-4 mr-2" />
            Export as PNG
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start"
            onClick={exportAsPDF}
          >
            <Download className="h-4 w-4 mr-2" />
            Export as PDF
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="justify-start"
            onClick={shareLink}
          >
            <Share className="h-4 w-4 mr-2" />
            Copy Shareable Link
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

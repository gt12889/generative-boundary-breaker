
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";
import { Comparison, platforms } from "./data";

interface DemoDialogProps {
  activeComparison: Comparison;
}

const DemoDialog = ({ activeComparison }: DemoDialogProps) => {
  return (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>AI Platform Comparison Demo</DialogTitle>
        <DialogDescription>
          Interactive demo of AI platform features and capabilities
        </DialogDescription>
      </DialogHeader>
      <div className="py-6">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeComparison.platforms.map((platformIndex) => (
              <div key={platforms[platformIndex].id} className="border p-6 rounded-lg bg-gray-50">
                <div className="text-3xl mb-4">{platforms[platformIndex].icon}</div>
                <h3 className="text-xl font-bold mb-2">{platforms[platformIndex].name}</h3>
                <p className="text-gray-600 mb-4">{platforms[platformIndex].tagline}</p>
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Key Features:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {platforms[platformIndex].keyFeatures.slice(0, 3).map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <a 
                  href={platforms[platformIndex].link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-rose-600 hover:text-rose-800 flex items-center gap-1"
                >
                  Visit website <ExternalLink size={14} />
                </a>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-rose-50 rounded-lg">
            <p className="text-center text-gray-700">
              This is an interactive demo of our comparison tool. In a real implementation,
              you would be able to explore detailed features, pricing, and customer reviews.
            </p>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default DemoDialog;

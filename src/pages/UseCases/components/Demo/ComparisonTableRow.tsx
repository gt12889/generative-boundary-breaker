
import { TableCell, TableRow } from "@/components/ui/table";
import { Platform } from "./types";
import React from "react";

interface ComparisonTableRowProps {
  label: string;
  platforms: Platform[];
  renderCell?: (platform: Platform) => React.ReactNode;
  metric?: string;
}

const ComparisonTableRow = ({ label, platforms, renderCell, metric }: ComparisonTableRowProps) => {
  // If there's a metric provided and no custom renderCell, use the default metric display
  const defaultRenderCell = (platform: Platform) => {
    if (!metric) return null;
    
    const score = platform.scores[metric as keyof typeof platform.scores];
    return (
      <div className="flex items-center">
        <span className="font-medium">{score}/100</span>
        <div className="w-full h-2 bg-gray-200 rounded-full ml-2">
          <div 
            className="h-2 bg-blue-600 rounded-full" 
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const cellRenderer = renderCell || defaultRenderCell;

  return (
    <TableRow>
      <TableCell className="p-4 border font-medium">{label}</TableCell>
      {platforms.map((platform) => (
        <TableCell 
          key={`${label.toLowerCase().replace(/\s/g, '-')}-${platform.id}`} 
          className="p-4 border"
        >
          {cellRenderer(platform)}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default ComparisonTableRow;

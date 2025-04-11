
import { TableCell, TableRow } from "@/components/ui/table";
import { Comparison, Platform, platforms } from "./data";
import React from "react";

interface ComparisonTableRowProps {
  label: string;
  renderCell: (platform: Platform) => React.ReactNode;
  activeComparison: Comparison;
}

const ComparisonTableRow = ({ label, renderCell, activeComparison }: ComparisonTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="p-4 border font-medium">{label}</TableCell>
      {activeComparison.platforms.map((platformIndex) => (
        <TableCell 
          key={`${label.toLowerCase().replace(/\s/g, '-')}-${platforms[platformIndex].id}`} 
          className="p-4 border"
        >
          {renderCell(platforms[platformIndex])}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default ComparisonTableRow;

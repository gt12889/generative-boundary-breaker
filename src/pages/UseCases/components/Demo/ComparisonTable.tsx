
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "lucide-react";
import { Comparison, platforms } from "./data";
import ComparisonTableRow from "./ComparisonTableRow";

interface ComparisonTableProps {
  activeComparison: Comparison;
}

const ComparisonTable = ({ activeComparison }: ComparisonTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table className="border-collapse w-full">
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-left p-4 font-semibold text-gray-700 w-1/6">Overview</TableHead>
            {activeComparison.platforms.map((platformIndex) => (
              <TableHead key={platforms[platformIndex].id} className="text-left p-4 font-semibold text-gray-700">
                {platforms[platformIndex].name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <ComparisonTableRow 
            label="Icon" 
            renderCell={(platform) => <span className="text-3xl">{platform.icon}</span>}
            activeComparison={activeComparison}
          />
          <ComparisonTableRow 
            label="Name" 
            renderCell={(platform) => <span className="font-medium">{platform.name}</span>}
            activeComparison={activeComparison}
          />
          <ComparisonTableRow 
            label="Link" 
            renderCell={(platform) => (
              <a href={platform.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline text-blue-600">
                {platform.link.replace('https://', '')}
                <Link size={14} />
              </a>
            )}
            activeComparison={activeComparison}
          />
          <ComparisonTableRow 
            label="Tagline" 
            renderCell={(platform) => platform.tagline}
            activeComparison={activeComparison}
          />
          <ComparisonTableRow 
            label="Description" 
            renderCell={(platform) => platform.description}
            activeComparison={activeComparison}
          />
        </TableBody>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-left p-4 font-semibold text-gray-700">Product</TableHead>
            {activeComparison.platforms.map((platformIndex) => (
              <TableHead key={`product-${platforms[platformIndex].id}`} className="text-left p-4 font-semibold text-gray-700">
                {platforms[platformIndex].name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <ComparisonTableRow 
            label="Name" 
            renderCell={(platform) => platform.name}
            activeComparison={activeComparison}
          />
          <ComparisonTableRow 
            label="Link" 
            renderCell={(platform) => (
              <a href={platform.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline text-blue-600">
                {platform.link.replace('https://', '')}
                <Link size={14} />
              </a>
            )}
            activeComparison={activeComparison}
          />
          <ComparisonTableRow 
            label="Use Cases" 
            renderCell={(platform) => (
              <ul className="list-disc pl-5 space-y-1">
                {platform.useCases.map((useCase, i) => (
                  <li key={i}>{useCase}</li>
                ))}
              </ul>
            )}
            activeComparison={activeComparison}
          />
          <ComparisonTableRow 
            label="Key Features" 
            renderCell={(platform) => (
              <ul className="list-disc pl-5 space-y-1">
                {platform.keyFeatures.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            )}
            activeComparison={activeComparison}
          />
        </TableBody>
      </Table>
    </div>
  );
};

export default ComparisonTable;

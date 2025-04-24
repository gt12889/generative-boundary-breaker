import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "lucide-react";
import { Comparison, platforms } from "./data";
import ComparisonTableRow from "./ComparisonTableRow";
import ComparisonRadar from "./ComparisonRadar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import RoleFilter, { UserRole } from "./RoleFilter";

interface ComparisonTableProps {
  activeComparison: Comparison;
}

const ComparisonTable = ({ activeComparison }: ComparisonTableProps) => {
  const [showAiSummary, setShowAiSummary] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>("all");
  const activePlatforms = activeComparison.platforms.map(index => platforms[index]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <RoleFilter selectedRole={selectedRole} onRoleChange={setSelectedRole} />
        <Button
          variant="outline"
          onClick={() => setShowAiSummary(!showAiSummary)}
        >
          {showAiSummary ? "Hide AI Summary" : "Show AI Summary"}
        </Button>
      </div>

      {showAiSummary && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">🧠 AI Summary</h3>
          <p className="text-blue-800">{activeComparison.aiSummary}</p>
        </div>
      )}

      <ComparisonRadar platforms={activePlatforms} />

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
            <ComparisonTableRow 
              label="Role-Specific Use Cases" 
              renderCell={(platform) => (
                <ul className="list-disc pl-5 space-y-1">
                  {selectedRole === "all" 
                    ? platform.useCases.map((useCase, i) => (
                        <li key={i}>{useCase}</li>
                      ))
                    : platform.roleSpecificUseCase[selectedRole].map((useCase, i) => (
                        <li key={i}>{useCase}</li>
                      ))
                  }
                </ul>
              )}
              activeComparison={activeComparison}
            />
            <ComparisonTableRow 
              label="Key Strengths" 
              renderCell={(platform) => (
                <ul className="list-disc pl-5 space-y-1">
                  {selectedRole === "all"
                    ? platform.keyFeatures.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))
                    : platform.roleSpecificStrengths[selectedRole].map((strength, i) => (
                        <li key={i}>{strength}</li>
                      ))
                  }
                </ul>
              )}
              activeComparison={activeComparison}
            />
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ComparisonTable;

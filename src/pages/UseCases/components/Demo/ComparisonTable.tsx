
import React from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Comparison, Platform, UserRole } from "./types";
import { platforms } from "./data";
import ComparisonRadar from "./ComparisonRadar";
import ComparisonTableRow from "./ComparisonTableRow";
import ComparisonSources from "./ComparisonSources";

interface ComparisonTableProps {
  activeComparison: Comparison;
  selectedRole?: UserRole;
}

const ComparisonTable = ({ activeComparison, selectedRole = "all" }: ComparisonTableProps) => {
  // Get platform indices from the comparison
  const platformIndices = activeComparison?.platforms || [];
  
  // Safely map the indices to actual platform data, filtering out any undefined platforms
  const comparisonPlatforms = platformIndices
    .map(index => platforms[index])
    .filter((platform): platform is Platform => platform !== undefined);
  
  // Early return if we don't have valid platforms to compare
  if (comparisonPlatforms.length === 0) {
    return (
      <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg text-center">
        <p className="text-amber-800">Platform data not available for this comparison.</p>
      </div>
    );
  }
  
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {comparisonPlatforms.map((platform) => (
          <div key={platform.id} className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{platform.icon}</span>
                  <h3 className="text-xl font-semibold">{platform.name}</h3>
                </div>
                <p className="text-gray-600 italic mt-1">{platform.tagline}</p>
              </div>
              <a 
                href={platform.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                Visit site
              </a>
            </div>
            
            <p className="text-gray-700 mb-4">{platform.description}</p>
            
            <h4 className="font-medium mb-2">Key Features:</h4>
            <ul className="mb-4 space-y-1">
              {platform.keyFeatures.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Role specific content */}
            {selectedRole !== "all" && platform.roleSpecificUseCase && platform.roleSpecificStrengths && (
              <>
                <h4 className="font-medium mb-2">Perfect For:</h4>
                <ul className="mb-4 space-y-1">
                  {platform.roleSpecificUseCase[selectedRole]?.map((useCase, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{useCase}</span>
                    </li>
                  )) || <li>No specific use cases available</li>}
                </ul>
                
                <h4 className="font-medium mb-2">Strengths for {selectedRole === 'data-scientist' ? 'Data Scientists' : selectedRole === 'enterprise' ? 'Enterprise' : 'Startups'}:</h4>
                <div className="flex flex-wrap gap-2">
                  {platform.roleSpecificStrengths[selectedRole]?.map((strength, i) => (
                    <Badge key={i} variant="outline" className="bg-blue-50">
                      {strength}
                    </Badge>
                  )) || <span className="text-gray-500">No specific strengths available</span>}
                </div>
              </>
            )}

            {/* Universal use cases */}
            {selectedRole === "all" && (
              <>
                <h4 className="font-medium mb-2">Common Use Cases:</h4>
                <div className="flex flex-wrap gap-2">
                  {platform.useCases.map((useCase, i) => (
                    <Badge key={i} variant="outline" className="bg-gray-50">
                      {useCase}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      
      {comparisonPlatforms.length >= 2 && (
        <div className="bg-gray-50 rounded-lg border p-6 mb-8">
          <h3 className="text-xl font-semibold mb-6">Performance Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    {comparisonPlatforms.map((platform) => (
                      <TableHead key={platform.id}>{platform.name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <ComparisonTableRow 
                    label="User Experience" 
                    metric="ux" 
                    platforms={comparisonPlatforms}
                  />
                  <ComparisonTableRow 
                    label="Scalability" 
                    metric="scalability" 
                    platforms={comparisonPlatforms}
                  />
                  <ComparisonTableRow 
                    label="Ecosystem" 
                    metric="ecosystem" 
                    platforms={comparisonPlatforms}
                  />
                  <ComparisonTableRow 
                    label="Cost Efficiency" 
                    metric="cost" 
                    platforms={comparisonPlatforms}
                  />
                  <ComparisonTableRow 
                    label="AI Support" 
                    metric="aiSupport" 
                    platforms={comparisonPlatforms}
                  />
                </TableBody>
              </Table>
            </div>
            <div>
              <ComparisonRadar platforms={comparisonPlatforms} />
            </div>
          </div>
        </div>
      )}
      
      <ComparisonSources />
    </div>
  );
};

export default ComparisonTable;

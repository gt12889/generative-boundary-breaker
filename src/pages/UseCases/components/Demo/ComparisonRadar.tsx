
import React from "react";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend,
  ResponsiveContainer 
} from "recharts";
import { Platform } from "./data";

interface ComparisonRadarProps {
  platforms: Platform[];
}

const ComparisonRadar = ({ platforms }: ComparisonRadarProps) => {
  const dimensions = [
    { key: "ux", name: "User Experience" },
    { key: "scalability", name: "Scalability" },
    { key: "cost", name: "Cost Effectiveness" },
    { key: "ecosystem", name: "Ecosystem" },
    { key: "aiSupport", name: "AI Support" }
  ];

  const data = dimensions.map(dim => ({
    dimension: dim.name,
    [platforms[0].name]: platforms[0].scores[dim.key],
    [platforms[1].name]: platforms[1].scores[dim.key],
  }));

  return (
    <div className="w-full h-[400px] mt-6">
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="dimension" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name={platforms[0].name}
            dataKey={platforms[0].name}
            stroke="#2563eb"
            fill="#2563eb"
            fillOpacity={0.3}
          />
          <Radar
            name={platforms[1].name}
            dataKey={platforms[1].name}
            stroke="#dc2626"
            fill="#dc2626"
            fillOpacity={0.3}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonRadar;

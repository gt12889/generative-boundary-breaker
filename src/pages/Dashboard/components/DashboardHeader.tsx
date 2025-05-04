
import React from 'react';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

const DashboardHeader = ({ title, subtitle }: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
    </div>
  );
};

export default DashboardHeader;

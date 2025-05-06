
import React from 'react';

interface ProductSourceInfoProps {
  trafficSource: {
    name: string;
    url: string;
    description: string;
  };
}

const ProductSourceInfo = ({ trafficSource }: ProductSourceInfoProps) => {
  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm">
      <h4 className="font-medium text-gray-800">Data Source: {trafficSource.name}</h4>
      <p className="text-gray-600 mt-1">{trafficSource.description}</p>
    </div>
  );
};

export default ProductSourceInfo;

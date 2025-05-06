
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useProductData } from './hooks/useProductData';

interface ProductComparisonChartProps {
  productData: Record<string, Array<{ date: string; interest: number }>>;
  displayedProducts: string[];
}

const ProductComparisonChart = ({ productData, displayedProducts }: ProductComparisonChartProps) => {
  const { getCombinedData, getProductColor } = useProductData(productData);
  const combinedData = getCombinedData(displayedProducts);

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={combinedData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 border shadow rounded">
                    <p className="font-medium">{label}</p>
                    {payload.map((entry, index) => (
                      <p key={index} style={{ color: entry.color }}>
                        {entry.name}: {entry.value}
                      </p>
                    ))}
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          {displayedProducts.map(product => (
            <Line 
              key={product}
              type="monotone" 
              dataKey={product} 
              name={product} 
              stroke={getProductColor(product)} 
              strokeWidth={2} 
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductComparisonChart;

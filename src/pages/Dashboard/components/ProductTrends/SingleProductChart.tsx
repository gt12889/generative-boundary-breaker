
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { productColors } from '../../data/usageData';
import { useProductData } from './hooks/useProductData';

interface SingleProductChartProps {
  productData: Record<string, Array<{ date: string; interest: number }>>;
  selectedProduct: string;
}

const SingleProductChart = ({ productData, selectedProduct }: SingleProductChartProps) => {
  const { getProductData, getProductColor } = useProductData(productData);
  
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={getProductData(selectedProduct)}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 border shadow rounded">
                    <p className="font-medium">{label}</p>
                    <p style={{ color: getProductColor(selectedProduct) }}>
                      {selectedProduct}: {payload[0].value}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="interest" 
            name={selectedProduct} 
            stroke={getProductColor(selectedProduct)} 
            strokeWidth={2} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SingleProductChart;

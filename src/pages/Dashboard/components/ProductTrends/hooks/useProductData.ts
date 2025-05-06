
import { productColors } from '../../../data/usageData';

export const useProductData = (productData: Record<string, Array<{ date: string; interest: number }>>) => {
  // Get color for a product
  const getProductColor = (productName: string) => {
    return productColors[productName as keyof typeof productColors] || productColors.default;
  };
  
  // Generate mock data for custom products if they don't exist in productData
  const getProductData = (productName: string) => {
    if (productName in productData) {
      return productData[productName];
    }
    
    // Generate random data for custom products
    return [
      { date: 'Jan', interest: Math.floor(Math.random() * 50) + 30 },
      { date: 'Feb', interest: Math.floor(Math.random() * 50) + 30 },
      { date: 'Mar', interest: Math.floor(Math.random() * 50) + 30 },
      { date: 'Apr', interest: Math.floor(Math.random() * 50) + 30 },
      { date: 'May', interest: Math.floor(Math.random() * 50) + 30 },
      { date: 'Jun', interest: Math.floor(Math.random() * 50) + 30 },
    ];
  };

  // Combine data for comparison chart
  const getCombinedData = (displayedProducts: string[]) => {
    const result: Record<string, any>[] = [];
    
    if (!Object.keys(productData).length || !displayedProducts.length) {
      return result;
    }
    
    const dates = productData[Object.keys(productData)[0]].map(item => item.date);
    
    dates.forEach(date => {
      const dataPoint: Record<string, any> = { date };
      
      displayedProducts.forEach(product => {
        const productItems = getProductData(product);
        const item = productItems.find(i => i.date === date);
        if (item) {
          dataPoint[product] = item.interest;
        }
      });
      
      result.push(dataPoint);
    });
    
    return result;
  };

  return {
    getProductColor,
    getProductData,
    getCombinedData
  };
};

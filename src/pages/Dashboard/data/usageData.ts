
// Simulated data that would come from Google Trends API
export const usageData = [
  { date: 'Jan', visitors: 120, comparisons: 85, webTraffic: 156 },
  { date: 'Feb', visitors: 170, comparisons: 130, webTraffic: 202 },
  { date: 'Mar', visitors: 210, comparisons: 180, webTraffic: 245 },
  { date: 'Apr', visitors: 235, comparisons: 205, webTraffic: 278 },
  { date: 'May', visitors: 280, comparisons: 250, webTraffic: 310 },
  { date: 'Jun', visitors: 310, comparisons: 275, webTraffic: 345 },
];

export const trafficSource = {
  name: "Google Trends",
  url: "https://trends.google.com/trends/",
  description: "Data represents relative search interest for selected company/product"
};

// Sample product trend data
export const productTrendData = {
  "iPhone": [
    { date: 'Jan', interest: 85 },
    { date: 'Feb', interest: 90 },
    { date: 'Mar', interest: 88 },
    { date: 'Apr', interest: 95 },
    { date: 'May', interest: 120 },
    { date: 'Jun', interest: 115 },
  ],
  "Samsung Galaxy": [
    { date: 'Jan', interest: 75 },
    { date: 'Feb', interest: 78 },
    { date: 'Mar', interest: 82 },
    { date: 'Apr', interest: 80 },
    { date: 'May', interest: 85 },
    { date: 'Jun', interest: 95 },
  ],
  "Google Pixel": [
    { date: 'Jan', interest: 45 },
    { date: 'Feb', interest: 48 },
    { date: 'Mar', interest: 50 },
    { date: 'Apr', interest: 65 },
    { date: 'May', interest: 70 },
    { date: 'Jun', interest: 75 },
  ],
  "OnePlus": [
    { date: 'Jan', interest: 30 },
    { date: 'Feb', interest: 35 },
    { date: 'Mar', interest: 38 },
    { date: 'Apr', interest: 45 },
    { date: 'May', interest: 48 },
    { date: 'Jun', interest: 52 },
  ]
};

// Colors for different products to maintain consistency
export const productColors = {
  "iPhone": "#3b82f6", // blue
  "Samsung Galaxy": "#8b5cf6", // violet
  "Google Pixel": "#10b981", // green
  "OnePlus": "#f59e0b", // amber
  "default": "#6b7280", // gray
};

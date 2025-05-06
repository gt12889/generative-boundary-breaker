
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

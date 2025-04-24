
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowRight, Check, Star, Users, Zap, Building, CircleDollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const navigate = useNavigate();
  
  const discount = 20; // 20% discount for annual billing
  
  const calculatePrice = (basePrice: number) => {
    if (billingPeriod === "annual") {
      const discountedPrice = basePrice * (1 - discount / 100) * 12;
      return Math.floor(discountedPrice / 12);
    }
    return basePrice;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-16">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-gray-900 md:text-5xl">
            Choose the right plan for your business
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get AI-powered market insights tailored to your needs
          </p>
          
          {/* Billing toggle */}
          <div className="flex items-center justify-center mb-8 space-x-4">
            <span className={`text-sm font-medium ${billingPeriod === "monthly" ? "text-gray-900" : "text-gray-500"}`}>
              Monthly billing
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={billingPeriod === "annual"}
                onChange={() => setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
            </label>
            <span className={`text-sm font-medium ${billingPeriod === "annual" ? "text-gray-900" : "text-gray-500"}`}>
              Annual billing 
              <Badge variant="outline" className="ml-2 bg-rose-100 text-rose-800 border-rose-200">
                Save {discount}%
              </Badge>
            </span>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {/* Starter Plan */}
          <Card className="border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center mb-2">
                <Zap className="h-5 w-5 text-rose-500 mr-2" />
                <CardTitle>Starter</CardTitle>
              </div>
              <CardDescription>Perfect for individual researchers</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">${calculatePrice(14)}</span>
                <span className="text-gray-500 ml-2">per month</span>
              </div>
              {billingPeriod === "annual" && (
                <p className="text-sm text-rose-600 mt-1">
                  Billed as ${calculatePrice(14) * 12} annually
                </p>
              )}
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Generate up to 5 market reports per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Compare up to 3 competitors per report</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Basic market trend insights</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Export to PDF</span>
                </li>
                <li className="flex items-start text-gray-500">
                  <Check className="h-5 w-5 text-gray-300 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Advanced AI recommendations</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-rose-600 hover:bg-rose-700" onClick={() => navigate("/auth")}>
                Get Started
              </Button>
            </CardFooter>
          </Card>
          
          {/* Professional Plan */}
          <Card className="border-rose-200 shadow-xl relative z-10 scale-105 bg-white">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <Badge className="bg-rose-600 text-white px-3 py-1 rounded-full">MOST POPULAR</Badge>
            </div>
            <CardHeader>
              <div className="flex items-center mb-2">
                <Star className="h-5 w-5 text-rose-500 mr-2" />
                <CardTitle>Professional</CardTitle>
              </div>
              <CardDescription>Ideal for businesses and teams</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">${calculatePrice(29)}</span>
                <span className="text-gray-500 ml-2">per month</span>
              </div>
              {billingPeriod === "annual" && (
                <p className="text-sm text-rose-600 mt-1">
                  Billed as ${calculatePrice(29) * 12} annually
                </p>
              )}
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Generate up to 15 market reports per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Compare up to 8 competitors per report</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Advanced market trend insights</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Export to PDF and Excel</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Advanced AI recommendations</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Team sharing and collaboration</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-rose-600 hover:bg-rose-700" onClick={() => navigate("/auth")}>
                Get Started
              </Button>
            </CardFooter>
          </Card>
          
          {/* Enterprise Plan */}
          <Card className="border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center mb-2">
                <Building className="h-5 w-5 text-rose-500 mr-2" />
                <CardTitle>Enterprise</CardTitle>
              </div>
              <CardDescription>For large organizations and agencies</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">${calculatePrice(79)}</span>
                <span className="text-gray-500 ml-2">per month</span>
              </div>
              {billingPeriod === "annual" && (
                <p className="text-sm text-rose-600 mt-1">
                  Billed as ${calculatePrice(79) * 12} annually
                </p>
              )}
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Unlimited market reports</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Compare up to 20 competitors per report</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Premium market trend insights and forecasting</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Export to all formats with white-labeling</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Advanced AI strategy recommendations</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Enterprise-grade support and training</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-rose-600 hover:bg-rose-700" onClick={() => navigate("/auth")}>
                Get Started
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Features */}
        <div className="mt-24 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Market Insights Powered by AI</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg">
              <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Analysis</h3>
              <p className="text-gray-600">Get comprehensive market analyses in minutes, not days</p>
            </div>
            
            <div className="text-center p-6 rounded-lg">
              <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Competitor Tracking</h3>
              <p className="text-gray-600">Monitor your competitors' strategies and market positions</p>
            </div>
            
            <div className="text-center p-6 rounded-lg">
              <div className="bg-rose-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <CircleDollarSign className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">ROI Maximizer</h3>
              <p className="text-gray-600">Identify profitable opportunities and optimize your market strategy</p>
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by Industry Leaders</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <p className="text-gray-700 mb-4">"This platform revolutionized our market research process. We saved weeks of manual work and gained insights we would have missed otherwise."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium">Tommy Nguyen</p>
                  <p className="text-gray-500 text-sm">Marketing Director, TechCorp</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <p className="text-gray-700 mb-4">"The AI-driven insights helped us identify an untapped market segment that now represents 30% of our revenue. Game-changing tool!"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium">Tuan</p>
                  <p className="text-gray-500 text-sm">CEO, GrowthServe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I switch plans later?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">What industries does your tool support?</h3>
              <p className="text-gray-600">Our AI market analysis works across all industries including technology, healthcare, finance, retail, education, and more.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">How accurate is the AI-generated data?</h3>
              <p className="text-gray-600">Our AI provides highly accurate insights based on publicly available information, with regular updates to ensure relevance.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Do you offer custom enterprise solutions?</h3>
              <p className="text-gray-600">Yes, we offer tailored solutions for large organizations with specific needs. Contact our sales team for details.</p>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-24 bg-rose-50 p-12 rounded-2xl max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your market research?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of businesses making data-driven decisions with our AI platform</p>
          <Button 
            size="lg" 
            className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-6 rounded-full text-lg"
            onClick={() => navigate("/auth")}
          >
            Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-gray-500 mt-4">No credit card required. 14-day free trial on all plans.</p>
        </div>
        
      </div>
    </div>
  );
};

export default PricingPage;

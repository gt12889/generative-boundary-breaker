
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DemoSection from "./UseCases/components/DemoSection";

const UseCases = () => {
  const navigate = useNavigate();

  const useCaseData = [
    {
      id: 1,
      title: "Natural Language Processing",
      description: "Transform text into actionable insights. Our AI models can summarize documents, extract key information, and analyze sentiment across multiple languages.",
      category: "Text Analysis",
      examples: [
        "Content summarization for news articles",
        "Legal document analysis and contract review",
        "Customer feedback sentiment analysis"
      ]
    },
    {
      id: 2,
      title: "Computer Vision Solutions",
      description: "Identify objects, faces, and patterns in images and video streams with high accuracy. Perfect for security, retail analytics, and quality control.",
      category: "Image & Video",
      examples: [
        "Automated quality inspection in manufacturing",
        "Retail footfall and customer movement analysis",
        "Security surveillance with anomaly detection"
      ]
    },
    {
      id: 3,
      title: "Conversational AI",
      description: "Create engaging chatbots and virtual assistants that understand context and provide helpful responses to your customers around the clock.",
      category: "Customer Service",
      examples: [
        "24/7 customer support automation",
        "Personalized product recommendations",
        "Appointment scheduling and reminders"
      ]
    },
    {
      id: 4,
      title: "Predictive Analytics",
      description: "Forecast trends, identify patterns, and make data-driven decisions with our powerful predictive models that learn from your historical data.",
      category: "Business Intelligence",
      examples: [
        "Sales forecasting and inventory optimization",
        "Customer churn prediction and prevention",
        "Predictive maintenance for industrial equipment"
      ]
    },
    {
      id: 5,
      title: "Custom AI Development",
      description: "Work with our team to develop tailored AI solutions that address your unique business challenges and integrate seamlessly with your existing workflows.",
      category: "Enterprise Solutions",
      examples: [
        "Industry-specific recommendation engines",
        "Custom data processing pipelines",
        "Specialized decision support systems"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          Back to Home
        </Button>

        <div className="text-center mb-16">
          <span className="text-rose-600 font-medium tracking-wider text-sm uppercase animate-fade-in">
            Use Cases
          </span>
          <h1 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            How Our AI Powers Your Business
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the versatile applications of our AI technology across different industries
            and business functions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCaseData.map((useCase, index) => (
            <Card 
              key={useCase.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="bg-gradient-to-r from-rose-100 to-rose-50 pb-4">
                <div className="flex justify-between items-start">
                  <Badge className="bg-rose-600 hover:bg-rose-700">{useCase.category}</Badge>
                </div>
                <CardTitle className="text-xl mt-2">{useCase.title}</CardTitle>
                <CardDescription className="text-gray-700">
                  {useCase.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <h3 className="font-medium text-gray-900 mb-3">Example Applications:</h3>
                <ul className="space-y-2">
                  {useCase.examples.map((example, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-rose-600 mr-2">•</span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-20 mb-20">
          <DemoSection />
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to explore how our AI can transform your business?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-6 rounded-full"
              onClick={() => navigate("/prompt")}
            >
              Try Our AI Demo
            </Button>
            <Button 
              variant="outline" 
              className="px-6 py-6 rounded-full border-rose-300 text-rose-700 hover:bg-rose-50"
              onClick={() => navigate("/about")}
            >
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCases;

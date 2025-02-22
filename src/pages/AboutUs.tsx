
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white p-8">
      <Button
        variant="outline"
        onClick={() => navigate("/")}
        className="mb-8"
      >
        Back to Home
      </Button>
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="text-center mb-12">
            <span className="text-rose-600 font-medium tracking-wider text-sm uppercase">
              About Us
            </span>
            <h1 className="mt-6 text-4xl font-bold text-gray-900">
              Welcome to GenAI Ventures
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700">
              At GenAI Ventures, we specialize in cutting-edge Generative AI solutions tailored for business analysis and data-driven decision-making. Our expertise spans from data management and hybrid computing to AI-powered system design and integration, ensuring organizations can harness the full potential of artificial intelligence.
            </p>

            <div className="my-12">
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src="/lovable-uploads/9cbc8bf2-90cd-4f0e-9e4c-4f583012bc0e.png"
                alt="Digital transformation visualization"
                className="w-full rounded-xl shadow-lg mb-8"
              />
            </div>

            <hr className="my-4 border-gray-300" />

            <p className="text-gray-700">
              Our data infrastructure solutions include creating robust data warehouses, accumulating and staging data from open-source AI models and enterprise resources. By leveraging cloud computing and on-premise hardware, we deliver seamless hybrid computing environments optimized for performance, security, and scalability.
            </p>

  <hr className="my-4 border-gray-300" />
            <p className="text-gray-700">
              We prioritize infrastructure reliability by implementing HVAC-regulated storage to maintain optimal conditions for hardware and ensuring the smooth integration of third-party software and AI models. Our team handles everything from licensing acquisition to system validation, so your AI solutions run efficiently and effectively.
            </p>

            <div className="my-12">
              <motion.img
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                src="/lovable-uploads/6548cb94-1500-453d-8641-bc4ee2f240b0.png"
                alt="Data analysis and search concept"
                className="w-full rounded-xl shadow-lg mb-8"
              />
            </div>

            <hr className="my-4 border-gray-300" />
            <p className="text-gray-700">
              At GenAI Ventures, we believe in delivering end-to-end solutions, from prototype development and rigorous testing to stakeholder presentations and final project documentation. Our commitment extends beyond implementation—we provide expert recommendations to help businesses future-proof their AI investments.
            </p>

            <hr className="my-4 border-gray-300" />
            <p className="text-gray-700 font-medium">
              Partner with GenAI Ventures to transform your AI-driven business strategy and unlock new levels of innovation and efficiency.
            </p>
          </div>

          <div className="flex justify-center mt-12">
            <Button
              onClick={() => navigate("/prompt")}
              className="px-8 py-3 rounded-full bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors"
            >
              Get Started
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;

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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h1 className="text-4xl font-bold text-gray-800">
            About Us
          </h1>
          <p className="text-lg text-gray-700">
            At GenAI Ventures, we're building the future of business intelligence through the power of generative AI. Our platform transforms how companies analyze data, make decisions, and accelerate growth by combining cutting-edge machine learning with intuitive design.
          </p>
          <p className="text-lg text-gray-700">
            From startups to enterprise clients, we enable organizations to tap into data-driven strategies with ease — optimizing operations, reducing inefficiencies, and driving long-term innovation. Our solutions are tailored, scalable, and secure, leveraging the best of cloud-native tools and industry-standard frameworks.
          </p>
          <p className="text-lg text-gray-700">
            With a focus on creativity, collaboration, and compliance, GenAI Ventures is more than a platform — it's your strategic partner in the era of intelligent automation.
          </p>

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

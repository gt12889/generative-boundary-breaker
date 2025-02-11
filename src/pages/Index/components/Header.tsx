
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <span className="text-rose-600 font-medium tracking-wider text-sm uppercase">
        Welcome to GenAI Ventures
      </span>
      <h1 className="mt-6 text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
        <span className="text-reveal">
          <span>Breaking Boundaries</span>
        </span>
        <br />
        <span className="text-reveal" style={{ animationDelay: "0.1s" }}>
          <span>with AI Solutions</span>
        </span>
      </h1>
      <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
        Enabling unprecedented success through innovative AI solutions that tackle
        your most challenging problems.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <Button 
          onClick={() => navigate("/prompt")}
          className="px-8 py-3 rounded-full bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors"
        >
          Get Started
        </Button>
        <Button
          variant="outline" 
          className="px-8 py-3 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Learn More
        </Button>
      </div>
    </motion.div>
  );
};

export default Header;


import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto">
      <div className="max-w-4xl mx-auto text-center animate-on-scroll">
        <span className="text-rose-600 font-medium tracking-wider text-sm uppercase">
          Get Started
        </span>
        <h2 className="mt-6 text-4xl font-bold text-gray-900">
          Ready to Transform Your Future?
        </h2>
        <p className="mt-6 text-xl text-gray-600">
          Contact us today to discover how our AI solutions can help you achieve
          unprecedented success.
        </p>
        <Button
          onClick={() => navigate("/prompt")}
          className="mt-10 px-8 py-3 rounded-full bg-rose-600 text-white font-medium hover:bg-rose-700 transition-colors"
        >
          Contact Us
        </Button>
      </div>
    </div>
  );
};

export default GetStarted;

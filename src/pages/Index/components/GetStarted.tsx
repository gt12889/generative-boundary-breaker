
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto">
      <div className="max-w-3xl mx-auto text-center animate-on-scroll">
        <h2 className="text-3xl font-bold mb-6 md:text-4xl">
          Ready to experience the power of AI?
        </h2>
        <p className="text-xl text-gray-600 mb-10">
          Get started today and see how our platform can transform your workflow.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-6 rounded-full"
            onClick={() => navigate("/prompt")}
          >
            Try Our AI Demo
          </Button>
          <Button 
            variant="outline" 
            className="px-6 py-6 rounded-full border-rose-300 text-rose-600 hover:bg-rose-50"
            onClick={() => navigate("/use-cases")}
          >
            Explore Use Cases
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;

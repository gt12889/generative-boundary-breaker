
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // This is a simple search implementation that just navigates to the home page
      // In a real app, you might want to navigate to a search results page
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 to-white p-4">
      <div className="text-center max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-rose-100">
        <div className="w-20 h-20 bg-rose-50 rounded-full mx-auto mb-6 flex items-center justify-center">
          <span className="text-4xl font-bold text-rose-400">404</span>
        </div>
        
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Page not found</h1>
        <p className="text-gray-600 mb-6">
          We couldn't find the page you were looking for.
          It might have been moved or deleted.
        </p>
        
        <div className="flex flex-col space-y-4">
          <Button 
            variant="default" 
            className="w-full bg-rose-600 hover:bg-rose-700"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="relative">
            <form onSubmit={handleSearch} className="flex w-full items-center">
              <Input
                type="text"
                placeholder="Search for content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Button 
                type="submit"
                variant="outline"
                size="icon"
                className="absolute right-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

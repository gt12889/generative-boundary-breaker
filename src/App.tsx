
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import PromptPage from "./pages/PromptPage";
import AboutUs from "./pages/AboutUs";
import UseCases from "./pages/UseCases";
import ProductStructure from "./pages/ProductStructure";
import PricingPage from "./pages/PricingPage";
import CompareCompanies from "./pages/CompareCompanies";
import CompareProducts from "./pages/CompareProducts";
import ProductAnalysis from "./pages/ProductAnalysis";
import Dashboard from "./pages/Dashboard";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  }
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

// Define App as a function component to properly use React hooks
const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prompt"
                element={
                  <ProtectedRoute>
                    <PromptPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <ProtectedRoute>
                    <AboutUs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/use-cases"
                element={
                  <ProtectedRoute>
                    <UseCases />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/product-structure"
                element={
                  <ProtectedRoute>
                    <ProductStructure />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pricing"
                element={
                  <ProtectedRoute>
                    <PricingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/compare/companies"
                element={
                  <ProtectedRoute>
                    <CompareCompanies />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/compare/products"
                element={
                  <ProtectedRoute>
                    <CompareProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/product-analysis"
                element={
                  <ProtectedRoute>
                    <ProductAnalysis />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;

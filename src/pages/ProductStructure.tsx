
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

type Task = {
  task_id: number;
  name: string;
  description: string | null;
  priority_level: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Completed";
  assigned_to: string | null;
  due_date: string | null;
};

type Subcategory = {
  subcategory_id: number;
  name: string;
  description: string | null;
  tasks: Task[];
};

type Category = {
  category_id: number;
  name: string;
  description: string | null;
  subcategories: Subcategory[];
};

type Product = {
  product_id: number;
  name: string;
  description: string | null;
  categories: Category[];
};

const ProductStructure = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Fetch product info
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .limit(1);
        
        if (productError) throw productError;
        if (!productData || productData.length === 0) throw new Error("No product found");
        
        const productId = productData[0].product_id;
        
        // Fetch categories for this product
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .eq('product_id', productId);
        
        if (categoriesError) throw categoriesError;
        
        // Build the product with categories
        const productWithCategories = {
          ...productData[0],
          categories: await Promise.all(categoriesData.map(async (category) => {
            // Fetch subcategories for each category
            const { data: subcategoriesData, error: subcategoriesError } = await supabase
              .from('subcategories')
              .select('*')
              .eq('category_id', category.category_id);
            
            if (subcategoriesError) throw subcategoriesError;
            
            // Get tasks for each subcategory
            const subcategoriesWithTasks = await Promise.all(subcategoriesData.map(async (subcategory) => {
              const { data: tasksData, error: tasksError } = await supabase
                .from('tasks')
                .select('*')
                .eq('subcategory_id', subcategory.subcategory_id);
              
              if (tasksError) throw tasksError;
              
              return {
                ...subcategory,
                tasks: tasksData || []
              };
            }));
            
            return {
              ...category,
              subcategories: subcategoriesWithTasks
            };
          }))
        };
        
        setProduct(productWithCategories);
      } catch (error) {
        console.error("Error fetching product data:", error);
        toast({
          title: "Error loading data",
          description: "Could not load product structure data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [toast]);

  // Helper function to get badge color based on priority
  const getPriorityColor = (priority: "Low" | "Medium" | "High") => {
    switch (priority) {
      case "Low": return "bg-blue-500 hover:bg-blue-600";
      case "Medium": return "bg-amber-500 hover:bg-amber-600";
      case "High": return "bg-rose-600 hover:bg-rose-700";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  // Helper function to get badge color based on status
  const getStatusColor = (status: "Pending" | "In Progress" | "Completed") => {
    switch (status) {
      case "Pending": return "bg-gray-500 hover:bg-gray-600";
      case "In Progress": return "bg-amber-500 hover:bg-amber-600";
      case "Completed": return "bg-green-600 hover:bg-green-700";
      default: return "bg-gray-500 hover:bg-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white p-8 flex items-center justify-center">
        <div className="text-2xl text-gray-700">Loading product structure...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white p-8">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          Back to Home
        </Button>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">No Product Found</h1>
          <p className="mt-4 text-xl text-gray-600">Please add a product to view the structure.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white p-4 md:p-8">
      <Button
        variant="outline"
        onClick={() => navigate("/")}
        className="mb-8"
      >
        Back to Home
      </Button>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-rose-600 font-medium tracking-wider text-sm uppercase animate-fade-in">
            Product Structure
          </span>
          <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
            {product.name}
          </h1>
          {product.description && (
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {product.description}
            </p>
          )}
        </div>

        <div className="space-y-12">
          {product.categories.map((category) => (
            <div key={category.category_id} className="bg-white rounded-xl shadow-md p-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-4 mb-6">
                {category.name}
              </h2>
              {category.description && (
                <p className="mb-6 text-gray-700">{category.description}</p>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.subcategories.map((subcategory) => (
                  <Card key={subcategory.subcategory_id} className="h-full">
                    <CardHeader className="bg-gradient-to-r from-rose-50 to-white">
                      <CardTitle>{subcategory.name}</CardTitle>
                      {subcategory.description && (
                        <CardDescription className="text-gray-700">
                          {subcategory.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-medium text-sm text-gray-500 uppercase tracking-wide mb-3">
                        Tasks
                      </h4>
                      <ul className="space-y-4">
                        {subcategory.tasks.length > 0 ? (
                          subcategory.tasks.map((task) => (
                            <li key={task.task_id} className="border-b pb-3">
                              <div className="flex justify-between mb-2">
                                <span className="font-medium">{task.name}</span>
                                <Badge className={getStatusColor(task.status)}>
                                  {task.status}
                                </Badge>
                              </div>
                              {task.description && (
                                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                              )}
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge className={getPriorityColor(task.priority_level)}>
                                  {task.priority_level} Priority
                                </Badge>
                                {task.assigned_to && (
                                  <Badge variant="outline">
                                    {task.assigned_to}
                                  </Badge>
                                )}
                                {task.due_date && (
                                  <Badge variant="outline" className="border-gray-400">
                                    Due: {new Date(task.due_date).toLocaleDateString()}
                                  </Badge>
                                )}
                              </div>
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500 italic">No tasks assigned</li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductStructure;

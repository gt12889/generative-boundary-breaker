
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Briefcase, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const DemoNavigation = () => {
  const location = useLocation();
  const isCompanyPage = location.pathname.includes('/compare/companies');
  const isProductPage = location.pathname.includes('/compare/products');
  
  return (
    <div className="mb-8 flex justify-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/compare/companies">
              <NavigationMenuLink 
                className={cn(
                  navigationMenuTriggerStyle(),
                  "flex items-center gap-2",
                  isCompanyPage && "bg-accent/50"
                )}
              >
                <Briefcase size={18} />
                Company Analysis
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/compare/products">
              <NavigationMenuLink 
                className={cn(
                  navigationMenuTriggerStyle(),
                  "flex items-center gap-2",
                  isProductPage && "bg-accent/50"
                )}
              >
                <Package size={18} />
                Product Analysis
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DemoNavigation;

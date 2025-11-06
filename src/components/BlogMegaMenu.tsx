'use client'

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface CategoryGroup {
  name: string;
  subcategories?: string[];
}

const mainCategoryGroups: CategoryGroup[] = [
  { 
    name: "Accounting & Finance", 
    subcategories: ["Accounting Firms", "Financial Planning", "Tax Services", "Finance Brokers", "Liquidators"] 
  },
  { 
    name: "Building & Construction", 
    subcategories: ["Home Builders", "Renovation Builders", "Real Estate", "Buyers Agents"] 
  },
  { 
    name: "Digital Marketing", 
    subcategories: ["Google Ads", "SEO", "Social Media", "Lead Generation", "Growth Marketing", "Digital Strategy"] 
  },
  { name: "Fractional CMO" },
  { 
    name: "IT", 
    subcategories: ["Cyber Security", "SaaS", "Consulting", "Networking"] 
  },
  { 
    name: "Legal", 
    subcategories: ["Conveyancing", "Family Law", "Divorce Law", "Criminal Law"] 
  },
  { 
    name: "NDIS", 
    subcategories: ["SaaS", "Disability Service", "Therapy Service", "Participant Engagement", "Business Growth"] 
  },
  { 
    name: "Trade/Tradies", 
    subcategories: ["Removalists", "Mechanics", "Security", "Painters", "Bricklayers", "Floor Sanding Specialists"] 
  }
];



interface BlogMegaMenuProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  className?: string;
}

const BlogMegaMenu = ({ selectedCategory, onCategorySelect, className }: BlogMegaMenuProps) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (groupName: string) => {
    if (!isMobile && mainCategoryGroups.find(g => g.name === groupName)?.subcategories) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setActiveDropdown(groupName);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setActiveDropdown(null);
      }, 300);
    }
  };

  const handleCategoryClick = (category: string, hasSubcategories: boolean) => {
    // Map display names back to filter names
    const filterCategory = category === "Trade/Tradies" ? "Tradies" : category;
    
    if (hasSubcategories) {
      // Toggle dropdown for categories with subcategories (both mobile and desktop)
      setActiveDropdown(activeDropdown === category ? null : category);
    } else {
      // Select category for categories without subcategories
      onCategorySelect(filterCategory);
      setActiveDropdown(null);
      setIsMobileMenuOpen(false);
    }
  };

  const handleSubcategoryClick = (mainCategory: string, subcategory: string) => {
    // Map display names back to filter names
    const filterMainCategory = mainCategory === "Trade/Tradies" ? "Tradies" : mainCategory;
    const categoryKey = `${filterMainCategory} - ${subcategory}`;
    onCategorySelect(categoryKey);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  if (isMobile) {
    return (
      <div className={cn("relative", className)} ref={dropdownRef}>
        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full justify-between"
        >
          <span>Categories</span>
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 z-[60] mt-2  rounded-lg shadow-lg max-h-96 overflow-y-auto ">
            <div className="p-2 space-y-1 bg-white">
              {mainCategoryGroups.map((group) => (
                <div key={group.name}>
                  <Button
                    variant={(selectedCategory === group.name || (group.name === "Trade/Tradies" && selectedCategory === "Tradies")) ? "default" : "ghost"}
                    onClick={() => handleCategoryClick(group.name, !!group.subcategories)}
                    className={cn(
                      "w-full justify-between text-left",
                      (selectedCategory === group.name || (group.name === "Trade/Tradies" && selectedCategory === "Tradies")) && "bg-primary text-primary-foreground"
                    )}
                  >
                    <span>{group.name}</span>
                    {group.subcategories && (
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform",
                        activeDropdown === group.name && "rotate-180"
                      )} />
                    )}
                  </Button>
                  
                  {group.subcategories && activeDropdown === group.name && (
                    <div className="ml-4 mt-1 space-y-1">
                      {group.subcategories.map((subcategory) => {
                        const categoryKey = `${group.name} - ${subcategory}`;
                        return (
                          <Button
                            key={subcategory}
                            variant={selectedCategory === categoryKey ? "default" : "ghost"}
                            onClick={() => handleSubcategoryClick(group.name, subcategory)}
                            className={cn(
                              "w-full justify-start text-left text-sm",
                              selectedCategory === categoryKey && "bg-white text-primary-foreground"
                            )}
                          >
                            
                            {subcategory}
                          </Button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop Mega Menu
  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div className="flex flex-wrap items-center gap-1 bg-gray-100 border-1 border-gray-200   rounded-lg p-2">
        {mainCategoryGroups.map((group) => (
          <div
            key={group.name}
            className="relative bg-gray-100 cursor-pointer"
            onMouseEnter={() => handleMouseEnter(group.name)}
            onMouseLeave={handleMouseLeave}
          >
            <Button
              variant={(selectedCategory === group.name || (group.name === "Trade/Tradies" && selectedCategory === "Tradies") || 
                       selectedCategory.startsWith(`${group.name === "Trade/Tradies" ? "Tradies" : group.name} - `)) ? "default" : "ghost"}
              onClick={() => handleCategoryClick(group.name, !!group.subcategories)}
              className={cn(
                "relative cursor-pointer",
                (selectedCategory === group.name || (group.name === "Trade/Tradies" && selectedCategory === "Tradies")) && "bg-primary text-primary-foreground",
                selectedCategory.startsWith(`${group.name === "Trade/Tradies" ? "Tradies" : group.name} - `) && "bg-primary/10 text-primary "
              )}
            >
              {group.name}
              {group.subcategories && (
                <ChevronDown className="ml-1 h-3 w-3 " />
              )}
            </Button>

            {/* Desktop Dropdown */}  
            {group.subcategories && activeDropdown === group.name && (
              <div 
                className="absolute top-full left-0 z-60 mt-1  rounded-lg bg-white shadow-lg p-2 min-w-48 cursor-pointer "
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                }}
                onMouseLeave={handleMouseLeave}
              >
                <div className="space-y-1 ">
                  {group.subcategories.map((subcategory) => {
                    const categoryKey = `${group.name} - ${subcategory}`;
                    return (
                      <Button
                        key={subcategory}
                        onClick={() => handleSubcategoryClick(group.name, subcategory)}
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-left text-sm py-2 h-auto",
                          selectedCategory === categoryKey ? "text-black font-medium" : "text-gray-600 hover:text-black",
                        )}
                      >
                        <span className="flex items-center">
                          {subcategory}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogMegaMenu;
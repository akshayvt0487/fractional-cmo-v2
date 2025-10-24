import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategoryGroup {
  name: string;
  subcategories?: string[];
}

const categoryGroups: CategoryGroup[] = [
  { name: "All" },
  { name: "Fractional CMO" },
  { 
    name: "NDIS", 
    subcategories: ["SaaS", "Disability Service", "Therapy Service", "Participant Engagement", "Business Growth"] 
  },
  { 
    name: "Building & Construction", 
    subcategories: ["Home Builders", "Renovation Builders", "Real Estate", "Buyers Agents"] 
  },
  { 
    name: "Trade/Tradies", 
    subcategories: ["Removalists", "Mechanics", "Security", "Painters", "Bricklayers", "Floor Sanding Specialists"] 
  },
  { 
    name: "Accounting & Finance", 
    subcategories: ["Accounting Firms", "Financial Planning", "Tax Services", "Finance Brokers"] 
  },
  { 
    name: "Digital Marketing", 
    subcategories: ["Google Ads", "SEO", "Social Media", "Lead Generation", "Growth Marketing", "Digital Strategy"] 
  },
  { 
    name: "IT", 
    subcategories: ["Cyber Security", "SaaS", "Consulting", "Networking"] 
  },
  { 
    name: "Legal", 
    subcategories: ["Conveyancing", "Family Law", "Divorce Law", "Criminal Law"] 
  }
];

interface BlogSidebarProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  className?: string;
}

const BlogSidebar = ({ selectedCategory, onCategorySelect, className }: BlogSidebarProps) => {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["NDIS", "Accounting & Finance", "Digital Marketing", "IT", "Legal", "Trade/Tradies", "Building & Construction"]);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupName) 
        ? prev.filter(name => name !== groupName)
        : [...prev, groupName]
    );
  };

  const isGroupExpanded = (groupName: string) => expandedGroups.includes(groupName);

  const handleCategoryClick = (category: string) => {
    // Map display names back to filter names
    const filterCategory = category === "Trade/Tradies" ? "Tradies" : category;
    onCategorySelect(filterCategory);
  };

  const handleSubcategoryClick = (mainCategory: string, subcategory: string) => {
    // Map display names back to filter names
    const filterMainCategory = mainCategory === "Trade/Tradies" ? "Tradies" : mainCategory;
    const categoryKey = `${filterMainCategory} - ${subcategory}`;
    onCategorySelect(categoryKey);
  };

  return (
    <div className={cn("w-64 bg-card rounded-lg border p-4", className)}>
      <h3 className="font-semibold text-lg mb-4">Categories</h3>
      <div className="space-y-1">
        {categoryGroups.map((group) => (
          <div key={group.name}>
            <div className="flex items-center justify-between">
              <Button
                variant={selectedCategory === group.name || (group.name === "Trade/Tradies" && selectedCategory === "Tradies") ? "default" : "ghost"}
                size="sm"
                onClick={() => handleCategoryClick(group.name)}
                className={cn(
                  "flex-1 justify-start text-left",
                  (selectedCategory === group.name || (group.name === "Trade/Tradies" && selectedCategory === "Tradies")) && "bg-primary text-primary-foreground"
                )}
              >
                {group.name}
              </Button>
              
              {group.subcategories && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleGroup(group.name)}
                  className="p-1 h-auto"
                >
                  {isGroupExpanded(group.name) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
            
            {group.subcategories && isGroupExpanded(group.name) && (
              <div className="ml-4 mt-1 space-y-1">
                {group.subcategories.map((subcategory) => {
                  const categoryKey = `${group.name} - ${subcategory}`;
                  return (
                    <Button
                      key={subcategory}
                      variant={selectedCategory === categoryKey ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handleSubcategoryClick(group.name, subcategory)}
                      className={cn(
                        "w-full justify-start text-left text-sm",
                        selectedCategory === categoryKey && "bg-primary text-primary-foreground"
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
  );
};

export default BlogSidebar;
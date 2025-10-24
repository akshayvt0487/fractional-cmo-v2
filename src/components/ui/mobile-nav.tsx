import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = usePathname();

  const handleSectionClick = (sectionId: string) => {
    setIsOpen(false);
    if (location.pathname === '/') {
      // If on homepage, scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to allow sheet to close
    } else {
      // If on other pages, navigate to homepage with hash
      window.location.href = `/#${sectionId}`;
    }
  };

  const navItems = [
    { id: "capabilities", label: "Capabilities", type: "section" },
    { id: "services", label: "Engagements", type: "section" },
    { id: "process", label: "Process", type: "section" },
    { href: "/blog", label: "Blog", type: "link" },
    { href: "/contact", label: "Contact", type: "link" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="bg-white/10 border border-white/20 backdrop-blur text-white hover:bg-white/20"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] bg-slate-900 border-slate-800">
        <div className="flex flex-col h-full pt-8">
          <div className="flex items-center justify-between mb-8">
            <div className="text-white font-medium">Menu</div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => {
              if (item.type === "section") {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSectionClick(item.id!)}
                    className="text-left text-white/80 hover:text-white py-3 px-2 text-lg font-medium border-b border-white/10 hover:border-white/30 transition-colors"
                  >
                    {item.label}
                  </button>
                );
              }
              // Internal routes use Link component
              return (
                <Link
                  key={item.href}
                  to={item.href!}
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white py-3 px-2 text-lg font-medium border-b border-white/10 hover:border-white/30 transition-colors"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-auto pt-8 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="text-white/60 text-sm">
                <div className="font-medium">Basheer Padanna</div>
                <div>Fractional CMO</div>
              </div>
              <a
                href="https://LinkedIn.com/in/basheerpadanna"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedInIcon size={20} />
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const pathname = usePathname();

  const servicesList = [
    { name: "Digital Growth Strategy", slug: "digital-growth-strategy", hasIndustryPages: false },
    { name: "Digital Marketing", slug: "digital-marketing", hasIndustryPages: true },
    { name: "Google Ads", slug: "google-ads", hasIndustryPages: true },
    { name: "SEO Services", slug: "seo-services", industrySlug: "seo", hasIndustryPages: true },
    { name: "Lead Generation", slug: "lead-generation", hasIndustryPages: true },
    { name: "Social Media Marketing", slug: "social-media-marketing", hasIndustryPages: false },
    { name: "Email Marketing", slug: "email-marketing", hasIndustryPages: false },
  ];

  const industries = [
    { name: "NDIS Providers", slug: "ndis-providers" },
    { name: "Builders", slug: "builders" },
    { name: "Painters", slug: "painters" },
    { name: "Electricians", slug: "electricians" },
    { name: "Plumbers", slug: "plumbers" },
    { name: "Removalists", slug: "removalists" },
    { name: "Accountants", slug: "accountants" },
    { name: "Lawyers", slug: "lawyers" },
    { name: "Finance Brokers", slug: "finance-brokers" },
    { name: "Buyers Agents", slug: "buyers-agents" },
  ];

  const [expandedService, setExpandedService] = useState<string | null>(null);

  const navItems = [
    { id: "capabilities", label: "Capabilities", type: "section" },
    { id: "servicesSection", label: "Engagements", type: "section" },
    { id: "servicesMenu", label: "Services", type: "servicesMenu" },
    { id: "process", label: "Process", type: "section" },
    { href: "/blog", label: "Blog", type: "link" },
    { href: "/contact", label: "Contact", type: "link" },
  ];

  const handleSectionClick = (sectionId: string) => {
    setIsOpen(false);
    if (pathname === "/") {
      // If on homepage, scroll to section after sheet closes
      // Use classic function form to avoid parser issues
      setTimeout(function () {
        var element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // Navigate to homepage with hash
      window.location.href = `/#${sectionId}`;
    }
  };

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
              if (item.type === "servicesMenu") {
                return (
                  <div key={item.id ?? item.label} className="border-b border-white/10">
                    <button
                      onClick={() => setShowServicesMenu((s) => !s)}
                      className="w-full text-left text-white/80 hover:text-white py-3 px-2 text-lg font-medium flex items-center justify-between transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`h-4 w-4 text-white/40 transition-transform ${showServicesMenu ? 'rotate-180' : ''}`} />
                    </button>

                    {showServicesMenu && (
                      <div className="pl-4 pb-2">

                        {servicesList.map((s) => (
                          <div key={s.slug} className="mb-1">
                            {s.hasIndustryPages ? (
                              <>
                                <button
                                  onClick={() => setExpandedService(expandedService === s.slug ? null : s.slug)}
                                  className="w-full text-left text-white/80 hover:text-white py-2 px-2 text-base font-medium flex items-center justify-between transition-colors"
                                >
                                  <span>{s.name}</span>
                                  <ChevronRight className={`h-4 w-4 text-white/40 transition-transform ${expandedService === s.slug ? 'rotate-90' : ''}`} />
                                </button>

                                {expandedService === s.slug && (
                                  <div className="pl-4 pt-1">
                                    <Link
                                      href={`/services/${s.slug}`}
                                      onClick={() => { setIsOpen(false); setShowServicesMenu(false); setExpandedService(null); }}
                                      className="block text-cyan-400 text-sm py-1"
                                    >
                                      View {s.name} overview →
                                    </Link>

                                    <div className="grid grid-cols-2 gap-1 pt-1">
                                      {industries.map((ind) => {
                                        const serviceSlug = (s as any).industrySlug || s.slug;
                                        return (
                                          <Link
                                            key={`${s.slug}-${ind.slug}`}
                                            href={`/services/${serviceSlug}/${ind.slug}`}
                                            onClick={() => { setIsOpen(false); setShowServicesMenu(false); setExpandedService(null); }}
                                            className="px-2 py-1 text-xs text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors"
                                          >
                                            {ind.name}
                                          </Link>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              <Link
                                href={`/services/${s.slug}`}
                                onClick={() => { setIsOpen(false); setShowServicesMenu(false); }}
                                className="block text-white/80 hover:text-white py-2 px-2 text-base font-medium transition-colors"
                              >
                                {s.name}
                              </Link>
                            )}
                          </div>
                        ))}

                        <Link
                          href="/services"
                          onClick={() => {
                            setIsOpen(false);
                            setShowServicesMenu(false);
                          }}
                          className="block text-cyan-400 hover:text-white py-2 px-2 text-sm font-medium mt-2"
                        >
                          View all services →
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

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

              return (
                <Link
                  key={item.href ?? item.id ?? item.label}
                  href={item.href ?? "/"}
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
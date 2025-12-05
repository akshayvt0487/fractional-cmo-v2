"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const industries = [
  { name: "NDIS Providers", slug: "ndis-providers" },
  { name: "Builders", slug: "builders" },
  { name: "Painters", slug: "painters" },
  { name: "Electricians", slug: "electricians" },
  { name: "Plumbers", slug: "plumbers" },
  { name: "Removalists", slug: "removalists" },
  { name: "Bricklayers", slug: "bricklayers" },
  { name: "Floor Sanding", slug: "floor-sanding" },
  { name: "Accountants", slug: "accountants" },
  { name: "Lawyers", slug: "lawyers" },
  { name: "Finance Brokers", slug: "finance-brokers" },
  { name: "Buyers Agents", slug: "buyers-agents" },
];

const servicesWithIndustryPages = [
  { name: "Digital Growth Strategy", slug: "digital-growth-strategy", hasIndustryPages: false },
  { name: "Digital Marketing", slug: "digital-marketing", hasIndustryPages: true },
  { name: "Google Ads", slug: "google-ads", hasIndustryPages: true },
  { name: "SEO Services", slug: "seo-services", industrySlug: "seo", hasIndustryPages: true },
  { name: "Lead Generation", slug: "lead-generation", hasIndustryPages: true },
  { name: "Social Media Marketing", slug: "social-media-marketing", hasIndustryPages: false },
  { name: "Email Marketing", slug: "email-marketing", hasIndustryPages: false },
];

interface ServicesMegaMenuProps {
  className?: string;
}

const ServicesMegaMenu = ({ className }: ServicesMegaMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHoveredService(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setHoveredService(null);
    }, 150);
  };

  const getIndustryLink = (industrySlug: string) => {
    if (!hoveredService) {
      return `/services/digital-marketing/${industrySlug}`;
    }
    const service = servicesWithIndustryPages.find(s => s.slug === hoveredService);
    if (service?.hasIndustryPages) {
      let serviceSlug = (service as any).industrySlug || service.slug;
      // Fix for SEO Services: always use 'seo-services' for industry pages
      if (serviceSlug === 'seo') serviceSlug = 'seo-services';
      return `/services/${serviceSlug}/${industrySlug}`;
    }
    return `/services/digital-marketing/${industrySlug}`;
  };

  const getIndustryHeading = () => {
    if (!hoveredService) return "By Industry";
    const service = servicesWithIndustryPages.find(s => s.slug === hoveredService);
    if (service?.hasIndustryPages) return `${service.name} For`;
    return "By Industry";
  };

  const activeService = servicesWithIndustryPages.find(s => s.slug === hoveredService);

  return (
    <div
      ref={menuRef}
      className={cn("relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        Services
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute -left-4 top-full pt-2 z-50">
          <div className="bg-slate-900 border border-white/10 rounded-lg shadow-xl min-w-[580px] overflow-hidden">
            <div className="flex">
              <div className="w-56 bg-slate-800/50 p-4 border-r border-white/10">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Main Services</p>
                <div className="space-y-1">
                  {servicesWithIndustryPages.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md transition-colors",
                        hoveredService === service.slug
                          ? "bg-white/10 text-cyan-400"
                          : "text-white/80 hover:bg-white/5 hover:text-white"
                      )}
                      onClick={() => setIsOpen(false)}
                      onMouseEnter={() => setHoveredService(service.slug)}
                    >
                      {service.name}
                      {service.hasIndustryPages && <span className="text-white/40 text-xs ml-1">→</span>}
                    </Link>
                  ))}
                </div>

                <div className="border-t border-white/10 mt-4 pt-4">
                  <Link
                    href="/services"
                    className="block px-3 py-2 text-sm font-medium text-cyan-400 hover:bg-white/10 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    View All Services →
                  </Link>
                </div>
              </div>

              <div className="flex-1 p-4">
                <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">{getIndustryHeading()}</p>
                {activeService?.hasIndustryPages || !hoveredService ? (
                  <div className="grid grid-cols-2 gap-1">
                    {industries.map((industry) => (
                      <Link
                        key={industry.slug}
                        href={getIndustryLink(industry.slug)}
                        className="px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {industry.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-white/50 text-sm">
                    <p className="text-center">This service doesn't have<br/>industry-specific pages yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesMegaMenu;

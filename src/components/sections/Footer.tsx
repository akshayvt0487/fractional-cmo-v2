import LinkedInIcon from "@/components/icons/LinkedInIcon";
import Link from "next/link";
import GHLWidget from "@/components/widgets/GHLWidget";

const Footer = () => (
  <footer className="border-t border-border py-8 md:py-12 text-sm w-full flex justify-center max-w-[1400px] mx-auto bg-background">
    <div className="container px-4 md:px-6 flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <div>
            <div className="font-semibold text-sm md:text-base text-foreground">Basheer Padanna</div>
            <div className="text-muted-foreground text-xs md:text-sm">Fractional CMO</div>
          </div>
          <a
            href="https://LinkedIn.com/in/basheerpadanna"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-[#333E50] transition-colors duration-200"
            aria-label="LinkedIn Profile"
          >
            <LinkedInIcon size={18} className="md:w-5 md:h-5" />
          </a>
        </div>
        <nav className="flex flex-wrap gap-3 md:gap-5 text-muted-foreground text-xs md:text-sm font-medium">
          <Link href="/#capabilities" className="hover:text-[#333E50] transition-colors duration-200">Capabilities</Link>
          <Link href="/#services" className="hover:text-[#333E50] transition-colors duration-200">Engagements</Link>
          <Link href="/#process" className="hover:text-[#333E50] transition-colors duration-200">Process</Link>
          <Link href="/blog" className="hover:text-[#333E50] transition-colors duration-200">Blog</Link>
          <Link href="/contact" className="hover:text-[#333E50] transition-colors duration-200">Contact</Link>
        </nav>
      </div>

      {/* Main Services Section */}
      <div className="pt-4 md:pt-6 border-t border-border">
        <div className="mb-4">
          <h3 className="font-semibold text-xs md:text-sm mb-3 text-foreground">Our Services</h3>
          <nav className="flex flex-wrap gap-3 md:gap-5 text-muted-foreground text-xs md:text-sm">
            <Link href="/services/google-ads" className="hover:text-[#333E50] transition-colors duration-200">Google Ads</Link>
            <Link href="/services/seo" className="hover:text-[#333E50] transition-colors duration-200">SEO</Link>
            <Link href="/services/lead-generation" className="hover:text-[#333E50] transition-colors duration-200">Lead Generation</Link>
            <Link href="/services/digital-marketing" className="hover:text-[#333E50] transition-colors duration-200">Digital Marketing</Link>
            <Link href="/services/social-media-marketing" className="hover:text-[#333E50] transition-colors duration-200">Social Media</Link>
            <Link href="/services/email-marketing" className="hover:text-[#333E50] transition-colors duration-200">Email Marketing</Link>
            <Link href="/services/digital-growth-strategy" className="hover:text-[#333E50] transition-colors duration-200">Growth Strategy</Link>
          </nav>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 md:flex-row pt-4 md:pt-6 border-t border-border text-xs text-muted-foreground">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-3 md:gap-4">
            <Link href="/privacy-policy" className="hover:text-[#333E50] transition-colors duration-200">Privacy Policy</Link>
            <Link href="/terms-conditions" className="hover:text-[#333E50] transition-colors duration-200">Terms & Conditions</Link>
            <Link href="/sitemap" className="hover:text-[#333E50] transition-colors duration-200">Sitemap</Link>
          </div>
          <div className="text-xs text-muted-foreground/80">
            © {new Date().getFullYear()} Basheer Padanna. All rights reserved.
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <p className="font-medium text-foreground">Suite 611, Level 6</p>
          <p>150 George Street, Parramatta NSW 2150</p>
        </div>
      </div>
    </div>
    <GHLWidget />
  </footer>
);

export default Footer;

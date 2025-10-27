import LinkedInIcon from "@/components/icons/LinkedInIcon";
import  Link  from "next/link";

const Footer = () => (
  <footer className="border-t border-border py-8 md:py-12 text-sm w-full flex justify-center ">
    <div className="container px-4 md:px-6 flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <div>
            <div className="font-medium text-sm md:text-base">Basheer Padanna</div>
            <div className="text-muted-foreground text-xs md:text-sm">Fractional CMO</div>
          </div>
          <a
            href="https://LinkedIn.com/in/basheerpadanna"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedInIcon size={18} className="md:w-5 md:h-5" />
          </a>
        </div>
        <nav className="flex flex-wrap gap-3 md:gap-4 text-muted-foreground text-xs md:text-sm">
          <a href="#capabilities" className="hover:text-foreground transition-colors">Capabilities</a>
          <a href="#services" className="hover:text-foreground transition-colors">Engagements</a>
          <a href="#process" className="hover:text-foreground transition-colors">Process</a>
          <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
        </nav>
      </div>
      
      <div className="flex flex-col gap-2 pt-4 md:pt-6 border-t border-border text-xs text-muted-foreground">
        <div className="flex flex-wrap gap-3 md:gap-4">
          <Link href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          <Link href="/terms-conditions" className="hover:text-foreground transition-colors">Terms & Conditions</Link>
          <Link href="/sitemap" className="hover:text-foreground transition-colors">Sitemap</Link>
        </div>
        <div className="text-xs">
          © {new Date().getFullYear()} Basheer Padanna. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

'use client'
import Hero from "../../src/components/sections/Hero";
import Capabilities from "../../src/components/sections/Capabilities";
import Services from "../../src/components/sections/Services";
import Process from "../../src/components/sections/Process";
import About from "../../src/components/sections/About";

import BlogSection from "../../src/components/sections/BlogSection";
import CTA from "../../src/components/sections/CTA";
import FractionalCMO from "../../src/components/sections/FractionalCMO";
//import { usePublishIndexing } from "@/hooks/useAutoIndexing";

const Index = () => {
  // Automatically ping search engines when site is published
  //usePublishIndexing();
  
  
  return (
    <>
     
      <a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
      <Hero />
      <main id="main" className="max-w-[1400px] p-[2rem] mx-auto">
        <FractionalCMO />
       <About/>
        <Capabilities />
        <Services />
        <Process />
        
        <BlogSection />
        <CTA />
      </main>
     
    </>
  );
};

export default Index;


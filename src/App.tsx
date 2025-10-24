
'use client'
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/AuthContext";

import "./index.css";
import PerformanceMonitor from "@/components/PerformanceMonitor";


// Lazy load components for better performance
const Index = lazy(() => import("../app/pages/Index"));
const Blog = lazy(() => import("../app/pages/Blog"));
const About = lazy(() => import("../app/about/page"));
const Contact = lazy(() => import("../app/contact/page"));
const ThankYou = lazy(() => import("../app/pages/ThankYou"));
const PrivacyPolicy = lazy(() => import("../app/pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("../app/pages/TermsConditions"));
const NotFound = lazy(() => import("../app/pages/NotFound"));
const NotReady = lazy(() => import("../app/pages/NotReady"));
const Sitemap = lazy(() => import("../app/pages/Sitemap"));
const SitemapView = lazy(() => import("../app/pages/SitemapView"));
const Admin = lazy(() => import("../app/admin/page"));
const AdminLogin = lazy(() => import("../app/pages/AdminLogin"));
const AdminAuth = lazy(() => import("../app/admin-auth/page"));
const AdminResetPassword = lazy(() => import("../app/pages/AdminResetPassword"));

// Admin sub-pages
const AdminDashboard = lazy(() => import("../app/admin/dashboard/page").then(m => ({ default: m.Dashboard })));
const AdminContent = lazy(() => import("../app/admin/content/page").then(m => ({ default: m.Content })));
const AdminBlogPosts = lazy(() => import("../app/blog/page").then(m => ({ default: m.BlogPosts })));
const AdminSubmissions = lazy(() => import("../app/admin/submissions/page").then(m => ({ default: m.Submissions })));
const AdminAnalytics = lazy(() => import("../app/analytics/page").then(m => ({ default: m.Analytics })));
const AdminSettings = lazy(() => import("../app/admin/settings/page").then(m => ({ default: m.Settings })));

// Blog post lazy imports
const B2BLeadGeneration = lazy(() => import("../app/pages/blog/B2BLeadGeneration"));
const LocalSearchRanking = lazy(() => import("../app/pages/blog/LocalSearchRanking"));
const RemovalistDigitalMarketing = lazy(() => import("../app/pages/blog/RemovalistDigitalMarketing"));
const RemovalistSEOStrategy = lazy(() => import("../app/pages/blog/RemovalistSEOStrategy"));
const WhatIsFractionalCMO = lazy(() => import("../app/pages/blog/WhatIsFractionalCMO"));
const NDISBusinessGrowthStrategy = lazy(() => import("../app/pages/blog/NDISBusinessGrowthStrategy"));
const ConstructionLeadGeneration = lazy(() => import("../app/pages/blog/ConstructionLeadGeneration"));
const LocalSEOTrade = lazy(() => import("../app/pages/blog/LocalSEOTrade"));
const GoogleAdsService = lazy(() => import("../app/pages/blog/GoogleAdsService"));
const FractionalCMOVsFullTime = lazy(() => import("../app/pages/blog/FractionalCMOVsFullTime"));
const AdvancedNDISLeadGeneration = lazy(() => import("../app/pages/blog/AdvancedNDISLeadGeneration"));
const WhenToHireFractionalCMO = lazy(() => import("../app/pages/blog/WhenToHireFractionalCMO"));
const NDISParticipantEngagement = lazy(() => import("../app/pages/blog/NDISParticipantEngagement"));
const ConstructionMarketingBestPractices = lazy(() => import("../app/pages/blog/ConstructionMarketingBestPractices"));
const CarInspectionMarketing = lazy(() => import("../app/pages/blog/CarInspectionMarketing"));
const NDISLeadGeneration = lazy(() => import("../app/pages/blog/NDISLeadGeneration"));
const DigitalMarketingAutomation = lazy(() => import("../app/pages/blog/DigitalMarketingAutomation"));
const NDISWebDesign = lazy(() => import("../app/pages/blog/NDISWebDesign"));
const TradeCustomerRetention = lazy(() => import("../app/pages/blog/TradeCustomerRetention"));
const DigitalMarketingROI = lazy(() => import("../app/pages/blog/DigitalMarketingROI"));
const ConstructionCostEstimation = lazy(() => import("../app/pages/blog/ConstructionCostEstimation"));
const TradeBusinessGrowth = lazy(() => import("../app/pages/blog/TradeBusinessGrowth"));
const NDISMarketingGuide = lazy(() => import("../app/pages/blog/NDISMarketingGuide"));
const PrePurchaseCarInspection = lazy(() => import("../app/pages/blog/PrePurchaseCarInspection"));
const StartingRemovalistBusiness = lazy(() => import("../app/pages/blog/StartingRemovalistBusiness"));
const RemovalistBusinessMarketing = lazy(() => import("../app/pages/blog/RemovalistBusinessMarketing"));
const RemovalistMetaAdsStrategy = lazy(() => import("../app/pages/blog/RemovalistMetaAdsStrategy"));
const NDISDigitalMarketing = lazy(() => import("../app/pages/blog/NDISDigitalMarketing"));
const NDISDigitalMarketingExcellence = lazy(() => import("../app/pages/blog/NDISDigitalMarketingExcellence"));
const NDISSoftwareSaaSMarketing = lazy(() => import("../app/pages/blog/NDISSoftwareSaaSMarketing"));
const NDISSoftwareSaaSPositioning = lazy(() => import("../app/pages/blog/NDISSoftwareSaaSPositioning"));
const NDISSoftwareSaaSLeadGeneration = lazy(() => import("../app/pages/blog/NDISSoftwareSaaSLeadGeneration"));
const CyberSecurityGrowthHacking = lazy(() => import("../app/pages/blog/CyberSecurityGrowthHacking"));
const CyberSecurityGoogleAds = lazy(() => import("../app/pages/blog/CyberSecurityGoogleAds"));
const CyberSecuritySEOAustralia = lazy(() => import("../app/pages/blog/CyberSecuritySEOAustralia"));
const CyberSecurityDigitalMarketing = lazy(() => import("../app/pages/blog/CyberSecurityDigitalMarketing"));
const ConveyancingLeadGeneration = lazy(() => import("../app/pages/blog/ConveyancingLeadGeneration"));
const ConveyancingGoogleAds = lazy(() => import("../app/pages/blog/ConveyancingGoogleAds"));
const ConveyancingSEO = lazy(() => import("../app/pages/blog/ConveyancingSEO"));
const ConveyancingSocialMedia = lazy(() => import("../app/pages/blog/ConveyancingSocialMedia"));
const ConveyancingDigitalMarketingROI = lazy(() => import("../app/pages/blog/ConveyancingDigitalMarketingROI"));
const TherapyServicesDigitalMarketing = lazy(() => import("../app/pages/blog/TherapyServicesDigitalMarketing"));
const TherapyGoogleAdsStrategy = lazy(() => import("../app/pages/blog/TherapyGoogleAdsStrategy"));
const TherapyGrowthMarketingStrategy = lazy(() => import("../app/pages/blog/TherapyGrowthMarketingStrategy"));
const AccountingDigitalMarketing = lazy(() => import("../app/pages/blog/AccountingDigitalMarketing"));
const FinancialPlannerLeadGeneration = lazy(() => import("../app/pages/blog/FinancialPlannerLeadGeneration"));
const TaxAdvisorGoogleAds = lazy(() => import("../app/pages/blog/TaxAdvisorGoogleAds"));
const FinancialPlannerSEO = lazy(() => import("../app/pages/blog/FinancialPlannerSEO"));
const AccountingGrowthStrategy = lazy(() => import("../app/pages/blog/AccountingGrowthStrategy"));
const LoanBrokerDigitalMarketing = lazy(() => import("../app/pages/blog/LoanBrokerDigitalMarketing"));
const LoanBrokerLeadGeneration = lazy(() => import("../app/pages/blog/LoanBrokerLeadGeneration"));
const LoanBrokerGoogleAds = lazy(() => import("../app/pages/blog/LoanBrokerGoogleAds"));
const SecurityDigitalMarketing = lazy(() => import("../app/pages/blog/SecurityDigitalMarketing"));
const SecurityLeadGeneration = lazy(() => import("../app/pages/blog/SecurityLeadGeneration"));
const SecurityGoogleAdsStrategy = lazy(() => import("../app/pages/blog/SecurityGoogleAdsStrategy"));
const SocialMediaMarketingStrategy = lazy(() => import("../app/pages/blog/SocialMediaMarketingStrategy"));
const GrowthMarketingStrategy = lazy(() => import("../app/pages/blog/GrowthMarketingStrategy"));
const DigitalStrategyModernBusiness = lazy(() => import("../app/pages/blog/DigitalStrategyModernBusiness"));
const SaaSMarketingITSector = lazy(() => import("../app/pages/blog/SaaSMarketingITSector"));
const NDISDisabilityServiceMarketing = lazy(() => import("../app/pages/blog/NDISDisabilityServiceMarketing"));
const PaintersDigitalMarketing = lazy(() => import("../app/pages/blog/PaintersDigitalMarketing"));
const PaintersLeadGeneration = lazy(() => import("../app/pages/blog/PaintersLeadGeneration"));
const MechanicDigitalMarketing = lazy(() => import("../app/pages/blog/MechanicDigitalMarketing"));
const HomeBuildersLeadGeneration = lazy(() => import("../app/pages/blog/HomeBuildersLeadGeneration"));
const RenovationBuildersDigitalMarketing = lazy(() => import("../app/pages/blog/RenovationBuildersDigitalMarketing"));
const RealEstateSEOMarketing = lazy(() => import("../app/pages/blog/RealEstateSEOMarketing"));
const BuyersAgentsGoogleAds = lazy(() => import("../app/pages/blog/BuyersAgentsGoogleAds"));
const BricklayersGrowthMarketing = lazy(() => import("../app/pages/blog/BricklayersGrowthMarketing"));
const FloorSandingDigitalMarketing = lazy(() => import("../app/pages/blog/FloorSandingDigitalMarketing"));
const FamilyLawyersDigitalMarketing = lazy(() => import("../app/pages/blog/FamilyLawyersDigitalMarketing"));
const DivorceLawyersDigitalMarketing = lazy(() => import("../app/pages/blog/DivorceLawyersDigitalMarketing"));
const CriminalLawyersDigitalMarketing = lazy(() => import("../app/pages/blog/CriminalLawyersDigitalMarketing"));

const ITConsultingDigitalMarketing = lazy(() => import("../app/pages/blog/ITConsultingDigitalMarketing"));
const ITNetworkingGrowthStrategy = lazy(() => import("../app/pages/blog/ITNetworkingGrowthStrategy"));
const ITConsultingLeadGeneration = lazy(() => import("../app/pages/blog/ITConsultingLeadGeneration"));

// New lead generation blog posts
const NDISLeadGenerationStrategies = lazy(() => import("../app/pages/blog/NDISLeadGenerationStrategies"));
const BricklayersLeadGeneration = lazy(() => import("../app/pages/blog/BricklayersLeadGeneration"));
const LawyersLeadGeneration = lazy(() => import("../app/pages/blog/LawyersLeadGeneration"));
const LiquidatorsGrowthMarketing = lazy(() => import("../app/pages/blog/LiquidatorsGrowthMarketing"));
const InsolvencyDigitalMarketing = lazy(() => import("../app/pages/blog/InsolvencyDigitalMarketing"));
const LiquidatorsGoogleAds = lazy(() => import("../app/pages/blog/LiquidatorsGoogleAds"));
const LiquidatorsGoogleAdsStrategy = lazy(() => import("../app/pages/blog/LiquidatorsGoogleAdsStrategy"));
const VoluntaryAdministrationLeadGeneration = lazy(() => import("../app/pages/blog/VoluntaryAdministrationLeadGeneration"));
const NDISGoogleAdsRespiteSIL = lazy(() => import("../app/pages/blog/NDISGoogleAdsRespiteSIL"));

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <PerformanceMonitor />
            
            <BrowserRouter>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Blog post routes */}
                  <Route path="/blog/b2b-lead-generation-strategies" element={<B2BLeadGeneration />} />
                  <Route path="/blog/local-search-ranking-strategies" element={<LocalSearchRanking />} />
                   <Route path="/blog/removalist-seo-strategy" element={<RemovalistSEOStrategy />} />
                   <Route path="/blog/removalist-digital-marketing-guide" element={<RemovalistDigitalMarketing />} />
                  <Route path="/blog/what-is-fractional-cmo" element={<WhatIsFractionalCMO />} />
                  <Route path="/blog/ndis-business-growth-strategy" element={<NDISBusinessGrowthStrategy />} />
                  <Route path="/blog/construction-lead-generation-strategies" element={<ConstructionLeadGeneration />} />
                  <Route path="/blog/local-seo-trade-businesses" element={<LocalSEOTrade />} />
                  <Route path="/blog/google-ads-service-businesses" element={<GoogleAdsService />} />
                  <Route path="/blog/fractional-cmo-vs-full-time-cmo" element={<FractionalCMOVsFullTime />} />
                  <Route path="/blog/advanced-ndis-lead-generation" element={<AdvancedNDISLeadGeneration />} />
                  <Route path="/blog/when-to-hire-fractional-cmo" element={<WhenToHireFractionalCMO />} />
                  <Route path="/blog/ndis-participant-engagement-strategies" element={<NDISParticipantEngagement />} />
                  <Route path="/blog/construction-marketing-best-practices" element={<ConstructionMarketingBestPractices />} />
                  <Route path="/blog/car-inspection-marketing-strategies" element={<CarInspectionMarketing />} />
                  <Route path="/blog/ndis-lead-generation-mastery" element={<NDISLeadGeneration />} />
                  <Route path="/blog/digital-marketing-automation-guide" element={<DigitalMarketingAutomation />} />
                  <Route path="/blog/ndis-web-design-guide" element={<NDISWebDesign />} />
                  <Route path="/blog/trade-customer-retention-strategies" element={<TradeCustomerRetention />} />
                  <Route path="/blog/digital-marketing-roi-service-businesses" element={<DigitalMarketingROI />} />
                  <Route path="/blog/construction-cost-estimation-guide" element={<ConstructionCostEstimation />} />
                  <Route path="/blog/trade-business-growth-strategies" element={<TradeBusinessGrowth />} />
                  <Route path="/blog/ndis-marketing-guide-2024" element={<NDISMarketingGuide />} />
                  <Route path="/blog/pre-purchase-car-inspection-business-guide" element={<PrePurchaseCarInspection />} />
                  <Route path="/blog/starting-removalist-business-guide" element={<StartingRemovalistBusiness />} />
                   <Route path="/blog/removalist-business-marketing-guide" element={<RemovalistBusinessMarketing />} />
                   <Route path="/blog/removalist-meta-ads-strategy" element={<RemovalistMetaAdsStrategy />} />
                  <Route path="/blog/ndis-digital-marketing-strategies" element={<NDISDigitalMarketing />} />
                  <Route path="/blog/ndis-digital-marketing-excellence" element={<NDISDigitalMarketingExcellence />} />
                  <Route path="/blog/ndis-software-saas-marketing-guide" element={<NDISSoftwareSaaSMarketing />} />
                  <Route path="/blog/ndis-software-saas-positioning-strategy" element={<NDISSoftwareSaaSPositioning />} />
                  <Route path="/blog/ndis-software-saas-lead-generation" element={<NDISSoftwareSaaSLeadGeneration />} />
                  <Route path="/blog/cyber-security-growth-hacking" element={<CyberSecurityGrowthHacking />} />
                  <Route path="/blog/cyber-security-google-ads-strategy" element={<CyberSecurityGoogleAds />} />
                  <Route path="/blog/cyber-security-seo-australia" element={<CyberSecuritySEOAustralia />} />
                  <Route path="/blog/cyber-security-digital-marketing-strategies" element={<CyberSecurityDigitalMarketing />} />
                  <Route path="/blog/conveyancing-lead-generation-strategies" element={<ConveyancingLeadGeneration />} />
                  <Route path="/blog/google-ads-conveyancing-guide" element={<ConveyancingGoogleAds />} />
                  <Route path="/blog/conveyancing-seo-guide" element={<ConveyancingSEO />} />
                  <Route path="/blog/conveyancing-social-media-marketing" element={<ConveyancingSocialMedia />} />
                  <Route path="/blog/conveyancing-digital-marketing-roi" element={<ConveyancingDigitalMarketingROI />} />
                  <Route path="/blog/therapy-services-digital-marketing" element={<TherapyServicesDigitalMarketing />} />
                  <Route path="/blog/therapy-google-ads-strategy" element={<TherapyGoogleAdsStrategy />} />
                  <Route path="/blog/therapy-growth-marketing-strategy" element={<TherapyGrowthMarketingStrategy />} />
                  <Route path="/blog/accounting-digital-marketing-guide" element={<AccountingDigitalMarketing />} />
                  <Route path="/blog/financial-planner-lead-generation" element={<FinancialPlannerLeadGeneration />} />
                  <Route path="/blog/tax-advisor-google-ads-strategy" element={<TaxAdvisorGoogleAds />} />
                  <Route path="/blog/financial-planner-seo-guide" element={<FinancialPlannerSEO />} />
                  <Route path="/blog/accounting-growth-strategy-guide" element={<AccountingGrowthStrategy />} />
                  <Route path="/blog/loan-broker-digital-marketing-guide" element={<LoanBrokerDigitalMarketing />} />
                  <Route path="/blog/loan-broker-lead-generation-strategy" element={<LoanBrokerLeadGeneration />} />
                  <Route path="/blog/loan-broker-google-ads-strategy" element={<LoanBrokerGoogleAds />} />
                  <Route path="/blog/security-digital-marketing-guide" element={<SecurityDigitalMarketing />} />
                  <Route path="/blog/security-lead-generation-strategy" element={<SecurityLeadGeneration />} />
                  <Route path="/blog/security-google-ads-strategy" element={<SecurityGoogleAdsStrategy />} />
                  <Route path="/blog/social-media-marketing-strategy" element={<SocialMediaMarketingStrategy />} />
                  <Route path="/blog/growth-marketing-strategy" element={<GrowthMarketingStrategy />} />
                  <Route path="/blog/digital-strategy-modern-business" element={<DigitalStrategyModernBusiness />} />
                  <Route path="/blog/saas-marketing-it-sector" element={<SaaSMarketingITSector />} />
                  <Route path="/blog/ndis-disability-service-marketing" element={<NDISDisabilityServiceMarketing />} />
                  <Route path="/blog/painters-digital-marketing-guide" element={<PaintersDigitalMarketing />} />
                  <Route path="/blog/mechanic-digital-marketing-guide" element={<MechanicDigitalMarketing />} />
                  <Route path="/blog/home-builders-lead-generation-guide" element={<HomeBuildersLeadGeneration />} />
                  <Route path="/blog/renovation-builders-digital-marketing-guide" element={<RenovationBuildersDigitalMarketing />} />
                  <Route path="/blog/real-estate-seo-marketing-guide" element={<RealEstateSEOMarketing />} />
                  <Route path="/blog/buyers-agents-google-ads-strategy" element={<BuyersAgentsGoogleAds />} />
                  <Route path="/blog/bricklayers-growth-marketing-strategy" element={<BricklayersGrowthMarketing />} />
                   <Route path="/blog/floor-sanding-digital-marketing-guide" element={<FloorSandingDigitalMarketing />} />
                   <Route path="/blog/it-consulting-digital-marketing-strategy" element={<ITConsultingDigitalMarketing />} />
                   <Route path="/blog/it-networking-business-growth-strategy" element={<ITNetworkingGrowthStrategy />} />
                   <Route path="/blog/it-consulting-lead-generation-guide" element={<ITConsultingLeadGeneration />} />
                   <Route path="/blog/family-lawyers-digital-marketing" element={<FamilyLawyersDigitalMarketing />} />
                   <Route path="/blog/divorce-lawyers-digital-marketing" element={<DivorceLawyersDigitalMarketing />} />
                   <Route path="/blog/criminal-lawyers-digital-marketing" element={<CriminalLawyersDigitalMarketing />} />
                   
                   {/* New lead generation blog posts */}
                   <Route path="/blog/ndis-lead-generation-strategies" element={<NDISLeadGenerationStrategies />} />
                   <Route path="/blog/bricklayers-lead-generation-guide" element={<BricklayersLeadGeneration />} />
                   <Route path="/blog/lawyers-lead-generation-strategies" element={<LawyersLeadGeneration />} />
                   <Route path="/blog/painters-lead-generation-guide" element={<PaintersLeadGeneration />} />
                   
                   {/* Insolvency & Liquidation blog posts */}
                   <Route path="/blog/liquidators-growth-marketing" element={<LiquidatorsGrowthMarketing />} />
                   <Route path="/blog/insolvency-digital-marketing" element={<InsolvencyDigitalMarketing />} />
                   <Route path="/blog/liquidators-google-ads" element={<LiquidatorsGoogleAds />} />
                   <Route path="/blog/liquidators-google-ads-strategy" element={<LiquidatorsGoogleAdsStrategy />} />
                   <Route path="/blog/voluntary-administration-lead-generation" element={<VoluntaryAdministrationLeadGeneration />} />
                   <Route path="/blog/ndis-google-ads-respite-sil-western-sydney" element={<NDISGoogleAdsRespiteSIL />} />
                  
                  {/* Other routes */}
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-conditions" element={<TermsConditions />} />
                  
                  {/* Admin routes */}
                  <Route path="/admin" element={<Admin />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="content" element={<AdminContent />} />
                    <Route path="blog-posts" element={<AdminBlogPosts />} />
                    <Route path="submissions" element={<AdminSubmissions />} />
                    <Route path="analytics" element={<AdminAnalytics />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>
                  <Route path="/admin/login" element={<AdminAuth />} />
                  <Route path="/admin/reset-password" element={<AdminResetPassword />} />
                  
                  <Route path="/sitemap" element={<SitemapView />} />
                  <Route path="/sitemap.xml" element={<Sitemap />} />
                  <Route path="/thank-you" element={<ThankYou />} />
                  <Route path="/not-ready" element={<NotReady />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

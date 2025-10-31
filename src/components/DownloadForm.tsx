import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import jsPDF from "jspdf";

interface DownloadFormProps {
  title: string;
  filename: string;
  variant?: "default" | "outline";
  size?: "sm" | "lg";
}

interface FormData {
  name: string;
  email: string;
  phone: string;
}

const DownloadForm = ({ title, filename, variant = "outline", size = "lg" }: DownloadFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: ""
  });
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateComprehensivePDF = async () => {
    const pdf = new jsPDF();
    const content = getGuideContent(filename);

    // Add cover page
    pdf.setFillColor(59, 130, 246); // Blue background
    pdf.rect(0, 0, 210, 297, 'F');

    // Cover title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont("helvetica", "bold");
    const titleLines = pdf.splitTextToSize(title, 160);
    let yPos = 100;
    titleLines.forEach((line: string) => {
      pdf.text(line, 105, yPos, { align: "center" });
      yPos += 12;
    });

    // Author info
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "normal");
    pdf.text("by Basheer Padanna", 105, yPos + 20, { align: "center" });
    pdf.text("Fractional CMO & Growth Strategist", 105, yPos + 35, { align: "center" });

    // Contact info
    pdf.setFontSize(12);
    pdf.text("basheer@dsigns.com.au", 105, yPos + 60, { align: "center" });
    pdf.text("fractional-cmo.com.au", 105, yPos + 75, { align: "center" });

    // Add table of contents page
    pdf.addPage();
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("Table of Contents", 20, 30);

    let tocY = 50;
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    content.forEach((section, index) => {
      pdf.text(`${index + 1}. ${section.header}`, 20, tocY);
      pdf.text(`Page ${index + 3}`, 170, tocY);
      tocY += 10;
    });

    // Add content pages
    content.forEach((section, sectionIndex) => {
      pdf.addPage();

      // Section header with background
      pdf.setFillColor(240, 240, 240);
      pdf.rect(10, 10, 190, 20, 'F');
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.text(section.header, 20, 25);

      let yPosition = 50;
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");

      section.items.forEach((item, itemIndex) => {
        // Add bullet point with background for readability
        if (itemIndex % 2 === 0) {
          pdf.setFillColor(249, 250, 251);
          pdf.rect(15, yPosition - 8, 180, 12, 'F');
        }

        pdf.setTextColor(59, 130, 246);
        pdf.text("•", 20, yPosition);
        pdf.setTextColor(0, 0, 0);

        const lines = pdf.splitTextToSize(item, 160);
        lines.forEach((line: string, lineIndex: number) => {
          pdf.text(line, 25, yPosition + lineIndex * 6);
        });
        yPosition += Math.max(12, lines.length * 6 + 3);

        // Add new page if needed
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = 30;
        }
      });

      // Add section summary box
      if (yPosition < 250) {
        pdf.setFillColor(59, 130, 246);
        pdf.setTextColor(255, 255, 255);
        pdf.rect(15, yPosition + 10, 180, 25, 'F');
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "bold");
        pdf.text("Key Takeaway:", 20, yPosition + 22);
        pdf.setFont("helvetica", "normal");
        const takeaway = getSectionTakeaway(section.header);
        const takeawayLines = pdf.splitTextToSize(takeaway, 170);
        takeawayLines.forEach((line: string, lineIndex: number) => {
          pdf.text(line, 20, yPosition + 28 + lineIndex * 4);
        });
      }
    });

    // Add final page with contact info
    pdf.addPage();
    pdf.setFillColor(59, 130, 246);
    pdf.rect(0, 0, 210, 297, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont("helvetica", "bold");
    pdf.text("Ready to Implement?", 105, 100, { align: "center" });

    pdf.setFontSize(14);
    pdf.setFont("helvetica", "normal");
    pdf.text("Let's discuss how I can help you execute these strategies", 105, 120, { align: "center" });

    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text("Basheer Padanna", 105, 150, { align: "center" });
    pdf.setFont("helvetica", "normal");
    pdf.text("Fractional CMO & Growth Strategist", 105, 165, { align: "center" });

    pdf.setFontSize(12);
    pdf.text("📧 basheer@dsigns.com.au", 105, 190, { align: "center" });
    pdf.text("🌐 fractional-cmo.com.au", 105, 205, { align: "center" });
    pdf.text("📱 Book a strategy call today", 105, 220, { align: "center" });

    return pdf;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send lead magnet notification email
      const { error: emailError } = await supabase.functions.invoke('send-lead-magnet-email', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          guideName: title,
          filename: filename
        }
      });

      if (emailError) {
        throw emailError;
      }

      // Generate and download the enhanced PDF
      const pdf = await generateComprehensivePDF();
      pdf.save(`${filename}.pdf`);

      toast({
        title: "Download Started!",
        description: "Your comprehensive guide is downloading now. Check your email for additional resources."
      });

      setIsOpen(false);
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download Failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className="gap-2">
          <Download className="w-4 h-4" />
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Download Your Free Guide</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              placeholder="Enter your full name" />
            
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              placeholder="Enter your email address" />
            
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              required
              placeholder="Enter your phone number" />
            
          </div>
          <div className="text-sm text-muted-foreground">
            By downloading this guide, you&apos;ll receive additional resources and insights via email.
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ?
            <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </> :

            <>
                <Download className="mr-2 h-4 w-4" />
                Download Guide
              </>
            }
          </Button>
        </form>
      </DialogContent>
    </Dialog>);

};

// Enhanced content for comprehensive guides
const getGuideContent = (filename: string) => {
  const guides: Record<string, Array<{header: string;items: string[];}>> = {
    "ndis-participant-engagement-guide": [
    {
      header: "Person-Centred Engagement Principles",
      items: [
      "Implement structured listening sessions with documented outcomes and feedback loops for continuous improvement",
      "Develop comprehensive strength-based assessment tools with quarterly capability reviews and progress tracking",
      "Create clear decision-making frameworks with accessible information formats and visual aids for all participants",
      "Establish cultural competency protocols with culturally appropriate service delivery methods and community connections",
      "Design individualised skill development plans with measurable milestones and regular progress celebrations",
      "Implement communication protocols that prioritise participant dignity and respect individual preferences",
      "Develop community connection strategies with supported networking and meaningful inclusion activities",
      "Create personalised communication plans using preferred methods including visual, verbal, written, and digital formats"]

    },
    {
      header: "Advanced Communication Strategies",
      items: [
      "Develop multi-modal communication toolkits including visual schedules, social stories, and assistive technology",
      "Implement time-flexible session structures with processing breaks and individually paced information delivery",
      "Create assistive technology solutions including communication devices and accessibility applications",
      "Use reflective listening techniques with understanding verification and regular clarification protocols",
      "Establish individual comfort zone assessments with documented communication preferences and boundaries",
      "Develop inclusive language guidelines with staff training on person-first and disability-affirming language",
      "Create multi-format information delivery systems including audio, visual, tactile, and digital formats",
      "Implement structured feedback systems with multiple communication channels and regular check-in schedules"]

    },
    {
      header: "Goal Setting & Achievement Framework",
      items: [
      "Facilitate collaborative goal-setting workshops using visual mapping and participant-led priority setting",
      "Develop SMART goal frameworks with milestone tracking systems and regular celebration protocols",
      "Conduct monthly goal review meetings with progress documentation and flexible adjustment processes",
      "Create recognition programs and achievement celebration events with family and support network inclusion",
      "Establish comprehensive goal tracking databases with visual progress indicators and accessible reports",
      "Implement family engagement protocols with support network integration and clear communication plans",
      "Use values assessment tools and interest-based goal alignment for meaningful and motivating outcomes",
      "Develop resource allocation systems with coordinated support service delivery and advocacy assistance"]

    }],

    "construction-cost-estimation-guide": [
    {
      header: "Comprehensive Cost Estimation Framework",
      items: [
      "Develop detailed project scope documentation with technical specifications and quality standards",
      "Create hierarchical work breakdown structure with cost allocation and resource assignment protocols",
      "Establish market research protocols with supplier networks and regional price tracking systems",
      "Include regional cost factors, regulatory compliance costs, and local labour market conditions",
      "Create comprehensive cost category frameworks covering all project elements and overhead expenses",
      "Develop risk-based contingency calculation methodologies with probability assessments",
      "Include seasonal cost variations and project timing impact analysis for accurate forecasting",
      "Create estimation documentation standards with assumption tracking and audit trail maintenance"]

    },
    {
      header: "Advanced Estimation Methods & Tools",
      items: [
      "Develop unit cost databases with regular market updates and supplier pricing integration",
      "Create assembly cost libraries for common construction systems with productivity factors",
      "Establish square foot cost benchmarks by building type and geographic region",
      "Develop project cost databases with performance benchmarking and variance analysis",
      "Create vendor relationship management with quote comparison and performance tracking",
      "Implement parametric estimation software with database integration and automated calculations",
      "Use digital takeoff tools with quantity surveying methodologies and accuracy verification",
      "Develop conceptual estimation frameworks for early project phases and rapid assessments"]

    },
    {
      header: "Risk Management & Quality Assurance",
      items: [
      "Create comprehensive risk identification checklists with escalation monitoring systems",
      "Establish material procurement strategies with alternative sourcing and supply chain resilience",
      "Include weather risk assessments with seasonal planning and delay mitigation strategies",
      "Monitor regulatory environments with permit processing timelines and compliance tracking",
      "Assess labour market conditions with workforce planning and skills availability analysis",
      "Implement market monitoring systems with price tracking and volatility risk management",
      "Create change order protocols with cost impact assessment and approval workflows",
      "Develop variance analysis procedures with performance tracking and corrective actions"]

    }],

    "ndis-digital-marketing-toolkit": [
    {
      header: "NDIS-Compliant Digital Marketing Strategy",
      items: [
      "Develop participant-centred marketing messages emphasising empowerment, choice, and quality outcomes",
      "Create NDIS Code of Conduct compliant content with dignity, respect, and person-centred language",
      "Implement accessible website design with WCAG 2.1 AA compliance and assistive technology compatibility",
      "Develop trust-building content showcasing real outcomes, testimonials, and quality indicators",
      "Create local SEO strategies targeting NDIS participants and families in specific catchment areas",
      "Establish social proof systems with participant consent protocols and privacy-compliant testimonials",
      "Develop educational content helping participants understand rights, choices, and funding options",
      "Create multi-channel marketing campaigns with consistent messaging across digital platforms"]

    },
    {
      header: "Content Marketing & Lead Generation",
      items: [
      "Develop educational blog content addressing participant concerns and service explanations",
      "Create video content featuring service demonstrations and participant success stories",
      "Establish social media presence with community engagement and resource sharing",
      "Develop email marketing campaigns with service updates and helpful resources",
      "Create downloadable resources including NDIS guides and planning tools",
      "Implement webinar programs offering NDIS education and service showcases",
      "Develop Google Ads campaigns targeting NDIS-related keywords with compliant messaging",
      "Create landing pages optimised for NDIS participant needs with clear value propositions"]

    },
    {
      header: "Analytics & Performance Measurement",
      items: [
      "Implement NDIS-compliant analytics tracking with privacy protection and consent management",
      "Develop ROI measurement systems tracking enquiry quality and participant acquisition costs",
      "Create compliance monitoring ensuring all marketing materials meet NDIS standards",
      "Establish reputation management protocols for online reviews and community feedback",
      "Implement conversion tracking for enquiries, downloads, and service bookings",
      "Develop reporting dashboards showing marketing performance and business growth metrics",
      "Create A/B testing protocols for marketing messages while maintaining compliance",
      "Establish continuous improvement processes based on participant feedback and performance data"]

    }],

    "ndis-lead-generation-toolkit": [
    {
      header: "Strategic Lead Generation Framework",
      items: [
      "Develop targeted strategies focusing on specific NDIS funding categories and participant demographics",
      "Create participant journey mapping from awareness to service engagement with touchpoint optimisation",
      "Establish referral networks with support coordinators, healthcare providers, and community organisations",
      "Implement local community engagement including events, workshops, and information sessions",
      "Develop digital lead magnets offering valuable NDIS resources, guides, and planning tools",
      "Create content marketing funnels that educate participants and build trust through information",
      "Establish partnership strategies with complementary NDIS providers for cross-referral opportunities",
      "Develop targeted advertising campaigns across digital platforms with compliance focus"]

    },
    {
      header: "Digital Lead Generation Implementation",
      items: [
      "Implement SEO strategies targeting NDIS-related keywords and local search optimisation",
      "Create Google Ads campaigns with NDIS-compliant messaging and local targeting",
      "Develop social media lead generation with community building and engagement strategies",
      "Establish email marketing sequences for lead nurturing with educational content",
      "Create optimised landing pages for NDIS participant needs with clear value propositions",
      "Implement chatbot systems for immediate response and qualification of participant enquiries",
      "Develop webinar marketing programs offering NDIS education and service demonstrations",
      "Create referral tracking systems to measure and optimise referral source performance"]

    },
    {
      header: "Lead Qualification & Conversion",
      items: [
      "Develop lead scoring systems prioritising participants based on funding and service fit",
      "Create qualification frameworks assessing participant needs, goals, and requirements",
      "Implement CRM systems for lead tracking, nurturing, and conversion management",
      "Establish follow-up protocols with timely response standards and personalised communication",
      "Create service matching processes aligning participant needs with provider capabilities",
      "Develop proposal templates and service agreements streamlining conversion processes",
      "Implement feedback systems to understand conversion barriers and optimisation opportunities",
      "Create onboarding processes ensuring smooth transition from lead to active participant"]

    }],

    "trade-business-growth-guide": [
    {
      header: "Strategic Growth Planning Framework",
      items: [
      "Develop comprehensive market analysis identifying expansion opportunities and competitive positioning",
      "Create business capability assessment tools evaluating current strengths and growth readiness",
      "Establish growth goal setting with SMART objectives and milestone tracking systems",
      "Develop resource planning frameworks for staffing, equipment, and capital requirements",
      "Create financial forecasting models with cash flow projections and investment planning",
      "Implement risk assessment procedures identifying growth challenges and mitigation strategies",
      "Develop operational scalability assessment with process improvement opportunities",
      "Create performance measurement systems tracking growth progress and success indicators"]

    },
    {
      header: "Market Expansion & Diversification",
      items: [
      "Conduct geographic expansion analysis with market research and competitive assessment",
      "Develop service diversification strategies expanding into complementary trade services",
      "Create commercial market entry strategies targeting business and institutional clients",
      "Establish government contract pursuit with tender processes and compliance requirements",
      "Develop strategic partnership frameworks with complementary businesses and suppliers",
      "Create brand building strategies enhancing reputation and market presence",
      "Implement customer segmentation analysis for targeted marketing and service delivery",
      "Develop pricing strategy optimisation for different market segments and offerings"]

    },
    {
      header: "Operational Excellence & Technology",
      items: [
      "Create process standardisation frameworks with documented procedures and quality controls",
      "Develop technology implementation roadmaps improving efficiency and customer service",
      "Establish team structure planning with clear roles, responsibilities, and reporting lines",
      "Create hiring strategies attracting skilled tradespeople and support staff",
      "Develop training programs building team capabilities and industry certifications",
      "Implement safety management systems ensuring compliance and workplace excellence",
      "Create quality assurance frameworks maintaining service standards and satisfaction",
      "Develop performance management systems with regular reviews and improvement planning"]

    }],

    "trade-customer-retention-toolkit": [
    {
      header: "Customer Experience Excellence",
      items: [
      "Develop service delivery standards with quality metrics and satisfaction measurements",
      "Create comprehensive communication protocols including project updates and notifications",
      "Establish follow-up systems with post-service contact schedules and satisfaction surveys",
      "Implement customer feedback collection including surveys, interviews, and review monitoring",
      "Develop issue resolution procedures with escalation processes and satisfaction guarantees",
      "Create value-added service offerings including maintenance plans and priority scheduling",
      "Establish professional presentation standards for staff, vehicles, and site management",
      "Develop warranty and guarantee programs building confidence and demonstrating quality"]

    },
    {
      header: "Loyalty Programs & Retention Strategies",
      items: [
      "Create tiered loyalty program structures with increasing benefits for repeat customers",
      "Develop referral reward systems incentivising customers to recommend services",
      "Establish customer appreciation events including seasonal promotions and exclusive offers",
      "Create exclusive member benefits such as priority booking and special pricing",
      "Implement points and discount programs rewarding loyalty and repeat business",
      "Develop VIP service offerings for high-value customers with enhanced service levels",
      "Create anniversary and milestone recognition programs celebrating relationships",
      "Establish family and business customer programs with tailored benefits"]

    },
    {
      header: "Technology & Performance Measurement",
      items: [
      "Implement CRM systems tracking customer history, preferences, and communication",
      "Create automated email marketing campaigns with personalised content and offers",
      "Develop customer lifetime value tracking measuring long-term customer worth",
      "Establish retention rate calculations with trend analysis and benchmarking",
      "Create Net Promoter Score monitoring with regular surveys and improvement tracking",
      "Implement churn prediction models identifying at-risk customers for retention efforts",
      "Develop ROI measurement systems for retention programs and initiatives",
      "Create analytics platforms providing insights into customer behaviour and preferences"]

    }],

    "construction-project-management-toolkit": [
    {
      header: "Project Planning & Setup Framework",
      items: [
      "Develop comprehensive project charter templates with scope definition and success criteria",
      "Create stakeholder identification and analysis tools with communication plans",
      "Establish work breakdown structure frameworks with task organisation and dependencies",
      "Implement resource planning and allocation matrices with skills matching",
      "Develop risk assessment and management plans with mitigation strategies",
      "Create quality management system templates ensuring industry compliance",
      "Establish communication and reporting protocols with stakeholder updates",
      "Implement project timeline and milestone tracking with critical path analysis"]

    },
    {
      header: "Technology Integration & Control Systems",
      items: [
      "Select digital project management platforms with collaboration features",
      "Develop mobile app implementation for field operations and real-time updates",
      "Create BIM integration workflows with 3D modelling and clash detection",
      "Establish IoT sensor deployment for automated monitoring and data collection",
      "Implement cloud-based document sharing with secure access and version control",
      "Create real-time reporting dashboards with customisable metrics and alerts",
      "Develop integration with accounting and ERP systems for data flow",
      "Establish training and adoption practices for technology implementation"]

    },
    {
      header: "Quality Assurance & Risk Management",
      items: [
      "Develop quality control checklists with inspection schedules and criteria",
      "Create compliance monitoring ensuring adherence to codes and regulations",
      "Establish testing and certification procedures with third-party verification",
      "Implement corrective action procedures addressing quality issues",
      "Create comprehensive risk registers with probability and impact assessments",
      "Develop contingency planning templates with alternative approaches",
      "Establish early warning systems with indicators and escalation procedures",
      "Create crisis management procedures with communication and notification plans"]

    }],

    "digital-marketing-automation-toolkit": [
    {
      header: "Marketing Automation Strategy Framework",
      items: [
      "Develop comprehensive automation strategy aligning with business goals and customer journeys",
      "Create customer segmentation frameworks with behavioural triggers and personalisation",
      "Establish lead scoring systems with qualification criteria and progressive profiling",
      "Implement multi-channel automation workflows coordinating email, social, and web experiences",
      "Develop content automation strategies with dynamic personalisation and A/B testing",
      "Create nurturing sequences for different buyer personas and lifecycle stages",
      "Establish automation performance metrics with ROI tracking and optimisation",
      "Implement integration strategies connecting automation tools with CRM and analytics"]

    },
    {
      header: "Email & Social Media Automation",
      items: [
      "Create welcome email sequences with progressive engagement and value delivery",
      "Develop abandoned cart recovery workflows with personalised reminders",
      "Establish re-engagement campaigns targeting inactive subscribers with win-back strategies",
      "Implement behavioural trigger emails based on website activity and purchase history",
      "Create drip campaigns for lead nurturing with educational content and social proof",
      "Develop event-based automation for birthdays, anniversaries, and milestones",
      "Establish social media scheduling with optimal timing algorithms",
      "Create automated social listening with mention monitoring and response triggers"]

    },
    {
      header: "Analytics & Continuous Optimisation",
      items: [
      "Create automated reporting dashboards with real-time performance metrics",
      "Implement attribution modelling with multi-channel customer journey analysis",
      "Develop ROI calculation automation with cost allocation and revenue attribution",
      "Establish predictive analytics with machine learning for trend forecasting",
      "Create automated alert systems with performance threshold monitoring",
      "Implement conversion optimisation with continuous testing and improvement",
      "Develop customer lifetime value automation with retention prediction",
      "Create competitive analysis automation with market monitoring and benchmarking"]

    }]

  };

  return guides[filename] || [
  {
    header: "Professional Guide Content",
    items: [
    "This comprehensive guide provides detailed strategic information and implementation frameworks designed by industry experts",
    "Step-by-step instructions with practical templates, checklists, and tools for immediate implementation in your business",
    "Industry best practices backed by real-world experience, proven methodologies, and successful case studies",
    "Common challenges and detailed solutions with risk mitigation strategies and troubleshooting guidelines",
    "Performance measurement frameworks with KPIs, success metrics, and benchmarking tools for continuous improvement",
    "Technology recommendations and integration guidelines for modern, efficient, and scalable implementations",
    "Continuous improvement processes with feedback loops, optimisation strategies, and adaptation methodologies",
    "Expert contact information for personalised consultation, implementation support, and ongoing strategic guidance"]

  }];

};

// Get section takeaway for summary boxes
const getSectionTakeaway = (sectionHeader: string): string => {
  const takeaways: Record<string, string> = {
    "Person-Centred Engagement Principles": "Success in NDIS services requires genuine commitment to participant choice, dignity, and individualised support approaches that respect cultural diversity and promote independence.",
    "Advanced Communication Strategies": "Effective communication combines multiple modalities, patience, and respect for individual preferences while ensuring accessibility and understanding for all participants.",
    "Goal Setting & Achievement Framework": "Collaborative goal setting with regular review, family involvement, and celebration of achievements creates meaningful outcomes and sustained progress for participants.",
    "Comprehensive Cost Estimation Framework": "Accurate cost estimation requires detailed scope analysis, comprehensive market research, and systematic risk assessment with proper documentation and quality controls.",
    "Advanced Estimation Methods & Tools": "Combining traditional estimation methods with modern technology and comprehensive databases improves accuracy, efficiency, and competitive advantage.",
    "Risk Management & Quality Assurance": "Proactive risk management with comprehensive contingency planning and quality assurance processes protects project budgets, timelines, and profitability.",
    "NDIS-Compliant Digital Marketing Strategy": "NDIS marketing success requires participant-centred messaging, strict compliance focus, and trust-building content that emphasises choice and empowerment.",
    "Content Marketing & Lead Generation": "Educational content and authentic community engagement build trust, demonstrate expertise, and generate qualified leads from NDIS participants and their families.",
    "Analytics & Performance Measurement": "Proper measurement, compliance monitoring, and continuous improvement ensure marketing effectiveness while maintaining regulatory adherence and participant privacy.",
    "Strategic Lead Generation Framework": "Successful NDIS lead generation combines targeted digital strategies with community engagement, referral networks, and compliance-focused messaging.",
    "Digital Lead Generation Implementation": "Multi-channel digital approaches with SEO, advertising, and content marketing generate qualified NDIS leads when properly implemented with compliance focus.",
    "Lead Qualification & Conversion": "Systematic lead qualification, CRM management, and streamlined conversion processes maximise the value of generated leads and improve participant outcomes.",
    "Strategic Growth Planning Framework": "Sustainable business growth requires comprehensive planning, market analysis, resource assessment, and systematic implementation with performance tracking.",
    "Market Expansion & Diversification": "Strategic expansion into new markets and services requires thorough research, competitive analysis, and careful planning to ensure successful growth.",
    "Operational Excellence & Technology": "Scaling operations successfully requires process standardisation, technology integration, team development, and continuous improvement systems.",
    "Customer Experience Excellence": "Exceptional customer experience through quality service delivery, professional communication, and systematic follow-up drives customer satisfaction and retention.",
    "Loyalty Programs & Retention Strategies": "Well-designed loyalty programs and retention strategies increase customer lifetime value, reduce acquisition costs, and generate valuable referrals.",
    "Technology & Performance Measurement": "Modern CRM systems, automation tools, and analytics platforms enable efficient customer management and data-driven retention improvements.",
    "Project Planning & Setup Framework": "Successful construction projects require comprehensive planning, stakeholder management, risk assessment, and clear communication protocols from project inception.",
    "Technology Integration & Control Systems": "Modern project management technology, BIM integration, and real-time monitoring systems improve efficiency, collaboration, and project outcomes.",
    "Quality Assurance & Risk Management": "Systematic quality control, compliance monitoring, and proactive risk management ensure project success while protecting against costly issues.",
    "Marketing Automation Strategy Framework": "Effective marketing automation requires strategic planning, customer segmentation, and systematic implementation with continuous optimisation and performance tracking.",
    "Email & Social Media Automation": "Automated email sequences and social media management improve lead nurturing, customer engagement, and marketing efficiency when properly configured.",
    "Analytics & Continuous Optimisation": "Data-driven automation with comprehensive analytics, performance tracking, and continuous optimisation maximises marketing ROI and business growth."
  };

  return takeaways[sectionHeader] || "Implementation of these strategies requires systematic approach, regular monitoring, and continuous improvement based on results, feedback, and changing market conditions.";
};

export default DownloadForm;
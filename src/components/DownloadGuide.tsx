import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

interface DownloadGuideProps {
  title: string;
  filename: string;
  variant?: "default" | "outline";
  size?: "sm" | "lg";
}

const DownloadGuide = ({ title, filename, variant = "outline", size = "lg" }: DownloadGuideProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      const pdf = new jsPDF();
      
      // Add title
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.text(title, 20, 30);
      
      // Add subtitle
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text("Comprehensive Guide by Basheer Padanna", 20, 45);
      
      // Add content based on the guide type
      const content = getGuideContent(filename);
      let yPosition = 65;
      
      pdf.setFontSize(10);
      const pageWidth = pdf.internal.pageSize.width;
      const textWidth = pageWidth - 40; // 20px margin on each side
      
      content.forEach((section) => {
        // Add section header
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(12);
        
        // Check if we need a new page
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = 20;
        }
        
        pdf.text(section.header, 20, yPosition);
        yPosition += 10;
        
        // Add section content
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(9);
        
        section.items.forEach((item) => {
          const lines = pdf.splitTextToSize(`• ${item}`, textWidth);
          lines.forEach((line: string) => {
            if (yPosition > 270) {
              pdf.addPage();
              yPosition = 20;
            }
            pdf.text(line, 25, yPosition);
            yPosition += 5;
          });
        });
        
        yPosition += 5; // Space between sections
      });
      
      // Add footer
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "italic");
      pdf.text("For more resources visit: fractional-cmo.com.au", 20, pdf.internal.pageSize.height - 20);
      
      // Download the PDF
      pdf.save(`${filename}.pdf`);
      
      toast({
        title: "Download Complete",
        description: `${title} has been downloaded successfully.`,
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Download Failed",
        description: "There was an error generating the guide. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size}
      onClick={handleDownload}
      disabled={isDownloading}
      className="gap-2"
    >
      <Download className="w-4 h-4" />
      {isDownloading ? "Generating PDF..." : title}
    </Button>
  );
};

// Content for different guide types
const getGuideContent = (filename: string) => {
  const guides: Record<string, Array<{header: string, items: string[]}>> = {
    "ndis-participant-engagement-guide": [
      {
        header: "Person-Centred Engagement Principles",
        items: [
          "Listen actively and respect participant choices",
          "Recognise individual strengths and capabilities",
          "Support informed decision-making processes",
          "Respect cultural backgrounds and preferences",
          "Promote independence and skill development",
          "Maintain dignity and respect in all interactions",
          "Encourage community participation and inclusion",
          "Adapt communication styles to individual needs"
        ]
      },
      {
        header: "Communication Strategies",
        items: [
          "Use clear, simple language appropriate to the participant",
          "Allow adequate time for processing and response",
          "Employ visual aids and alternative communication methods",
          "Practice active listening and confirm understanding",
          "Respect personal space and communication preferences",
          "Use inclusive and non-judgmental language",
          "Provide information in accessible formats",
          "Encourage questions and feedback"
        ]
      },
      {
        header: "Goal Setting Framework",
        items: [
          "Collaborate with participants to identify meaningful goals",
          "Break large goals into achievable steps",
          "Regular review and adjustment of goals",
          "Celebrate achievements and progress",
          "Document goal-setting discussions and outcomes",
          "Involve family and support networks when appropriate",
          "Link goals to participant's values and interests",
          "Provide necessary supports to achieve goals"
        ]
      }
    ],
    "construction-cost-estimation-guide": [
      {
        header: "Cost Estimation Fundamentals",
        items: [
          "Develop detailed project scope and specifications",
          "Create comprehensive work breakdown structure",
          "Research current material and labor costs",
          "Account for local market conditions and regulations",
          "Include all direct and indirect costs",
          "Apply appropriate contingency factors",
          "Consider seasonal and timing factors",
          "Document all assumptions and methodologies"
        ]
      },
      {
        header: "Estimation Methods",
        items: [
          "Unit cost method for standardised components",
          "Assembly cost method for complex systems",
          "Square foot method for preliminary estimates",
          "Historical data analysis and benchmarking",
          "Vendor quotes for specialised items",
          "Parametric estimation using cost databases",
          "Bottom-up detailed takeoff approach",
          "Top-down conceptual estimation"
        ]
      },
      {
        header: "Risk Management",
        items: [
          "Identify potential cost escalation factors",
          "Develop contingency plans for material shortages",
          "Account for weather and seasonal delays",
          "Consider regulatory changes and permit delays",
          "Plan for skilled labor availability",
          "Monitor market volatility and price changes",
          "Establish change order management procedures",
          "Regular cost monitoring and variance analysis"
        ]
      }
    ],
    "trade-business-growth-guide": [
      {
        header: "Growth Strategy Framework",
        items: [
          "Market expansion and geographic growth",
          "Service diversification opportunities",
          "Operational excellence and efficiency",
          "Team development and management",
          "Financial planning and cash flow",
          "Technology implementation roadmap",
          "Quality control and standardization",
          "Performance measurement systems"
        ]
      },
      {
        header: "Market Expansion Tactics",
        items: [
          "Adjacent market research and entry",
          "Competitive analysis and positioning",
          "Service portfolio expansion strategies",
          "Commercial sector opportunities",
          "Government contract pursuit",
          "Strategic partnership development",
          "Brand building and reputation management",
          "Marketing investment planning"
        ]
      },
      {
        header: "Operational Scaling",
        items: [
          "Process standardization and documentation",
          "Technology systems implementation",
          "Team structure and hiring strategies",
          "Training and development programs",
          "Quality assurance frameworks",
          "Financial controls and reporting",
          "Risk management procedures",
          "Growth milestone planning"
        ]
      }
    ],
    "trade-customer-retention-toolkit": [
      {
        header: "Customer Experience Excellence",
        items: [
          "Service delivery quality standards",
          "Communication protocols and timing",
          "Follow-up systems and schedules",
          "Customer feedback collection methods",
          "Issue resolution procedures",
          "Value-added service offerings",
          "Professional presentation standards",
          "Warranty and guarantee programs"
        ]
      },
      {
        header: "Loyalty Program Design",
        items: [
          "Tiered loyalty program structure",
          "Referral reward systems",
          "Customer appreciation events",
          "Exclusive member benefits",
          "Points and discount programs",
          "VIP service offerings",
          "Anniversary and milestone recognition",
          "Family and business customer programs"
        ]
      },
      {
        header: "Retention Measurement",
        items: [
          "Customer lifetime value tracking",
          "Retention rate calculations",
          "Net promoter score monitoring",
          "Satisfaction survey systems",
          "Churn prediction and prevention",
          "Revenue per customer analysis",
          "Referral conversion tracking",
          "ROI measurement for retention programs"
        ]
      }
    ],
    "construction-project-management-toolkit": [
      {
        header: "Project Planning and Setup",
        items: [
          "Project charter development templates",
          "Stakeholder identification and analysis tools",
          "Work breakdown structure frameworks",
          "Resource planning and allocation matrices",
          "Risk assessment and management plans",
          "Quality management system templates",
          "Communication and reporting protocols",
          "Project timeline and milestone tracking"
        ]
      },
      {
        header: "Execution and Control Tools",
        items: [
          "Daily progress monitoring checklists",
          "Quality inspection and testing protocols",
          "Change management procedures",
          "Budget tracking and cost control systems",
          "Safety compliance and incident reporting",
          "Team coordination and communication tools",
          "Performance metrics and KPI dashboards",
          "Document management and version control"
        ]
      },
      {
        header: "Technology Integration",
        items: [
          "Digital project management platform selection",
          "Mobile app implementation guidelines",
          "BIM integration and collaboration workflows",
          "IoT and sensor deployment strategies",
          "Cloud-based document sharing systems",
          "Real-time reporting and dashboard setup",
          "Integration with accounting and ERP systems",
          "Training and adoption best practices"
        ]
      }
    ]
    // Add more guide content as needed
  };

  return guides[filename] || [
    {
      header: "Guide Content",
      items: [
        "This comprehensive guide provides detailed information and strategies",
        "Step-by-step instructions for implementation",
        "Best practices and industry standards",
        "Common challenges and solutions",
        "Templates and checklists for practical use",
        "Resources for further learning",
        "Contact information for additional support"
      ]
    }
  ];
};

export default DownloadGuide;
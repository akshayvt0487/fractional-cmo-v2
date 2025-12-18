import { Metadata } from "next";
import { createMetadata, SITE_URL } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = createMetadata({
  title: "Terms & Conditions - Fractional CMO",
  description: "Terms & Conditions for Fractional CMO. Review our terms of service and conditions of use.",
  path: "/terms-conditions",
  canonical: `${SITE_URL}/terms-conditions`,
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
});

const TermsConditions = () => {
  return (
    <>
      
      <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
          <h1>Terms & Conditions</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>Agreement to Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>

          <h2>Services</h2>
          <p>
            Basheer Padanna provides fractional CMO services including but not limited to:
          </p>
          <ul>
            <li>Marketing strategy development and execution</li>
            <li>Growth audits and optimisation</li>
            <li>Performance advertising management</li>
            <li>SEO and content strategy</li>
            <li>UX/UI optimisation</li>
            <li>Business consultation</li>
          </ul>

          <h2>Use License</h2>
          <p>
            Permission is granted to temporarily access the materials on this website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>

          <h2>Disclaimer</h2>
          <p>
            The materials on this website are provided on an &apos;as is&apos; basis. Basheer Padanna makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2>Service Terms</h2>
          <h3>Engagement</h3>
          <p>
            All consulting engagements are subject to a separate service agreement that will outline specific terms, deliverables, timelines, and compensation.
          </p>

          <h3>Payment Terms</h3>
          <p>
            Payment terms will be specified in individual service agreements. Generally, payment is due within 30 days of invoice date unless otherwise agreed upon.
          </p>

          <h3>Confidentiality</h3>
          <p>
            We maintain strict confidentiality regarding all client information and business details shared during our engagement.
          </p>

          <h2>Limitations</h2>
          <p>
            In no event shall Basheer Padanna or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website, even if Basheer Padanna or its authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>

          <h2>Accuracy of Materials</h2>
          <p>
            The materials appearing on this website could include technical, typographical, or photographic errors. Basheer Padanna does not warrant that any of the materials on its website are accurate, complete, or current.
          </p>

          <h2>Links</h2>
          <p>
            Basheer Padanna has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Basheer Padanna of the site.
          </p>

          <h2>Modifications</h2>
          <p>
            Basheer Padanna may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
          </p>

          <h2>Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of Australia, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
          </p>

          <h2>Contact Information</h2>
          <p>
            If you have any questions about these Terms & Conditions, please contact us at:
          </p>
          <p>
            Email: <a href="mailto:basheer@dsigns.com.au">basheer@dsigns.com.au</a>
          </p>
        </div>
      </main>
      </div>
    </>);

};

export default TermsConditions;
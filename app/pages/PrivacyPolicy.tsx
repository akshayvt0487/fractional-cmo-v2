import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import  Link  from "next/link";

const PrivacyPolicy = () => {
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
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <h2>Introduction</h2>
          <p>
            Basheer Padanna ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Contact us through our contact form</li>
            <li>Request a strategy call</li>
            <li>Subscribe to our newsletter</li>
            <li>Engage with our services</li>
          </ul>
          
          <p>This information may include:</p>
          <ul>
            <li>Name and contact information</li>
            <li>Company name and details</li>
            <li>Email address and phone number</li>
            <li>Business information and revenue details</li>
            <li>Project requirements and timeline</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>We may automatically collect certain information about your device, including:</p>
          <ul>
            <li>IP address and location information</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and provide requested services</li>
            <li>Schedule and conduct strategy calls</li>
            <li>Improve our website and services</li>
            <li>Send you relevant business communications</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
          <ul>
            <li>With your explicit consent</li>
            <li>To trusted service providers who assist us in operating our website</li>
            <li>When required by law or to protect our rights</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access and update your personal information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt-out of marketing communications</li>
            <li>Request portability of your data</li>
          </ul>

          <h2>Cookies and Tracking</h2>
          <p>
            Our website may use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences.
          </p>

          <h2>Contact Information</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            Email: <a href="mailto:basheer@dsigns.com.au">basheer@dsigns.com.au</a>
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </div>
      </main>
      </div>
    </>
  );
};

export default PrivacyPolicy;
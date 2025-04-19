import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            At Dharmik Vadaliya, we are committed to protecting your privacy and ensuring the security of your personal
            information.
          </p>

          <p>
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit
            our website or make a purchase. Please read this privacy policy carefully. If you do not agree with the
            terms of this privacy policy, please do not access the site.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information that you provide directly to us when you register for an account, make a purchase,
            sign up for our newsletter, respond to a survey, fill out a form, or otherwise communicate with us.
          </p>

          <p>The personal information we may collect includes:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Mailing address</li>
            <li>Phone number</li>
            <li>Payment information</li>
            <li>Order history</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Provide customer service and respond to inquiries</li>
            <li>Send transactional emails and order confirmations</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Improve our website and product offerings</li>
            <li>Personalize your shopping experience</li>
            <li>Prevent fraud and enhance security</li>
          </ul>

          <h2>3. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and hold certain
            information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2>4. Third-Party Disclosure</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties
            except as described below:
          </p>
          <ul>
            <li>
              Service providers who assist us in operating our website, conducting our business, or serving our users
            </li>
            <li>Business partners with your consent</li>
            <li>Legal authorities when required by law or to protect our rights</li>
          </ul>

          <h2>5. Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information when you
            place an order or enter, submit, or access your personal information. We use secure server software (SSL)
            and firewalls to protect your information.
          </p>

          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, such as:</p>
          <ul>
            <li>The right to access the personal information we have about you</li>
            <li>The right to request correction of inaccurate information</li>
            <li>The right to request deletion of your information</li>
            <li>The right to opt-out of marketing communications</li>
          </ul>

          <h2>7. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <h2>8. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>
            Email: privacy@dharmikvadaliya.com
            <br />
            Phone: +91 98765 43210
            <br />
            Address: 123 Cultural Street, Artisan District, Mumbai, India 400001
          </p>

          <p className="text-sm text-gray-600 mt-8">Last Updated: April 18, 2023</p>
        </div>

        <div className="mt-12 text-center">
          <Link href="/">
            <Button className="bg-indian-pink hover:bg-indian-pink/90">Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

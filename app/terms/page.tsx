import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms and Conditions</h1>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            Welcome to Dharmik Vadaliya. These terms and conditions outline the rules and regulations for the use of our
            website.
          </p>

          <p>
            By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use
            Dharmik Vadaliya's website if you do not accept all of the terms and conditions stated on this page.
          </p>

          <h2>1. Definitions</h2>
          <p>
            The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and
            any or all Agreements: "Client", "You" and "Your" refers to you, the person accessing this website and
            accepting the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to
            our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves, or either the Client or
            ourselves.
          </p>

          <h2>2. License</h2>
          <p>
            Unless otherwise stated, Dharmik Vadaliya and/or its licensors own the intellectual property rights for all
            material on Dharmik Vadaliya. All intellectual property rights are reserved. You may view and/or print pages
            from the website for your own personal use subject to restrictions set in these terms and conditions.
          </p>

          <p>You must not:</p>
          <ul>
            <li>Republish material from this website</li>
            <li>Sell, rent or sub-license material from the website</li>
            <li>Reproduce, duplicate or copy material from the website</li>
            <li>Redistribute content from Dharmik Vadaliya (unless content is specifically made for redistribution)</li>
          </ul>

          <h2>3. User Comments</h2>
          <p>
            Certain parts of this website offer the opportunity for users to post and exchange opinions, information,
            material and data. Dharmik Vadaliya does not screen, edit, publish or review Comments prior to their
            appearance on the website and Comments do not reflect the views or opinions of Dharmik Vadaliya, its agents
            or affiliates. Comments reflect the view and opinion of the person who posts such view or opinion.
          </p>

          <h2>4. Payment and Shipping</h2>
          <p>
            All prices are in Indian Rupees (INR) and include applicable taxes. Shipping costs are calculated at
            checkout based on your location and the items in your cart. We ship to most countries worldwide, with
            delivery times varying by location.
          </p>

          <h2>5. Returns and Refunds</h2>
          <p>
            We want you to be completely satisfied with your purchase. If for any reason you're not happy with your
            order, you can return it within 30 days of delivery for a full refund or exchange. Please note that items
            must be returned in their original condition and packaging.
          </p>

          <h2>6. Privacy Policy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and
            protect your personal information.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India, and you
            irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately
            upon posting to the website. Your continued use of the website after any changes indicates your acceptance
            of the new terms.
          </p>

          <h2>9. Contact Information</h2>
          <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
          <p>
            Email: info@dharmikvadaliya.com
            <br />
            Phone: +91 98765 43210
            <br />
            Address: 123 Cultural Street, Artisan District, Mumbai, India 400001
          </p>
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

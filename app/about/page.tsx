import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Dharmik Vadaliya</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Celebrating the rich heritage and craftsmanship of India through authentic handcrafted products
        </p>
      </div>

      {/* Our Story */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div className="about-image">
          <img
            src="/placeholder.svg?height=500&width=500"
            alt="Our Story"
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Dharmik Vadaliya was founded in 2018 with a simple yet powerful vision: to bring the vibrant spirit of
            Indian craftsmanship to homes around the world. What began as a small passion project has grown into a
            thriving marketplace for authentic Indian handicrafts.
          </p>
          <p className="text-gray-600 mb-4">
            Our founder, Dharmik, grew up surrounded by the rich artistic traditions of India. After traveling
            extensively across the country and witnessing the incredible skill of local artisans, he was inspired to
            create a platform that would showcase their talents and help preserve these age-old crafts.
          </p>
          <p className="text-gray-600">
            Today, we work directly with over 200 artisans and small workshops across India, ensuring fair compensation
            and sustainable practices while bringing their beautiful creations to a global audience.
          </p>
        </div>
      </div>

      {/* Our Mission */}
      <div className="bg-gray-50 rounded-lg p-8 md:p-12 mb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8">
            "To preserve and promote India's rich cultural heritage by connecting skilled artisans with appreciative
            customers worldwide, while ensuring sustainable livelihoods and ethical practices."
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-3">Preserve Traditions</h3>
              <p className="text-gray-600">
                Supporting traditional crafts and techniques that have been passed down through generations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-3">Empower Artisans</h3>
              <p className="text-gray-600">
                Providing fair compensation and sustainable livelihoods for skilled craftspeople across India.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-3">Share Culture</h3>
              <p className="text-gray-600">
                Bringing the beauty and stories of Indian craftsmanship to homes around the world.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indian-pink/10 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-indian-pink"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Authenticity</h3>
            <p className="text-gray-600">
              We celebrate genuine craftsmanship and cultural heritage in every product we offer.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indian-pink/10 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-indian-pink"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Sustainability</h3>
            <p className="text-gray-600">
              We prioritize eco-friendly materials and practices throughout our supply chain.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indian-pink/10 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-indian-pink"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Community</h3>
            <p className="text-gray-600">
              We build meaningful relationships with artisans, customers, and communities.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-indian-pink/10 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-indian-pink"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Quality</h3>
            <p className="text-gray-600">
              We ensure exceptional craftsmanship and attention to detail in every product.
            </p>
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((member) => (
            <div key={member} className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden">
                <img
                  src={`/placeholder.svg?height=200&width=200&text=Team Member ${member}`}
                  alt={`Team Member ${member}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg">Team Member {member}</h3>
              <p className="text-indian-pink mb-2">Position Title</p>
              <p className="text-gray-600 text-sm">
                Brief description about the team member and their role in the company.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Artisan Partners */}
      <div className="bg-gray-50 rounded-lg p-8 md:p-12 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Our Artisan Partners</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We work directly with skilled artisans across India, ensuring fair compensation and sustainable practices.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[1, 2, 3, 4, 5, 6].map((region) => (
            <div key={region} className="text-center">
              <div className="mb-3 mx-auto w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center">
                <img
                  src={`/placeholder.svg?height=80&width=80&text=${region}`}
                  alt={`Region ${region}`}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h3 className="font-medium text-sm">Region {region}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-6">Join Us on Our Journey</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Discover the beauty of authentic Indian handicrafts and be part of our mission to preserve traditional
          craftsmanship.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/shop">
            <Button size="lg" className="bg-indian-pink hover:bg-indian-pink/90">
              Explore Our Collection
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="border-indian-pink text-indian-pink hover:bg-indian-pink/10">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

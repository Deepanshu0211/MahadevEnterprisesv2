"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We'd love to hear from you. Get in touch with our team for any questions, feedback, or inquiries.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {/* Contact Information */}
        <div className="md:col-span-1 space-y-6">
          <div className="contact-card bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <div className="mr-4 bg-indian-pink/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-indian-pink" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Our Location</h3>
                <p className="text-gray-600">123 Cultural Street, Artisan District</p>
                <p className="text-gray-600">Mumbai, India 400001</p>
              </div>
            </div>
          </div>

          <div className="contact-card bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <div className="mr-4 bg-indian-pink/10 p-3 rounded-full">
                <Phone className="h-6 w-6 text-indian-pink" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Phone Number</h3>
                <p className="text-gray-600">+91 98765 43210</p>
                <p className="text-gray-600">+91 98765 43211</p>
              </div>
            </div>
          </div>

          <div className="contact-card bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <div className="mr-4 bg-indian-pink/10 p-3 rounded-full">
                <Mail className="h-6 w-6 text-indian-pink" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Email Address</h3>
                <p className="text-gray-600">info@dharmikvadaliya.com</p>
                <p className="text-gray-600">support@dharmikvadaliya.com</p>
              </div>
            </div>
          </div>

          <div className="contact-card bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <div className="mr-4 bg-indian-pink/10 p-3 rounded-full">
                <Clock className="h-6 w-6 text-indian-pink" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Working Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Enter subject"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Enter your message"
                  rows={6}
                />
              </div>

              <Button type="submit" className="w-full bg-indian-pink hover:bg-indian-pink/90" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Find Us on the Map</h2>
        <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
          <p className="text-gray-500">Map will be displayed here</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((faq) => (
            <div key={faq} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-2">Frequently Asked Question {faq}</h3>
              <p className="text-gray-600">
                This is a sample answer to the frequently asked question. It provides helpful information to common
                inquiries from our customers.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

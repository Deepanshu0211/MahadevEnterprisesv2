import Hero from "@/components/home/hero"
import FeaturedProducts from "@/components/home/featured-products"
import BestSellers from "@/components/home/best-sellers"
import Testimonials from "@/components/home/testimonials"
import Newsletter from "@/components/home/newsletter"
import HandcraftedBanner from "@/components/home/handcrafted-banner"
import NewArrivals from "@/components/home/new-arrivals"
import WhyChooseUs from "@/components/home/why-choose-us"
import FeaturedCollections from "@/components/home/featured-collections"
import InstagramFeed from "@/components/home/instagram-feed"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedCollections />
      <FeaturedProducts />
      <HandcraftedBanner />
      <NewArrivals />
      <BestSellers />
      <WhyChooseUs />
      <InstagramFeed />
      <Testimonials />
      <Newsletter />
    </main>
  )
}

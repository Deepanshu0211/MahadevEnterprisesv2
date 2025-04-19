import Link from "next/link"
import { Button } from "@/components/ui/button"

const collections = [
  {
    id: 1,
    name: "Rajasthani Heritage",
    description: "Vibrant handicrafts from the desert state of Rajasthan",
    image: "/placeholder.svg?height=600&width=800",
    productCount: 42,
    featured: true,
  },
  {
    id: 2,
    name: "Kerala Treasures",
    description: "Traditional crafts from God's own country",
    image: "/placeholder.svg?height=600&width=800",
    productCount: 36,
    featured: true,
  },
  {
    id: 3,
    name: "Madhubani Magic",
    description: "Ancient art form from Bihar with intricate patterns",
    image: "/placeholder.svg?height=600&width=800",
    productCount: 28,
    featured: true,
  },
  {
    id: 4,
    name: "Gujarati Crafts",
    description: "Colorful textiles and handicrafts from Gujarat",
    image: "/placeholder.svg?height=600&width=800",
    productCount: 34,
  },
  {
    id: 5,
    name: "Kashmiri Elegance",
    description: "Exquisite craftsmanship from the valley of Kashmir",
    image: "/placeholder.svg?height=600&width=800",
    productCount: 22,
  },
  {
    id: 6,
    name: "Bengali Artistry",
    description: "Traditional crafts from West Bengal",
    image: "/placeholder.svg?height=600&width=800",
    productCount: 31,
  },
  {
    id: 7,
    name: "Tamil Traditions",
    description: "Ancient crafts from Tamil Nadu",
    image: "/placeholder.svg?height=600&width=800",
    productCount: 27,
  },
  {
    id: 8,
    name: "Himalayan Handicrafts",
    description: "Unique crafts from the Himalayan regions",
    image: "/placeholder.svg?height=600&width=800",
    productCount: 19,
  },
]

export default function CollectionsPage() {
  // Featured collections
  const featuredCollections = collections.filter((collection) => collection.featured)
  // Regular collections
  const regularCollections = collections.filter((collection) => !collection.featured)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Collections</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our curated collections of authentic Indian handicrafts from different regions and traditions
        </p>
      </div>

      {/* Featured Collections */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Featured Collections</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredCollections.map((collection) => (
            <div
              key={collection.id}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
              <img
                src={collection.image || "/placeholder.svg"}
                alt={collection.name}
                className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                <p className="text-white/80 mb-4">{collection.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-80">{collection.productCount} Products</span>
                  <Link href={`/collections/${collection.id}`}>
                    <Button className="bg-indian-pink hover:bg-indian-pink/90">Explore Collection</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Collections */}
      <div>
        <h2 className="text-2xl font-bold mb-8">All Collections</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularCollections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-indian-pink transition-colors">
                  {collection.name}
                </h3>
                <p className="text-gray-600 mb-4">{collection.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{collection.productCount} Products</span>
                  <span className="text-indian-pink font-medium text-sm group-hover:underline">View Collection</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

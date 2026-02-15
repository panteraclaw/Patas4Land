import Image from 'next/image'
import Link from 'link'

// TODO: Replace with real data from DB
const MOCK_LISTINGS = [
  {
    id: 1,
    imageUrl: '/placeholder-feet.jpg',
    price: 0.01,
    seller: '0x1234...5678',
    rating: 5,
    sales: 12
  },
  // Add more mock items
]

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Marketplace
          </h1>
          <p className="text-purple-200 text-lg">
            Premium content, verified sellers, 10% to trees 🌲
          </p>
        </div>

        {/* Filters (coming soon) */}
        <div className="mb-8 flex gap-4">
          <button className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600">
            All
          </button>
          <button className="px-6 py-2 bg-slate-800 text-purple-200 rounded-lg hover:bg-slate-700">
            Top Rated
          </button>
          <button className="px-6 py-2 bg-slate-800 text-purple-200 rounded-lg hover:bg-slate-700">
            New
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MOCK_LISTINGS.map((listing) => (
            <Link key={listing.id} href={`/marketplace/${listing.id}`}>
              <div className="bg-slate-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-yellow-400 transition-all cursor-pointer">
                {/* Image */}
                <div className="aspect-square bg-slate-700 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                    📸 Preview
                  </div>
                </div>
                
                {/* Info */}
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-bold text-lg">
                      {listing.price} ETH
                    </span>
                    <span className="text-green-400 text-sm">
                      ⭐ {listing.rating}/5
                    </span>
                  </div>
                  
                  <div className="text-xs text-purple-300">
                    Seller: {listing.seller}
                  </div>
                  
                  <div className="text-xs text-slate-400">
                    {listing.sales} sales
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon Banner */}
        <div className="mt-12 p-8 bg-gradient-to-r from-purple-900 to-slate-900 rounded-lg border border-purple-700 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            🤖 Agent Integration Coming Soon
          </h3>
          <p className="text-purple-200">
            Sellers will be able to list via Telegram bot. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  )
}

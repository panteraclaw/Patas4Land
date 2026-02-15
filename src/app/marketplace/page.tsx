import Image from 'next/image'
import Link from 'next/link'
import { db, listings, users } from '@/db/schema'
import { eq } from 'drizzle-orm'

async function getListings() {
  try {
    const { db } = await import('@/db')
    const { listings, users } = await import('@/db/schema')
    const { eq, desc } = await import('drizzle-orm')

    const results = await db
      .select({
        id: listings.id,
        imageUrl: listings.imageUrl,
        thumbnailUrl: listings.thumbnailUrl,
        price: listings.price,
        tags: listings.tags,
        status: listings.status,
        views: listings.views,
        purchases: listings.purchases,
        createdAt: listings.createdAt,
        sellerUsername: users.telegramUsername,
        sellerWallet: users.monadWallet,
      })
      .from(listings)
      .leftJoin(users, eq(listings.sellerId, users.id))
      .where(eq(listings.status, 'active'))
      .orderBy(desc(listings.createdAt))

    return results
  } catch (error) {
    console.error('Error fetching listings:', error)
    return []
  }
}

export default async function MarketplacePage() {
  const items = await getListings()

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Marketplace 🦶
          </h1>
          <p className="text-purple-200 text-lg">
            Premium content, verified sellers, powered by Monad
          </p>
        </div>

        {/* Filters */}
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
        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-purple-300 mb-4">No listings yet 👀</p>
            <p className="text-slate-400">Sellers can list via our Telegram bot</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-slate-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-yellow-400 transition-all">
                {/* Preview Image (blurred) */}
                <div className="aspect-square bg-slate-700 relative overflow-hidden">
                  {item.thumbnailUrl ? (
                    <img
                      src={item.thumbnailUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                      📸 Preview
                    </div>
                  )}
                  {/* Blur overlay for extra effect */}
                  <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px]" />
                  <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white">
                    🔒 Buy to unlock HD
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 font-bold text-lg">
                      {item.price} MON
                    </span>
                    {item.tags && Array.isArray(item.tags) && (
                      <div className="flex gap-1">
                        {(item.tags as string[]).map((tag: string, i: number) => (
                          <span key={i} className="text-xs bg-purple-900 text-purple-200 px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-purple-300">
                    Seller: {item.sellerUsername || 'Anonymous'}
                  </div>

                  <div className="flex justify-between text-xs text-slate-400">
                    <span>👁 {item.views || 0} views</span>
                    <span>🛒 {item.purchases || 0} sales</span>
                  </div>

                  {/* Buy button - links to Telegram bot */}
                  <div className="pt-2">
                    <a
                      href={`https://t.me/Patas4Land_bot?start=buy_${item.id}`}
                      target="_blank"
                      className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all font-semibold"
                    >
                      Buy via Telegram 💬
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bot CTA */}
        <div className="mt-12 p-8 bg-gradient-to-r from-purple-900 to-slate-900 rounded-lg border border-purple-700 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            🤖 Sell via Telegram
          </h3>
          <p className="text-purple-200 mb-4">
            Send a photo + price to our bot and start selling instantly
          </p>
          <a
            href="https://t.me/Patas4Land_bot"
            target="_blank"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 font-semibold"
          >
            Open Bot →
          </a>
        </div>
      </div>
    </div>
  )
}

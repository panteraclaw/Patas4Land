import Image from 'next/image'
import Link from 'next/link'

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

type ListingItem = Awaited<ReturnType<typeof getListings>>[number];

export default async function MarketplacePage() {
  const items = await getListings()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/logo.jpg" 
              alt="Patas4Land" 
              width={50} 
              height={50}
              className="transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-bold tracking-tight">PATAS4LAND</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link 
              href="https://t.me/pata_monad_bot" 
              target="_blank"
              className="px-5 py-2 bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition-all font-semibold text-sm"
            >
              Sell Content
            </Link>
          </div>
        </nav>
      </header>

      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-full mb-6">
              <span className="text-yellow-500 text-sm">●</span>
              <span className="text-gray-400 text-sm">{items.length} exclusive listings</span>
            </div>

            <h1 className="text-6xl font-bold tracking-tight leading-none mb-6">
              The{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
                vault
              </span>
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
              Premium content from verified creators. Instant access. Complete discretion.
            </p>
          </div>
        </div>

        {/* Filters - Minimalista */}
        <div className="flex items-center gap-3 mb-12 overflow-x-auto pb-2">
          <button className="px-6 py-2.5 bg-white text-black rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-100 transition-colors">
            All
          </button>
          <button className="px-6 py-2.5 bg-gray-900 text-gray-400 border border-gray-800 rounded-full font-medium text-sm whitespace-nowrap hover:text-white hover:border-gray-700 transition-colors">
            Top Rated
          </button>
          <button className="px-6 py-2.5 bg-gray-900 text-gray-400 border border-gray-800 rounded-full font-medium text-sm whitespace-nowrap hover:text-white hover:border-gray-700 transition-colors">
            Latest
          </button>
          <button className="px-6 py-2.5 bg-gray-900 text-gray-400 border border-gray-800 rounded-full font-medium text-sm whitespace-nowrap hover:text-white hover:border-gray-700 transition-colors">
            Most Sold
          </button>
        </div>

        {/* Grid */}
        {items.length === 0 ? (
          <div className="py-32 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-900 border border-gray-800 rounded-full mb-6">
              <span className="text-4xl">👀</span>
            </div>
            <h3 className="text-3xl font-bold mb-4">No listings yet</h3>
            <p className="text-gray-400 text-lg mb-8">
              Be the first creator on the platform
            </p>
            <Link 
              href="https://t.me/pata_monad_bot"
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition-all font-semibold"
            >
              Start Selling
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item: ListingItem) => (
              <div 
                key={item.id} 
                className="group relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300"
              >
                {/* Preview Image */}
                <div className="aspect-square bg-gray-950 relative overflow-hidden">
                  {item.thumbnailUrl ? (
                    <img
                      src={item.thumbnailUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl mb-3">🔒</div>
                        <div className="text-sm text-gray-500">HD Content</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Blur overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent backdrop-blur-[2px]" />
                  
                  {/* Lock badge */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white font-medium border border-gray-700">
                    🔐 HD
                  </div>

                  {/* Quick stats */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-gray-300">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {item.views || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {item.purchases || 0}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 space-y-4">
                  {/* Price & Tags */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-2xl font-bold text-yellow-500">
                        {item.price} <span className="text-base text-gray-500">USDC</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        by {item.sellerUsername || 'Anonymous'}
                      </div>
                    </div>
                    
                    {item.tags && Array.isArray(item.tags) && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 justify-end">
                        {(item.tags as string[]).slice(0, 2).map((tag: string, i: number) => (
                          <span 
                            key={i} 
                            className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-md border border-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Buy button */}
                  <a
                    href={`https://t.me/pata_monad_bot?start=buy_${item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-gradient-to-r from-yellow-500 to-amber-600 text-black py-3 rounded-xl hover:shadow-lg hover:shadow-yellow-500/50 transition-all font-semibold"
                  >
                    Unlock Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-24 relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent" />
          <div className="relative bg-gray-900 border border-gray-800 p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="text-5xl mb-6">💰</div>
              <h3 className="text-3xl font-bold mb-4">
                Start earning today
              </h3>
              <p className="text-gray-400 text-lg mb-8">
                Upload content via Telegram. Set your price. Get paid in crypto.
                <br />
                <span className="text-yellow-500 font-medium">You keep 90%.</span>
              </p>
              <Link 
                href="https://t.me/pata_monad_bot"
                target="_blank"
                className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition-all font-semibold text-lg"
              >
                Open Telegram Bot
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-900 py-12 px-6 mt-24">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Image src="/logo.jpg" alt="Logo" width={40} height={40} />
              <span className="text-gray-500 text-sm">© 2026 Patas4Land. Built on Monad.</span>
            </div>
            
            <div className="flex items-center gap-6">
              <Link href="https://twitter.com/patas4Land" target="_blank" className="text-gray-500 hover:text-white transition-colors text-sm">
                Twitter
              </Link>
              <Link href="https://t.me/pata_monad_bot" target="_blank" className="text-gray-500 hover:text-white transition-colors text-sm">
                Telegram
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

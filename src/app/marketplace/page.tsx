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
      {/* Navigation - Mismo estilo que home */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-900">
        <div className="container mx-auto px-8 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <Image 
              src="/logo-v2.png" 
              alt="Patas4Land" 
              width={48} 
              height={48}
            />
          </Link>
          
          <div className="flex items-center gap-8">
            <Link 
              href="/" 
              className="text-sm tracking-wider uppercase opacity-70 hover:opacity-100 transition-opacity"
            >
              Home
            </Link>
            <Link 
              href="https://t.me/pata_monad_bot" 
              target="_blank"
              className="px-6 py-2 border border-gray-800 hover:border-gray-600 rounded-full text-sm tracking-wider uppercase transition-all"
            >
              List Content
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-24 px-8">
        <div className="container mx-auto">
          {/* Page Header */}
          <div className="max-w-4xl mx-auto mb-24 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-6">
              {items.length} Premium Listings
            </p>
            
            <h1 className="text-6xl md:text-8xl font-light mb-8">
              The
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
                Vault
              </span>
            </h1>

            <p className="text-xl text-gray-500 leading-loose">
              Exclusive content. Verified creators. Instant access.
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <button className="px-8 py-3 bg-white text-black rounded-full text-sm tracking-wider uppercase font-medium hover:bg-gray-100 transition-colors">
              All
            </button>
            <button className="px-8 py-3 bg-transparent border border-gray-800 hover:border-gray-600 rounded-full text-sm tracking-wider uppercase font-medium transition-colors">
              Top Rated
            </button>
            <button className="px-8 py-3 bg-transparent border border-gray-800 hover:border-gray-600 rounded-full text-sm tracking-wider uppercase font-medium transition-colors">
              New
            </button>
          </div>

          {/* Grid */}
          {items.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-32">
              <div className="mb-12">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border border-gray-900 mb-8">
                  <span className="text-4xl opacity-50">🔒</span>
                </div>
                <h3 className="text-4xl font-light mb-6">
                  The vault awaits
                </h3>
                <p className="text-gray-500 text-lg leading-loose mb-12">
                  Be the first creator to list premium content.
                  <br />
                  Set your price. Keep 90%. Plant trees with every sale.
                </p>
              </div>
              
              <Link 
                href="https://t.me/pata_monad_bot"
                target="_blank"
                className="inline-block group relative px-10 py-4 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-600 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                <span className="relative z-10 text-black font-medium tracking-wider">
                  Start Selling
                </span>
              </Link>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {items.map((item: ListingItem) => (
                  <div 
                    key={item.id} 
                    className="group relative"
                  >
                    {/* Card */}
                    <div className="relative bg-gray-950 border border-gray-900 group-hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all duration-500">
                      {/* Image Container */}
                      <div className="relative aspect-[3/4] bg-black overflow-hidden">
                        {item.thumbnailUrl ? (
                          <img
                            src={item.thumbnailUrl}
                            alt="Content preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center space-y-4">
                              <div className="text-5xl opacity-20">🔒</div>
                              <div className="text-sm text-gray-700 tracking-wider uppercase">
                                Premium
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Blur overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent backdrop-blur-[1px]" />
                        
                        {/* Lock badge */}
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-800">
                          <span className="text-xs tracking-wider text-gray-400">HD</span>
                        </div>

                        {/* Stats overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {item.views || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {item.purchases || 0}
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-6 space-y-4">
                        {/* Price */}
                        <div className="flex items-baseline justify-between">
                          <div>
                            <div className="text-3xl font-light text-amber-400">
                              ${item.price}
                            </div>
                            <div className="text-xs text-gray-600 mt-1 tracking-wider uppercase">
                              USDC
                            </div>
                          </div>
                          
                          {/* Tags */}
                          {item.tags && Array.isArray(item.tags) && item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 justify-end">
                              {(item.tags as string[]).slice(0, 2).map((tag: string, i: number) => (
                                <span 
                                  key={i} 
                                  className="text-xs px-2 py-1 bg-gray-900 border border-gray-800 rounded text-gray-500"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Seller */}
                        <div className="text-xs text-gray-600 tracking-wider">
                          by {item.sellerUsername || 'Anonymous'}
                        </div>

                        {/* CTA */}
                        <a
                          href={`https://t.me/pata_monad_bot?start=buy_${item.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center py-3 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-yellow-500 hover:to-amber-600 text-black rounded-lg font-medium tracking-wider uppercase text-sm transition-all"
                        >
                          Unlock
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="max-w-4xl mx-auto mt-32 text-center">
            <div className="relative py-20 px-12 rounded-3xl border border-gray-900 overflow-hidden">
              <div className="relative z-10">
                <div className="text-5xl mb-6">🌳</div>
                <h3 className="text-4xl font-light mb-4">
                  Monetize your content.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                    Plant trees.
                  </span>
                </h3>
                <p className="text-gray-500 text-lg leading-loose mb-8">
                  Upload via Telegram. Set your price. Keep 90%.
                  <br />
                  <span className="text-green-500 font-medium">10% goes to reforestation.</span>
                </p>
                <Link 
                  href="https://t.me/pata_monad_bot"
                  target="_blank"
                  className="inline-block px-10 py-4 border border-gray-800 hover:border-gray-600 rounded-full font-medium tracking-wider uppercase text-sm transition-all"
                >
                  Start Selling
                </Link>
              </div>
              
              {/* Background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Mismo que home */}
      <footer className="border-t border-gray-900 py-12 px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <Image src="/logo-v2.png" alt="Logo" width={32} height={32} className="opacity-40" />
              <span>Patas4Land © 2026</span>
            </div>
            
            <div className="flex items-center gap-8">
              <Link href="https://twitter.com/patas4Land" target="_blank" className="hover:text-white transition-colors">
                Twitter
              </Link>
              <Link href="https://t.me/pata_monad_bot" target="_blank" className="hover:text-white transition-colors">
                Telegram
              </Link>
              <span className="text-gray-800">•</span>
              <span className="font-mono text-xs text-gray-700">
                Built on Monad
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

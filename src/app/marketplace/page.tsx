'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react';

type ListingItem = {
  id: string;
  imageUrl: string;
  thumbnailUrl: string | null;
  price: string;
  tags: unknown;
  status: string;
  views: number | null;
  purchases: number | null;
  createdAt: Date | null;
  sellerUsername: string | null;
  sellerWallet: string | null;
  sellerAge: number | null;
  sellerCountry: string | null;
  sellerBio: string | null;
};

export default function MarketplacePage() {
  const [items, setItems] = useState<ListingItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Fetch listings on mount
  useEffect(() => {
    async function fetchListings() {
      try {
        const res = await fetch('/api/listings/create');
        const data = await res.json();
        if (data.success) {
          setItems(data.listings);
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchListings();
  }, []);

  // Filter by category
  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => {
        const tags = Array.isArray(item.tags) ? item.tags as string[] : [];
        return tags.includes(activeCategory);
      });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-900">
        <div className="container mx-auto px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <Image 
              src="/logo.png" 
              alt="Patas4Land" 
              width={40} 
              height={40}
            />
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="text-sm tracking-wider uppercase text-gray-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link 
              href="https://t.me/pata_monad_bot" 
              target="_blank"
              className="px-5 py-2 bg-yellow-500 text-black rounded-full text-sm font-semibold hover:bg-yellow-400 transition-all"
            >
              Start Selling
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-24 px-8">
        <div className="container mx-auto">
          {/* Page Header */}
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-4">
              {filteredItems.length} Sellers Online
            </p>
            
            <h1 className="text-4xl md:text-5xl font-light mb-6">
              Browse
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
                Content
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-500 leading-loose">
              Premium foot content from verified sellers worldwide
            </p>
          </div>

          {/* Categories - Functional */}
          <div className="flex items-center justify-center gap-3 mb-16 flex-wrap">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-8 py-3 rounded-full text-sm tracking-wider uppercase font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-white text-black'
                  : 'bg-transparent border border-gray-800 hover:border-gray-600'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveCategory('verified')}
              className={`px-8 py-3 rounded-full text-sm tracking-wider uppercase font-medium transition-colors ${
                activeCategory === 'verified'
                  ? 'bg-white text-black'
                  : 'bg-transparent border border-gray-800 hover:border-gray-600'
              }`}
            >
              Verified
            </button>
            <button 
              onClick={() => setActiveCategory('new')}
              className={`px-8 py-3 rounded-full text-sm tracking-wider uppercase font-medium transition-colors ${
                activeCategory === 'new'
                  ? 'bg-white text-black'
                  : 'bg-transparent border border-gray-800 hover:border-gray-600'
              }`}
            >
              New
            </button>
            <button 
              onClick={() => setActiveCategory('hd')}
              className={`px-8 py-3 rounded-full text-sm tracking-wider uppercase font-medium transition-colors ${
                activeCategory === 'hd'
                  ? 'bg-white text-black'
                  : 'bg-transparent border border-gray-800 hover:border-gray-600'
              }`}
            >
              HD
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-32">
              <div className="inline-flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredItems.length === 0 && (
            <div className="max-w-2xl mx-auto text-center py-32">
              <div className="mb-12">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border border-gray-900 mb-8">
                  <span className="text-4xl opacity-50">👀</span>
                </div>
                <h3 className="text-3xl font-light mb-4">
                  {activeCategory === 'all' ? 'No listings yet' : `No ${activeCategory} content found`}
                </h3>
                <p className="text-gray-500 leading-loose mb-10">
                  Be the first seller in this category
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
          )}

          {/* Grid - FunWithFeet Style */}
          {!loading && filteredItems.length > 0 && (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item: ListingItem) => (
                  <div 
                    key={item.id} 
                    className="group relative bg-gray-950 border border-gray-900 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300"
                  >
                    {/* Preview Image */}
                    <div className="relative aspect-[4/5] bg-black overflow-hidden">
                      {item.thumbnailUrl ? (
                        <img
                          src={item.thumbnailUrl}
                          alt="Preview"
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      
                      {/* Stats overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {item.views || 0}
                        </span>
                        <span className="text-yellow-500 font-medium">
                          ${item.price}
                        </span>
                      </div>
                    </div>

                    {/* Seller Info - FunWithFeet Style */}
                    <div className="p-6 space-y-4">
                      {/* Seller Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-medium">
                              {item.sellerUsername || 'Anonymous'}
                            </h3>
                            {/* Country flag */}
                            {item.sellerCountry && (
                              <span className="text-xl">
                                {getFlagEmoji(item.sellerCountry)}
                              </span>
                            )}
                          </div>
                          
                          {/* Age */}
                          {item.sellerAge && (
                            <div className="text-sm text-gray-500">
                              {item.sellerAge} years old
                            </div>
                          )}
                        </div>
                        
                        {(() => {
                          const tags = item.tags;
                          if (tags && Array.isArray(tags) && tags.length > 0) {
                            return (
                              <div className="flex flex-wrap gap-1 justify-end">
                                {(tags as string[]).slice(0, 2).map((tag: string, i: number) => (
                                  <span 
                                    key={i} 
                                    className="text-xs px-2 py-1 bg-gray-900 border border-gray-800 rounded text-gray-500"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            );
                          }
                          return null;
                        })()}
                      </div>

                      {/* Bio/Description */}
                      {item.sellerBio && (
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                          {item.sellerBio}
                        </p>
                      )}

                      {/* Gallery indicator */}
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Gallery available</span>
                      </div>

                      {/* CTA */}
                      <a
                        href={`https://t.me/pata_monad_bot?start=buy_${item.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center py-3 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black rounded-xl font-semibold tracking-wider uppercase text-sm transition-all"
                      >
                        View Profile
                      </a>
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
                <h3 className="text-3xl font-light mb-4">
                  Start selling today
                </h3>
                <p className="text-gray-500 leading-loose mb-8">
                  Upload your content via Telegram. Set your price. Get paid instantly.
                  <br />
                  <span className="text-green-500 font-medium">7% supports reforestation.</span>
                </p>
                <Link 
                  href="https://t.me/pata_monad_bot"
                  target="_blank"
                  className="inline-block px-10 py-4 border border-gray-800 hover:border-gray-600 rounded-full font-medium tracking-wider uppercase text-sm transition-all"
                >
                  Open Telegram Bot
                </Link>
              </div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-900 py-12 px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Logo" width={32} height={32} className="opacity-40" />
              <span>Patas4Land © 2026</span>
            </div>
            
            <div className="flex items-center gap-8">
              <Link href="https://twitter.com/patas4Land" target="_blank" className="hover:text-white transition-colors">
                Twitter
              </Link>
              <Link href="https://t.me/pata_monad_bot" target="_blank" className="hover:text-white transition-colors">
                Telegram
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Helper: Convert country code to flag emoji
function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

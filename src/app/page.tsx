import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-900">
        <div className="container mx-auto px-8 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image 
              src="/logo-v2.png" 
              alt="Patas4Land" 
              width={48} 
              height={48}
            />
          </Link>
          
          <div className="flex items-center gap-8">
            <Link 
              href="/marketplace" 
              className="text-sm tracking-wider uppercase text-gray-400 hover:text-white transition-colors"
            >
              Browse
            </Link>
            <Link 
              href="https://t.me/pata_monad_bot" 
              target="_blank"
              className="px-6 py-2 bg-yellow-500 text-black rounded-full text-sm font-semibold hover:bg-yellow-400 transition-all"
            >
              Start Selling
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-8">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-full mb-12">
              <span className="text-yellow-500 text-sm">●</span>
              <span className="text-gray-400 text-sm">Premium Foot Content Marketplace</span>
            </div>

            {/* Main headline */}
            <h1 className="text-7xl md:text-9xl font-light tracking-tight leading-[0.9] mb-12">
              Sell your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200">
                foot pics
              </span>
              <br />
              <span className="font-light text-gray-600">earn crypto.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto mb-16">
              The easiest way to monetize your feet content.
              <br />
              Set your price, get paid instantly in USDC.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href="/marketplace"
                className="group relative px-10 py-4 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="relative z-10 text-black font-medium tracking-wide">
                  Browse Content
                </span>
              </Link>
              
              <Link 
                href="https://t.me/pata_monad_bot"
                target="_blank"
                className="px-10 py-4 border border-gray-800 hover:border-gray-600 transition-colors font-medium tracking-wide"
              >
                Start Selling
              </Link>
            </div>

            {/* Impact statement */}
            <div className="mt-20 pt-12 border-t border-gray-900">
              <p className="text-sm text-gray-600 leading-loose">
                <span className="text-green-500">10%</span> of every sale plants trees.
                <br />
                Support reforestation while earning.
              </p>
            </div>
          </div>
        </div>

        {/* Ambient gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/3 rounded-full blur-[150px] pointer-events-none" />
      </section>

      {/* Value Props */}
      <section className="py-32 px-8 border-t border-gray-900">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16">
            {[
              {
                label: 'Instant Payouts',
                value: 'Get paid immediately in USDC. You keep 90% of every sale.',
              },
              {
                label: 'Easy to Use',
                value: 'Upload via Telegram bot. Set your price. Done.',
              },
              {
                label: 'Global Reach',
                value: 'Sell to buyers worldwide. Crypto payments, no borders.',
              }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="mb-4 text-xs tracking-[0.3em] uppercase text-gray-600">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-3xl font-light mb-4 group-hover:text-amber-400 transition-colors">
                  {item.label}
                </h3>
                <p className="text-gray-500 leading-loose">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-8 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Section header */}
            <div className="mb-24 text-center">
              <p className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-6">
                How it works
              </p>
              <h2 className="text-5xl md:text-6xl font-light">
                Start earning in
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
                  3 simple steps
                </span>
              </h2>
            </div>

            {/* Steps */}
            <div className="space-y-24">
              {[
                {
                  num: '01',
                  title: 'Upload Your Content',
                  desc: 'Send your best foot pics to our Telegram bot. No app downloads needed.'
                },
                {
                  num: '02',
                  title: 'Set Your Price',
                  desc: 'Choose your price in USDC. You keep 90%, platform takes 10%.'
                },
                {
                  num: '03',
                  title: 'Get Paid Instantly',
                  desc: 'Buyers pay in crypto. You receive USDC directly to your wallet.'
                }
              ].map((step, i) => (
                <div 
                  key={i} 
                  className="relative pl-32 border-l border-gray-900 hover:border-amber-500/30 transition-colors group"
                >
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-20 h-20 rounded-full bg-black border border-gray-900 group-hover:border-amber-500/50 flex items-center justify-center transition-colors">
                    <span className="text-xs tracking-wider text-gray-600 group-hover:text-amber-500">
                      {step.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-light mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-lg leading-loose">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32 px-8 border-t border-gray-900">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { value: '$0', label: 'Setup Cost' },
              { value: '90%', label: 'Your Earnings' },
              { value: '10%', label: 'For Reforestation' },
              { value: '< 60s', label: 'Time to List' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-light mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600">
                  {stat.value}
                </div>
                <div className="text-xs tracking-[0.2em] uppercase text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-40 px-8 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl md:text-8xl font-light leading-[0.95] mb-12">
              Ready to
              <br />
              <span className="font-serif italic">monetize</span>
              <br />
              your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
                feet?
              </span>
            </h2>

            <p className="text-xl text-gray-500 mb-16 leading-loose">
              Join sellers already earning on Patas4Land.
              <br />
              Get started in less than a minute.
            </p>

            <Link 
              href="https://t.me/pata_monad_bot"
              target="_blank"
              className="inline-block group relative px-12 py-5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-600 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              <span className="relative z-10 text-black font-medium tracking-wider text-lg">
                Open Telegram Bot
              </span>
            </Link>
          </div>
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[200px] pointer-events-none" />
      </section>

      {/* Footer */}
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

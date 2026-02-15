import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header - Minimal elegante */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/logo.jpg" 
              alt="Patas4Land" 
              width={60} 
              height={60}
              className="transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-bold tracking-tight">PATAS4LAND</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/marketplace" 
              className="text-gray-400 hover:text-white transition-colors font-medium"
            >
              Explore
            </Link>
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

      {/* Hero - Noir dramático */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            {/* Badge discreto */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-full mb-8">
              <span className="text-yellow-500 text-sm">●</span>
              <span className="text-gray-400 text-sm">Anonymous • Secure • Premium</span>
            </div>

            {/* Headline impactante */}
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-none mb-6">
              Your{' '}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
                secret
              </span>
              <br />
              desires,
              <br />
              <span className="text-gray-500">monetized.</span>
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mb-10">
              Premium foot content marketplace. Discreet, decentralized, exclusive. 
              No judgment. Just quality.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/marketplace"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-full hover:bg-yellow-500 transition-all font-semibold text-lg"
              >
                Browse Collection
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link 
                href="https://t.me/pata_monad_bot"
                target="_blank"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-full transition-all font-semibold text-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
                Start Selling
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-gray-900">
              <div>
                <div className="text-3xl font-bold text-yellow-500">100%</div>
                <div className="text-sm text-gray-500 mt-1">Anonymous</div>
              </div>
              <div>
                <div className="text-3xl font-bold">$0</div>
                <div className="text-sm text-gray-500 mt-1">Setup Fee</div>
              </div>
              <div>
                <div className="text-3xl font-bold">10%</div>
                <div className="text-sm text-gray-500 mt-1">Platform Cut</div>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient Overlay sutil */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-yellow-500/5 to-transparent pointer-events-none" />
      </section>

      {/* How It Works - Elegante minimalista */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Three steps. <span className="text-gray-500">Zero bullshit.</span>
            </h2>
            <p className="text-gray-400 text-lg">
              From content to crypto in under 60 seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                num: '01',
                title: 'Send Content',
                desc: 'Drop your best shot in our Telegram bot. No sign-up, no forms.',
                icon: '📸'
              },
              {
                num: '02',
                title: 'Set Your Price',
                desc: 'Name your price in USDC. You keep 90%. We handle the rest.',
                icon: '💰'
              },
              {
                num: '03',
                title: 'Get Paid',
                desc: 'Instant blockchain payments. Anonymous. Borderless. Yours.',
                icon: '⚡'
              }
            ].map((step) => (
              <div key={step.num} className="group relative">
                <div className="absolute -inset-px bg-gradient-to-b from-yellow-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all">
                  <div className="text-5xl mb-6">{step.icon}</div>
                  <div className="text-yellow-500 text-sm font-mono mb-2">{step.num}</div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Noir con toques gold */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl font-bold mb-6">
                  Discreet.
                  <br />
                  <span className="text-gray-500">Decentralized.</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">
                    Exclusive.
                  </span>
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed mb-8">
                  We don't ask questions. We don't judge. We just provide the infrastructure 
                  for creators to monetize their craft with dignity and anonymity.
                </p>
                <Link 
                  href="/marketplace"
                  className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 font-semibold group"
                >
                  Explore the marketplace
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🔒', label: 'End-to-end encrypted' },
                  { icon: '💳', label: 'Crypto payments only' },
                  { icon: '🎭', label: 'Full anonymity' },
                  { icon: '⚡', label: 'Instant settlements' }
                ].map((feature, i) => (
                  <div 
                    key={i}
                    className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-yellow-500/50 transition-all"
                  >
                    <div className="text-3xl mb-3">{feature.icon}</div>
                    <div className="text-sm text-gray-400">{feature.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* CTA Final - Impactante */}
      <section className="py-32 px-6 relative">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Ready to turn curiosity
              <br />
              into <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">currency</span>?
            </h2>
            
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Join creators already earning on their terms. Anonymous. Autonomous. Unstoppable.
            </p>

            <Link 
              href="https://t.me/pata_monad_bot"
              target="_blank"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-yellow-500 to-amber-600 text-black rounded-full hover:shadow-2xl hover:shadow-yellow-500/50 transition-all font-bold text-lg"
            >
              Open Telegram Bot
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 via-transparent to-transparent pointer-events-none" />
      </section>

      {/* Footer - Minimal */}
      <footer className="border-t border-gray-900 py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Image src="/logo.jpg" alt="Logo" width={40} height={40} />
              <span className="text-gray-500 text-sm">© 2026 Patas4Land. Built on Monad.</span>
            </div>
            
            <div className="flex items-center gap-6">
              <Link href="https://twitter.com/patas4Land" target="_blank" className="text-gray-500 hover:text-white transition-colors">
                Twitter
              </Link>
              <Link href="https://t.me/pata_monad_bot" target="_blank" className="text-gray-500 hover:text-white transition-colors">
                Telegram
              </Link>
              <span className="text-gray-700">•</span>
              <span className="text-xs text-gray-600 font-mono">
                0xF383a61f1a68ee4A77a1b7F57D8f2d948B5f7777
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center space-y-8 relative z-10">
          {/* Logo with glow */}
          <div className="relative">
            <div className="absolute inset-0 bg-red-600/20 blur-3xl rounded-full"></div>
            <Image 
              src="/logo.jpg" 
              alt="Patas4Land" 
              width={280} 
              height={280}
              className="rounded-2xl shadow-2xl relative z-10 border-2 border-red-900/30"
            />
          </div>
          
          {/* Headline */}
          <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight">
            Patas<span className="text-red-500">4</span>Land
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 max-w-3xl font-light">
            <span className="text-red-400 font-semibold">Fetish for Forest</span>
            <br />
            Where desire meets conservation
          </p>

          <p className="text-sm text-gray-500 max-w-xl">
            Agent-powered marketplace on <span className="text-purple-400 font-semibold">Monad</span>. 
            Pay in <span className="text-green-400 font-semibold">USDC</span>. 
            <span className="text-emerald-400"> 10% plants trees</span>.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 w-full max-w-2xl">
            <div className="text-center p-6 bg-black/40 rounded-lg border border-red-900/20 backdrop-blur">
              <div className="text-4xl font-bold text-emerald-400">10%</div>
              <div className="text-sm text-gray-400 mt-2">To Reforestation</div>
            </div>
            <div className="text-center p-6 bg-black/40 rounded-lg border border-red-900/20 backdrop-blur">
              <div className="text-4xl font-bold">🤖</div>
              <div className="text-sm text-gray-400 mt-2">Agent-Powered</div>
            </div>
            <div className="text-center p-6 bg-black/40 rounded-lg border border-red-900/20 backdrop-blur">
              <div className="text-4xl font-bold text-purple-400">⚡</div>
              <div className="text-sm text-gray-400 mt-2">Monad Chain</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 mt-16">
            <Link 
              href="/marketplace"
              className="px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-500 hover:to-red-600 transition-all shadow-lg hover:shadow-red-500/50 glow-red"
            >
              Explore Marketplace
            </Link>
            <Link 
              href="/login"
              className="px-10 py-4 bg-black/60 border-2 border-red-900/40 text-white font-semibold rounded-lg hover:bg-black/80 hover:border-red-700/60 transition-all backdrop-blur"
            >
              Connect Wallet
            </Link>
          </div>

          {/* Tagline */}
          <p className="text-sm text-gray-500 mt-16 italic max-w-md">
            "Every purchase plants a tree. Every tree fights climate change. Every transaction on Monad."
          </p>
        </div>
      </div>

      {/* How It Works - Dark elegant */}
      <div className="container mx-auto px-4 py-20 border-t border-red-900/10">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center space-y-4 p-8 bg-black/30 rounded-xl border border-red-900/20 backdrop-blur">
            <div className="text-6xl">📸</div>
            <h3 className="text-xl font-bold text-white">Send via Telegram</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sellers send photos to our OpenClaw agent. No website, no hassle. Just pure convenience.
            </p>
          </div>
          
          <div className="text-center space-y-4 p-8 bg-black/30 rounded-xl border border-red-900/20 backdrop-blur">
            <div className="text-6xl">🤖</div>
            <h3 className="text-xl font-bold text-white">Agent Handles Everything</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bot auto-lists, prices, manages sales, and handles USDC payments on Monad. Zero effort.
            </p>
          </div>
          
          <div className="text-center space-y-4 p-8 bg-black/30 rounded-xl border border-red-900/20 backdrop-blur">
            <div className="text-6xl">🌲</div>
            <h3 className="text-xl font-bold text-white">10% Plants Trees</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Every sale automatically contributes to verified reforestation projects. Guilt-free pleasure.
            </p>
          </div>
        </div>
      </div>

      {/* Monad Badge */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-purple-900/20 to-black/40 rounded-2xl border border-purple-700/30 backdrop-blur text-center">
          <p className="text-purple-300 text-sm mb-2">POWERED BY</p>
          <h3 className="text-3xl font-bold text-white mb-3">
            ⚡ Monad Blockchain
          </h3>
          <p className="text-gray-400 text-sm">
            High-performance EVM. USDC payments. Instant settlements. Built for agents.
          </p>
        </div>
      </div>
    </div>
  )
}

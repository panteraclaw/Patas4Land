import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Logo */}
          <Image 
            src="/logo.jpg" 
            alt="Patas4Land" 
            width={300} 
            height={300}
            className="rounded-lg shadow-2xl"
          />
          
          {/* Headline */}
          <h1 className="text-6xl font-bold text-white tracking-tight">
            Patas<span className="text-yellow-400">4</span>Land
          </h1>
          
          <p className="text-2xl text-purple-200 max-w-2xl">
            <span className="text-yellow-400">Fetish for Forest</span>
            <br />
            Agent-powered marketplace where feet meet philanthropy
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400">10%</div>
              <div className="text-sm text-purple-200">To Reforestation</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">🤖</div>
              <div className="text-sm text-purple-200">Agent-Powered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">Web3</div>
              <div className="text-sm text-purple-200">Crypto Native</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 mt-12">
            <Link 
              href="/marketplace"
              className="px-8 py-4 bg-yellow-400 text-slate-900 font-bold rounded-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl"
            >
              Explore Marketplace
            </Link>
            <Link 
              href="/login"
              className="px-8 py-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-500 transition-all shadow-lg hover:shadow-xl"
            >
              Connect Wallet
            </Link>
          </div>

          {/* Tagline */}
          <p className="text-sm text-purple-300 mt-12 italic">
            "Every purchase plants a tree. Every tree saves the planet."
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-4 py-20 border-t border-purple-700">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <div className="text-5xl">📸</div>
            <h3 className="text-xl font-bold text-white">Send Photos</h3>
            <p className="text-purple-200">Sellers send pics via Telegram to our agent</p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="text-5xl">🤖</div>
            <h3 className="text-xl font-bold text-white">Agent Lists</h3>
            <p className="text-purple-200">Bot auto-lists, prices, and manages sales</p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="text-5xl">🌲</div>
            <h3 className="text-xl font-bold text-white">10% Plants Trees</h3>
            <p className="text-purple-200">Every sale contributes to reforestation</p>
          </div>
        </div>
      </div>
    </div>
  )
}

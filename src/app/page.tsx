'use client'

import Link from 'next/link'
import Image from 'next/image'
import AgeGate from '../components/AgeGate'
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function HomePage() {
  return (
    <AgeGate>
      <div className="min-h-screen relative overflow-hidden">
        {/* Subtle animated background */}
        <div className="fixed inset-0 bg-[#0a0008] -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/10 via-transparent to-purple-950/10"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-900/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>

        {/* Hero Section */}
        <motion.div 
          className="container mx-auto px-4 pt-32 pb-20"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            {/* Logo with elegant entrance */}
            <motion.div 
              variants={fadeInUp}
              className="flex justify-center mb-12"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-red-600/20 blur-2xl rounded-full group-hover:bg-red-600/30 transition-all duration-700"></div>
                <Image 
                  src="/logo.jpg" 
                  alt="Patas4Land" 
                  width={200} 
                  height={200}
                  className="rounded-2xl relative z-10 border border-red-900/30 shadow-2xl"
                />
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={fadeInUp} className="text-center space-y-6 mb-16">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
                Patas<span className="text-red-500">4</span>Land
              </h1>
              
              <p className="text-3xl md:text-4xl text-gray-300 font-light tracking-wide">
                <span className="text-red-400 font-medium">Fetish for Forest</span>
              </p>

              <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Where pleasure meets purpose. Premium content, verified creators,
                <span className="text-emerald-400 font-semibold"> 10% reforestation</span>.
              </p>
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              <div className="px-6 py-3 bg-purple-950/40 border border-purple-700/30 rounded-full backdrop-blur-sm">
                <span className="text-purple-300 font-medium">⚡ Monad Chain</span>
              </div>
              <div className="px-6 py-3 bg-green-950/40 border border-green-700/30 rounded-full backdrop-blur-sm">
                <span className="text-green-300 font-medium">💵 USDC Payments</span>
              </div>
              <div className="px-6 py-3 bg-emerald-950/40 border border-emerald-700/30 rounded-full backdrop-blur-sm">
                <span className="text-emerald-300 font-medium">🌲 10% Trees</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/marketplace">
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(220, 38, 38, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold text-lg rounded-xl shadow-xl cursor-pointer"
                >
                  Explore Marketplace
                </motion.div>
              </Link>
              
              <Link href="/login">
                <motion.div
                  whileHover={{ scale: 1.05, borderColor: "rgba(220, 38, 38, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-5 bg-black/40 border-2 border-red-900/40 text-white font-semibold text-lg rounded-xl backdrop-blur-sm cursor-pointer"
                >
                  Connect Wallet
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="container mx-auto px-4 py-20"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
            >
              How It Works
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "📸",
                  title: "Send via Telegram",
                  description: "Creators send photos to our agent. No complex dashboards, just pure simplicity."
                },
                {
                  icon: "🤖",
                  title: "Agent Handles Everything",
                  description: "Auto-listing, pricing, sales, and USDC payments on Monad. Zero manual work."
                },
                {
                  icon: "🌲",
                  title: "Impact That Matters",
                  description: "Every transaction automatically plants trees. Guilt-free indulgence with real impact."
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(220, 38, 38, 0.2)" }}
                  className="p-8 bg-gradient-to-br from-black/60 to-red-950/20 rounded-2xl border border-red-900/20 backdrop-blur-sm transition-all duration-300"
                >
                  <div className="text-6xl mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          className="container mx-auto px-4 py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto p-10 bg-gradient-to-br from-purple-950/30 to-black/60 rounded-3xl border border-purple-700/20 backdrop-blur-md text-center">
            <p className="text-purple-300 text-sm mb-3 tracking-wider">POWERED BY</p>
            <h3 className="text-4xl font-bold text-white mb-4">
              ⚡ Monad Blockchain
            </h3>
            <p className="text-gray-400 mb-6">
              High-performance EVM. Instant settlements. Built for autonomous agents.
            </p>
            <div className="flex justify-center gap-8 text-sm text-gray-500">
              <div>🔒 Secure</div>
              <div>⚡ Fast</div>
              <div>🌐 Decentralized</div>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div 
          className="container mx-auto px-4 py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to explore?
            </h3>
            <p className="text-gray-400 mb-8">
              Join the marketplace where every transaction makes a difference.
            </p>
            <Link href="/marketplace">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block px-10 py-4 bg-red-600 text-white font-semibold rounded-xl shadow-lg cursor-pointer"
              >
                Enter Marketplace →
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </AgeGate>
  )
}

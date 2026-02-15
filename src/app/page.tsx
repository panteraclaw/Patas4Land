'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  
  const copyAddress = () => {
    navigator.clipboard.writeText('0x78A796d409315467badC377C871CE2fd583C7777');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation - More compact */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-900">
        <div className="container mx-auto px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image 
              src="/logo.png" 
              alt="Patas4Land" 
              width={40} 
              height={40}
            />
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/marketplace" 
              className="text-sm tracking-wider uppercase text-gray-400 hover:text-white transition-colors"
            >
              Browse
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

      {/* Hero Section - Better vertical spacing */}
      <section className="relative flex items-center justify-center px-8" style={{ minHeight: 'calc(100vh - 72px)', paddingTop: '72px' }}>
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge - Better positioned */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-full mb-10">
              <span className="text-yellow-500 text-sm">●</span>
              <span className="text-gray-400 text-sm">Premium Foot Content Marketplace</span>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[0.9] mb-8">
              Sell your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200">
                foot pics
              </span>
              <br />
              <span className="font-light text-gray-600">earn crypto.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto mb-12">
              Our Telegram bot handles everything: listings, payments, delivery.
              <br />
              You just upload content and get paid instantly in USDC.
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

            {/* Token info + Reforestation */}
            <div className="mt-16 pt-8 border-t border-gray-900">
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
                  <div>
                    <span className="text-green-500">7%</span> of sales → reforestation
                  </div>
                  <div className="text-gray-800">•</div>
                  <div>
                    Token: <span className="text-yellow-500 font-mono">$PATAS</span> on Monad
                  </div>
                </div>
                
                {/* Contract Address - Clickeable */}
                <Link 
                  href="https://nad.fun/tokens/0x78A796d409315467badC377C871CE2fd583C7777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 hover:border-yellow-500/50 rounded-lg transition-all"
                >
                  <span className="text-xs font-mono text-gray-400 group-hover:text-yellow-500">
                    0x78A7...7777
                  </span>
                  <svg className="w-3 h-3 text-gray-600 group-hover:text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/3 rounded-full blur-[150px] pointer-events-none" />
      </section>

      {/* Value Props */}
      <section className="py-24 px-8 border-t border-gray-900">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
            {[
              {
                label: 'Telegram Bot',
                value: 'No website needed. Upload, price, sell—all via Telegram bot.',
              },
              {
                label: 'Instant Payouts',
                value: 'Get paid immediately in USDC. You keep 90% of every sale.',
              },
              {
                label: 'Global Market',
                value: 'Sell worldwide. Crypto payments, no borders, no banks.',
              }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="mb-3 text-xs tracking-[0.3em] uppercase text-gray-600">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-2xl font-light mb-3 group-hover:text-amber-400 transition-colors">
                  {item.label}
                </h3>
                <p className="text-gray-500 leading-loose text-sm">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-8 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Section header */}
            <div className="mb-20 text-center">
              <p className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-4">
                How it works
              </p>
              <h2 className="text-4xl md:text-5xl font-light">
                Start earning in
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400">
                  3 simple steps
                </span>
              </h2>
            </div>

            {/* Steps */}
            <div className="space-y-16">
              {[
                {
                  num: '01',
                  title: 'Upload Your Content',
                  desc: 'Send your best foot pics to our Telegram bot. No app downloads needed.'
                },
                {
                  num: '02',
                  title: 'Set Your Price',
                  desc: 'Choose your price in USDC. Platform keeps 3%, 7% goes to trees. You keep 90%.'
                },
                {
                  num: '03',
                  title: 'Get Paid Instantly',
                  desc: 'Buyers pay in crypto. You receive USDC directly to your wallet.'
                }
              ].map((step, i) => (
                <div 
                  key={i} 
                  className="relative pl-24 border-l border-gray-900 hover:border-amber-500/30 transition-colors group"
                >
                  <div className="absolute left-0 top-0 -translate-x-1/2 w-16 h-16 rounded-full bg-black border border-gray-900 group-hover:border-amber-500/50 flex items-center justify-center transition-colors">
                    <span className="text-xs tracking-wider text-gray-600 group-hover:text-amber-500">
                      {step.num}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-light mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 leading-loose">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Fixed fees */}
      <section className="py-24 px-8 border-t border-gray-900">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '$0', label: 'Setup Cost' },
              { value: '90%', label: 'Your Earnings' },
              { value: '3%', label: 'Platform Fee' },
              { value: '7%', label: 'Reforestation' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-light mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600">
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

      {/* Token Section */}
      <section className="py-24 px-8 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl border border-gray-900 bg-gradient-to-br from-gray-950 to-black p-12">
              <div className="relative z-10 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full mb-8">
                  <span className="text-yellow-500 text-sm">🪙</span>
                  <span className="text-yellow-400 text-sm font-medium">Token Live on Monad</span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-light mb-6">
                  Trade
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                    $PATAS
                  </span>
                </h2>

                <p className="text-gray-400 text-lg mb-8 leading-loose">
                  The official token of the Patas4Land ecosystem.
                  <br />
                  Built on Monad blockchain.
                </p>

                {/* Contract Address Card */}
                <div className="max-w-2xl mx-auto mb-8">
                  <div className="bg-black border border-gray-800 rounded-xl p-6">
                    <div className="text-xs tracking-wider uppercase text-gray-600 mb-3">
                      Contract Address
                    </div>
                    <div className="flex items-center justify-between gap-4 bg-gray-950 border border-gray-800 rounded-lg p-4">
                      <code className="text-yellow-500 font-mono text-sm break-all">
                        0x78A796d409315467badC377C871CE2fd583C7777
                      </code>
                      <button
                        onClick={copyAddress}
                        className="flex-shrink-0 px-3 py-2 hover:bg-gray-800 rounded transition-colors"
                        title={copied ? "Copied!" : "Copy address"}
                      >
                        {copied ? (
                          <span className="text-green-500 text-xs font-medium">Copied!</span>
                        ) : (
                          <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <Link 
                  href="https://nad.fun/tokens/0x78A796d409315467badC377C871CE2fd583C7777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black rounded-full font-semibold tracking-wider uppercase text-sm transition-all"
                >
                  Trade on nad.fun
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>

              {/* Background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-8 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-light leading-[0.95] mb-8">
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

            <p className="text-lg text-gray-500 mb-12 leading-loose">
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
              <Link 
                href="https://nad.fun/tokens/0x78A796d409315467badC377C871CE2fd583C7777" 
                target="_blank" 
                className="text-yellow-500 hover:text-yellow-400 transition-colors font-medium"
              >
                $PATAS Token
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

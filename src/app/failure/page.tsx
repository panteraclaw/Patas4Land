'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function FailurePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Nav */}
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
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-8 pt-32 pb-24">
        <div className="max-w-2xl text-center">
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-red-500/50 bg-red-500/10 mb-8">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            
            <h1 className="text-5xl font-light mb-6">
              Payment
              <br />
              <span className="text-gray-600">
                failed
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 leading-loose mb-8">
              Your transaction could not be completed.
              <br />
              Please try again or contact support.
            </p>

            <div className="p-6 border border-gray-900 rounded-2xl bg-gray-950 mb-12">
              <p className="text-sm text-gray-500 leading-relaxed">
                Common issues: insufficient balance, network congestion, or transaction timeout.
                <br />
                Check your wallet and try again.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/marketplace"
              className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors font-medium tracking-wider uppercase text-sm"
            >
              Try Again
            </Link>
            <Link 
              href="https://t.me/pata_monad_bot"
              target="_blank"
              className="px-8 py-3 border border-gray-800 hover:border-gray-600 rounded-full transition-colors font-medium tracking-wider uppercase text-sm"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>

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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

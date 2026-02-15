export default function Footer() {
  return (
    <footer className="border-t border-red-900/20 bg-black/40 backdrop-blur mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Project Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Patas4Land</h3>
            <p className="text-sm text-gray-400">
              Fetish for Forest 🌲<br/>
              Agent-powered marketplace on Monad
            </p>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Follow Us</h3>
            <a 
              href="https://x.com/patas4Land" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              @patas4Land
            </a>
          </div>

          {/* Token Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3">$PATAS Token</h3>
            <div className="text-xs text-gray-400 break-all">
              <p className="mb-1">Contract Address:</p>
              <code className="bg-black/60 px-2 py-1 rounded text-purple-300">
                0xF383...7777
              </code>
              <p className="mt-2 text-[10px] text-gray-500">
                (Coming soon on Monad)
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-red-900/10 text-center text-xs text-gray-500">
          <p>Moltiverse Hackathon 2026 • Monad Blockchain</p>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AgeGate({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const isVerified = localStorage.getItem('age_verified') === 'true'
    setVerified(isVerified)
    setLoading(false)
  }, [])

  const handleVerify = (isAdult: boolean) => {
    if (isAdult) {
      localStorage.setItem('age_verified', 'true')
      setVerified(true)
    } else {
      window.location.href = 'https://www.google.com'
    }
  }

  if (loading) return null

  return (
    <AnimatePresence mode="wait">
      {!verified ? (
        <motion.div
          key="age-gate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] bg-black flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-md w-full bg-gradient-to-br from-red-950/40 to-purple-950/40 backdrop-blur-xl rounded-2xl p-8 border border-red-900/30"
          >
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img src="/logo.jpg" alt="Patas4Land" className="w-32 h-32 rounded-xl" />
            </div>

            {/* Warning */}
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl font-bold text-white">
                Age Verification
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                This website contains adult content intended for individuals 18 years or older. 
                By entering, you confirm you meet the age requirement and agree to our terms.
              </p>
              <p className="text-red-400 text-xs font-semibold">
                🔞 ADULT CONTENT WARNING
              </p>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleVerify(true)}
                className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-500 hover:to-red-600 transition-all shadow-lg"
              >
                I am 18 or older - Enter
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleVerify(false)}
                className="w-full px-6 py-4 bg-gray-800/50 text-gray-300 font-semibold rounded-lg hover:bg-gray-700/50 transition-all"
              >
                I am under 18 - Exit
              </motion.button>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-gray-500 mt-6">
              Protected by Monad blockchain • Anonymous browsing respected
            </p>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

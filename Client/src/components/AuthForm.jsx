import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)

  const inputStyle =
    'w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 backdrop-blur-md border border-white/20'

  return (
    <div className="relative">
      {/* Glowing Border Animation Wrapper */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full animate-border-glow">
          <div className="comet-glow"></div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 backdrop-blur-lg bg-white/5 border border-white/20 text-white p-8 rounded-3xl shadow-2xl w-full max-w-sm"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 tracking-wide text-white">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        <form className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-white/80" />
              <input type="text" placeholder="Full Name" className={inputStyle} />
            </div>
          )}
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-white/80" />
            <input type="email" placeholder="Email" className={inputStyle} />
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-white/80" />
            <input type="password" placeholder="Password" className={inputStyle} />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="group relative overflow-hidden w-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white font-semibold py-2 rounded-lg mt-2 shadow-lg hover:shadow-xl transition duration-300"
          >
            <span className="relative z-10">{isLogin ? 'Login' : 'Sign Up'}</span>
            <span className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rotate-12"></span>
          </motion.button>
        </form>

        <p className="text-sm text-center mt-6 text-white/80">
          {isLogin ? "Don't have an account?" : "Already registered?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 underline font-semibold text-cyan-300 hover:text-fuchsia-300 transition"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  )
}

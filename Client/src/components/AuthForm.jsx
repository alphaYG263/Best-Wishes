import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'

// Replace this with your actual EC2 public IP or domain
const API_BASE = 'http://13.60.156.69:5000'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const inputStyle =
    'w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (!res.ok) {
        setMessage(data.msg || data.errors?.[0]?.msg || 'Something went wrong.')
      } else {
        setMessage('Success! 🎉')
        // Note: localStorage won't work in Claude artifacts, but will work in your deployed app
        if (typeof Storage !== 'undefined') {
          localStorage.setItem('token', data.token)
        }
      }
    } catch (err) {
      setMessage('Server error. Please try again.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-md bg-white/10 border border-white/30 text-white p-8 rounded-3xl shadow-2xl w-full max-w-sm"
    >
      <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-white/70" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>
        )}
        <div className="relative">
          <FaEnvelope className="absolute top-3 left-3 text-white/70" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>
        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-white/70" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={inputStyle}
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="group relative overflow-hidden w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-2 rounded-lg mt-2 shadow-md hover:shadow-lg transition duration-300"
          disabled={loading}
        >
          <span className="relative z-10">
            {loading ? (isLogin ? 'Logging in...' : 'Signing up...') : isLogin ? 'Login' : 'Sign Up'}
          </span>
          <span className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rotate-12"></span>
        </motion.button>
      </form>

      {message && (
        <p className="mt-4 text-sm text-center text-red-300">
          {message}
        </p>
      )}

      <p className="text-sm text-center mt-6 text-white/80">
        {isLogin ? "Don't have an account?" : "Already registered?"}
        <button
          onClick={() => {
            setIsLogin(!isLogin)
            setMessage(null)
          }}
          className="ml-2 underline font-medium text-white hover:text-indigo-200 transition"
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </motion.div>
  )
}


import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    const backendUrl = import.meta.env.VITE_BACKEND_URL_PROD || '';
    // console.log(backendUrl);
    const url = `${backendUrl}/api/auth/login`;

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, auth_type: "password" })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(data.message);
          // console.log(data);
          login(data.sessionData.access_token, data.sessionData, data.userData);
          navigate('/');
        }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-400 to-blue-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-md"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="mb-8 text-blue-900 hover:text-blue-700 flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="flex justify-center mb-8"
          >
            <motion.div
              initial={{ rotate: -180 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.8 }}
              className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-white text-2xl font-bold">US</span>
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-blue-900 text-center mb-6"
          >
            Welcome Back
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-blue-900 mb-2 font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/50 border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-blue-900 mb-2 font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-lg bg-white/50 border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={showPassword ? 'eye-off' : 'eye'}
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </motion.div>
                  </AnimatePresence>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between"
            >
              {/* <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-blue-900">Remember me</span>
              </label> */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-blue-600 hover:text-blue-700 font-medium"
                onClick={() => navigate("/forgotpassword")}
              >
                Forgot Password?
              </motion.a>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all duration-200"
            >
              Sign In
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-blue-900 mt-4"
            >
              Don't have an account?{' '}
              <motion.a
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/signup')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign Up
              </motion.a>
            </motion.p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
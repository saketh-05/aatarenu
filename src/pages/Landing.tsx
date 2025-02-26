import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Twitter, Instagram, Play, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const { isLogged } = useAuth();

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);

  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-blue-400 to-blue-950'>
      {/* Header */}
      <motion.header
        style={{ opacity: headerOpacity }}
        className={`navbar-header w-full sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 shadow-lg" : "bg-white/50"
        }`}
      >
        <div className='navbar-container p-2 max-w-7xl mx-auto px-4 py-4 flex justify-around items-center'>
          <div className='flex items-center gap-2'>
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg'
            >
              <span className='text-white text-xl font-bold'>US</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className='text-3xl font-bold text-blue-950 '
            >
              AataRenu
            </motion.h1>
          </div>
          <div className='hidden md:flex space-x-6'>
            <nav>
              {!isLogged && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className='px-4 py-2 rounded-lg bg-white/80 border border-blue-500 text-blue-900 hover:bg-blue-50 shadow-md'
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className='px-4 py-2 ml-5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </motion.button>
                </>
              )}
              {isLogged && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className='px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </motion.button>
              )}
            </nav>
          </div>

          <button className='md:hidden text-blue-900'>
            {" "}
            {/* this is hamburger icon for mobiles */}
            <Menu />
          </button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className='min-h-screen flex items-center justify-center pt-20'>
        <div className='container mx-auto px-4 flex flex-col md:flex-row items-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='md:w-1/2 text-center md:text-left'
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.span
                className='text-4xl md:text-6xl font-bold mb-2 block text-blue-950'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Experience the Classic
              </motion.span>
              <motion.span
                className='text-4xl md:text-6xl font-bold mb-2 block text-blue-600'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Hand Cricket
              </motion.span>
              <motion.span
                className='text-4xl md:text-6xl font-bold mb-6 block text-blue-950'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Game Online
              </motion.span>
            </motion.div>
            <motion.p
              className='text-lg text-blue-900 mb-8 '
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Relive your childhood memories with our digital version of the
              beloved Hand Cricket game. Challenge players worldwide and become
              the ultimate champion!
            </motion.p>
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/game")}
              className='px-8 py-4 bg-blue-600 text-white rounded-full text-xl font-semibold flex items-center gap-2 mx-auto md:mx-0 shadow-lg hover:shadow-blue-300/50'
            >
              Play Now <Play size={20} />
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className='md:w-1/2 mt-12 md:mt-0 relative'
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className='relative z-10'
            >
              <img
                src='/landing-page-images/image2.png'
                alt='Hand showing three fingers'
                className='w-3/4 md:w-2/3 rounded-lg shadow-2xl translate-x-4'
              />
            </motion.div>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className='absolute inset-0 bg-blue-400 rounded-lg blur-3xl -z-10'
            />
          </motion.div>
        </div>
      </section>

      {/* Game Description */}
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='bg-white/10 rounded-2xl p-8 md:p-12 backdrop-blur-sm shadow-xl'
          >
            <div className='flex flex-col md:flex-row items-center gap-12'>
              <div className='md:w-1/2 relative'>
                <motion.div
                  animate={{
                    scale: [1, 1.02, 1],
                    rotate: [-1, 1, -1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <img
                    src='/landing-page-images/image1.jpg'
                    alt='Hand showing three fingers'
                    className='w-3/4 md:w-2/3 rounded-lg shadow-2xl translate-x-4'
                  />
                </motion.div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className='absolute inset-0 bg-blue-500 rounded-lg blur-2xl -z-10'
                />
              </div>
              <div className='md:w-1/2'>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className='text-3xl font-bold mb-6 text-white'
                >
                  How to Play
                </motion.h3>
                <ul className='space-y-4 text-blue-100 text-xl'>
                  <motion.li
                    className='flex items-start gap-2'
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <span className='text-blue-300'>1.</span> Choose a number
                    between 1 and 6
                  </motion.li>
                  <motion.li
                    className='flex items-start gap-2'
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ x: 10 }}
                  >
                    <span className='text-blue-300'>2.</span> If your number
                    matches with the computer, you're out!
                  </motion.li>
                  <motion.li
                    className='flex items-start gap-2'
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ x: 10 }}
                  >
                    <span className='text-blue-300'>3.</span> Take turns batting
                    and bowling
                  </motion.li>
                  <motion.li
                    className='flex items-start gap-2'
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ x: 10 }}
                  >
                    <span className='text-blue-300'>4.</span> Score the most
                    runs to win!
                  </motion.li>
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  onClick={() => navigate("/game")}
                  className='mt-8 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold flex items-center gap-2 shadow-lg hover:shadow-blue-500/50'
                >
                  Start Playing <Play size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-blue-950/50 backdrop-blur-md py-12'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col items-center'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='text-2xl font-bold mb-6 text-white'
            >
              AataRenu
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='flex gap-6 mb-8'
            >
              <motion.a
                href='#'
                whileHover={{ scale: 1.2, rotate: 5 }}
                className='text-blue-200 hover:text-white transition-colors'
              >
                <Twitter size={24} />
              </motion.a>
              <motion.a
                href='#'
                whileHover={{ scale: 1.2, rotate: -5 }}
                className='text-blue-200 hover:text-white transition-colors'
              >
                <Github size={24} />
              </motion.a>
              <motion.a
                href='#'
                whileHover={{ scale: 1.2, rotate: 5 }}
                className='text-blue-200 hover:text-white transition-colors'
              >
                <Instagram size={24} />
              </motion.a>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className='text-blue-200 text-center'
            >
              © 2024 Hand Cricket. All rights reserved.
            </motion.p>
          </div>
        </div>
      </footer>
    </div>
  );
}

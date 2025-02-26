import { motion } from "framer-motion";

const OutEffect = () => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: [1, 2, 2, 1, 0],
      opacity: [1, 1, 1, 1, 0],
      rotate: [0, 0, 270, 270, 0],
    }}
    transition={{
      duration: 2,
      times: [0, 0.2, 0.5, 0.8, 1],
      ease: "easeInOut",
    }}
    className='fixed inset-0 z-50 flex items-center justify-center'
  >
    <div className='relative'>
      {/* Outer ring */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: 0 }}
        className='absolute inset-0 bg-red-600 rounded-full opacity-30 blur-xl'
        style={{ width: "400px", height: "400px" }}
      />

      {/* Inner explosion */}
      <motion.div
        animate={{
          scale: [1, 1.2, 0.8, 1.1, 1],
          rotate: [0, 90, -90, 180, 0],
        }}
        transition={{ duration: 2, repeat: 0 }}
        className='relative z-10 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center'
        style={{ width: "300px", height: "300px" }}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 1, 0],
            scale: [0.5, 1.2, 1.2, 1.2, 0.5],
          }}
          transition={{ duration: 2 }}
          className='text-white text-8xl font-bold'
        >
          OUT!
        </motion.span>
      </motion.div>

      {/* Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, scale: 0 }}
          animate={{
            x: Math.cos((i * 30 * Math.PI) / 180) * 200,
            y: Math.sin((i * 30 * Math.PI) / 180) * 200,
            scale: [0, 1, 0],
          }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className='absolute top-1/2 left-1/2 w-4 h-4 bg-yellow-400 rounded-full'
          style={{ boxShadow: "0 0 20px 10px rgba(234, 179, 8, 0.5)" }}
        />
      ))}
    </div>
  </motion.div>
);

export default OutEffect;

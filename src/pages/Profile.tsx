import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      setEmail(user.email);
    }
  }, []);

  const { isLogged, logout } = useAuth();

  // const [isEditing, setIsEditing] = useState(false);
  // const [formData, setFormData] = useState({
  //   email: '',
  // });
  // const [showPassword, setShowPassword] = useState(false);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsEditing(false);
  //   // Handle profile update logic here
  // };
  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged, navigate]);

  return (
    <>
      {isLogged && (
        <div className='min-h-screen bg-gradient-to-b from-white via-blue-400 to-blue-950 p-4'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='max-w-4xl mx-auto pt-8'
          >
            <AnimatePresence>
              <div className='flex justify-between'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/")}
                  className='mb-8 text-blue-900 hover:text-blue-700 flex items-center gap-2'
                >
                  <ArrowLeft size={20} />
                  Back to Home
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={logout}
                  className='mb-4 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all duration-200'
                >
                  Logout
                </motion.button>
              </div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl'
            >
              <div className='flex justify-between items-start mb-8'>
                <motion.div className='flex items-center gap-4'>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className='w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-lg'
                  >
                    <span className='text-white text-4xl font-bold'>UCS</span>
                  </motion.div>
                  <div>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className='text-blue-600'
                    >
                      {email}
                    </motion.p>
                  </div>
                </motion.div>

                {/* <motion.button
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => setIsEditing(true)}
               className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
             >
               <Edit2 size={18} />
               Edit Profile
             </motion.button> */}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className='bg-blue-50/50 rounded-xl p-6 mb-6'
              >
                <div className='flex items-center gap-3 text-blue-900'>
                  <Trophy size={24} className='text-blue-600' />
                  <h2 className='text-xl font-semibold'>High Scores</h2>
                </div>
                <div className='mt-4 space-y-3'>
                  <div className='flex justify-between items-center'>
                    <span className='text-blue-700'>Best Score</span>
                    <span className='text-2xl font-bold text-blue-900'>
                      12,450
                    </span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-blue-700'>Games Played</span>
                    <span className='text-2xl font-bold text-blue-900'>42</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-blue-700'>Win Rate</span>
                    <span className='text-2xl font-bold text-blue-900'>
                      76%
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </>
  );
}

import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, AlertCircle } from 'lucide-react';

export default function PageNotFound() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated 404 Number */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 1
          }}
          className="relative mb-8"
        >
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-blue-950 to-blue-400">
            404
          </h1>
          
          {/* Floating Alert Icon */}
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-0 right-1/4"
          >
            <AlertCircle className="w-16 h-16 text-purple-500 opacity-50" />
          </motion.div>
        </motion.div>

        {/* Animated Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </p>
        </motion.div>

        {/* Animated Search Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-8"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block"
          >
            <Search className="w-24 h-24 text-gray-300 mx-auto" />
          </motion.div>
        </motion.div>

        {/* Animated Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoHome}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-950 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <Home className="w-5 h-5" />
            Go Home
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoBack}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </motion.button>
        </motion.div>

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}
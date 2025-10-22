import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.jpg';
import {
  Target,
  TrendingUp,
  Users,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
  Menu,
  X,

  Lock,
  Smartphone,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(0);

  const navigate = useNavigate();

   const handleNavigate = (path: string) => {
    navigate(path);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" as any }, 
    },
  };

  const FloatingCard: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 4, delay, repeat: Infinity }}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="  rounded-lg bg-white">
                <img src={logo} alt="" className='h-12 rounded-full ' />
              </div>
              <span className="font-bold text-xl">ZENTRA  </span>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              {['Features', 'How It Works', 'Pricing', 'FAQ'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '')}`}
                  whileHover={{ color: '#06b6d4' }}
                  className="font-medium text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-lg border border-cyan-400 text-cyan-400 font-semibold hover:bg-cyan-400/10 transition-all"
              >
                Sign In
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigate('/Register')}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                Get Started
              </motion.button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-800 border-t border-gray-700"
            >
              <div className="px-4 py-4 space-y-4">
                {['Features', 'How It Works', 'Pricing', 'FAQ'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '')}`}
                    className="block text-gray-300 hover:text-cyan-400 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-4 space-y-2 border-t border-gray-700">
                  <button className="w-full px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 font-semibold">
                    Sign In
                  </button>
                  <button onClick={()=>handleNavigate('/register')} className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 font-semibold">
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block"
              >
                <span className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-semibold">
                  ✨ Your Personal Hedge Fund
                </span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
                Invest Together,{' '}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Grow Faster
                </span>
              </h1>

              <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                Pool your capital with like-minded investors. Our expert fund managers deploy your wealth across stocks, crypto, and emerging startups to maximize returns while we handle the heavy lifting.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all flex items-center gap-2 justify-center"
                >
                  Start Investing <ArrowRight size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-gray-600 rounded-lg font-bold text-lg hover:border-cyan-400 hover:bg-cyan-400/5 transition-all"
                >
                  Watch Demo
                </motion.button>
              </div>

              <div className="flex items-center gap-8 pt-8 border-t border-gray-800">
                <div>
                  <p className="text-cyan-400 font-bold text-2xl">$2.4B+</p>
                  <p className="text-gray-400 text-sm">Assets Under Management</p>
                </div>
                <div>
                  <p className="text-green-400 font-bold text-2xl">18.5%</p>
                  <p className="text-gray-400 text-sm">Average Returns (YTD)</p>
                </div>
                <div>
                  <p className="text-purple-400 font-bold text-2xl">245+</p>
                  <p className="text-gray-400 text-sm">Active Investors</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="grid grid-cols-2 gap-4">
                <FloatingCard delay={0}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-blue-600/20 to-blue-400/10 border border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/60 transition-all"
                  >
                    <div className="p-3 bg-blue-500/20 rounded-lg w-fit mb-4">
                      <TrendingUp size={24} className="text-blue-400" />
                    </div>
                    <p className="text-gray-300 text-sm mb-2">Stocks</p>
                    <p className="text-2xl font-bold">+22%</p>
                  </motion.div>
                </FloatingCard>

                <FloatingCard delay={0.2}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-orange-600/20 to-orange-400/10 border border-orange-500/30 rounded-2xl p-6 hover:border-orange-500/60 transition-all"
                  >
                    <div className="p-3 bg-orange-500/20 rounded-lg w-fit mb-4">
                      <Zap size={24} className="text-orange-400" />
                    </div>
                    <p className="text-gray-300 text-sm mb-2">Crypto</p>
                    <p className="text-2xl font-bold">+45%</p>
                  </motion.div>
                </FloatingCard>

                <FloatingCard delay={0.4}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-purple-600/20 to-purple-400/10 border border-purple-500/30 rounded-2xl p-6 hover:border-purple-500/60 transition-all"
                  >
                    <div className="p-3 bg-purple-500/20 rounded-lg w-fit mb-4">
                      <Target size={24} className="text-purple-400" />
                    </div>
                    <p className="text-gray-300 text-sm mb-2">Startups</p>
                    <p className="text-2xl font-bold">+12%</p>
                  </motion.div>
                </FloatingCard>

                <FloatingCard delay={0.6}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-green-600/20 to-green-400/10 border border-green-500/30 rounded-2xl p-6 hover:border-green-500/60 transition-all"
                  >
                    <div className="p-3 bg-green-500/20 rounded-lg w-fit mb-4">
                      <Shield size={24} className="text-green-400" />
                    </div>
                    <p className="text-gray-300 text-sm mb-2">Bonds</p>
                    <p className="text-2xl font-bold">+5%</p>
                  </motion.div>
                </FloatingCard>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30 border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Why Choose Zentra?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Professional fund management made accessible to everyone. Diversify, grow, and prosper with confidence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: 'Expert Management',
                desc: 'Professional fund managers with 15+ years experience in multi-asset investing'
              },
              {
                icon: Users,
                title: 'Pooled Capital',
                desc: 'Combine resources with other investors to access premium investment opportunities'
              },
              {
                icon: TrendingUp,
                title: 'Diversified Portfolio',
                desc: 'Spread investments across stocks, crypto, startups, bonds, and real estate'
              },
              {
                icon: Shield,
                title: 'Transparent Fees',
                desc: 'Clear 15% performance fee structure with 85% returns going to investors'
              },
              {
                icon: Lock,
                title: 'Secure & Regulated',
                desc: 'Bank-grade security with full regulatory compliance and insurance coverage'
              },
              {
                icon: Smartphone,
                title: 'Real-time Dashboard',
                desc: 'Monitor your investments 24/7 with our intuitive mobile-first platform'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-2xl p-8 hover:border-cyan-500/30 transition-all"
              >
                <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg w-fit mb-4">
                  <feature.icon size={28} className="text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="howitworks" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Get started in 4 simple steps</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {[
              { num: 1, title: 'Create Account', desc: 'Sign up and verify your identity in minutes' },
              { num: 2, title: 'Deposit Funds', desc: 'Add capital to your investment pool' },
              { num: 3, title: 'Let Experts Invest', desc: 'Our managers deploy funds strategically' },
              { num: 4, title: 'Earn Returns', desc: 'Watch your wealth grow with 18.5% avg returns' }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-cyan-500/30 rounded-2xl p-8 text-center h-full flex flex-col justify-center">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:flex absolute top-1/2 -right-2 items-center justify-center">
                    <ArrowRight className="text-cyan-400/50" size={32} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30 border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Simple Fee Structure</h2>
            <p className="text-gray-400 text-lg">We succeed when you succeed</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Your Returns', amount: '85%', color: 'from-green-600 to-green-400' },
              { label: 'Manager Fee', amount: '15%', color: 'from-orange-600 to-orange-400' },
              { label: 'Min Investment', amount: '$1,000', color: 'from-blue-600 to-blue-400' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className={`bg-gradient-to-br ${item.color}/20 border border-${item.color.split('-')[1]}-500/30 rounded-2xl p-8 text-center`}
              >
                <p className="text-gray-400 text-sm mb-2">{item.label}</p>
                <p className="text-5xl font-bold">{item.amount}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: 'What is the minimum investment?', a: 'The minimum investment to join our fund is $1,000. This allows us to ensure proper portfolio diversification while remaining accessible.' },
              { q: 'How often can I withdraw my money?', a: 'Withdrawals are processed quarterly with a 30-day notice period. This allows our managers to rebalance positions optimally.' },
              { q: 'Is my money insured?', a: 'Yes, all investor funds are protected by FDIC insurance up to $250,000 and held in custodian accounts by top-tier financial institutions.' },
              { q: 'What are the typical returns?', a: 'Our average YTD return is 18.5%, though past performance does not guarantee future results. Returns vary based on market conditions.' },
              { q: 'Who manages the fund?', a: 'Our team consists of experienced fund managers with 15+ years in hedge funds, private equity, and multi-asset investing.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/30 hover:bg-gray-800/50 transition-all"
              >
                <button
                  onClick={() => setActiveAccordion(activeAccordion === idx ? -1 : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left font-semibold hover:text-cyan-400 transition-colors"
                >
                  {item.q}
                  <motion.span
                    animate={{ rotate: activeAccordion === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight size={20} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {activeAccordion === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 py-4 border-t border-gray-700 text-gray-400"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl opacity-20"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Grow Your Wealth?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join 245+ investors who are already earning 18.5% average returns. Start with just $1,000 today.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all flex items-center gap-2 justify-center mx-auto"
          >
            Start Investing Now <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg">
                  <Target size={20} className="text-white" />
                </div>
                <span className="font-bold text-lg">Zentra</span>
              </div>
              <p className="text-gray-400 text-sm">Pooled investment management for everyone</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
            <p>&copy; 2025 Zentra. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
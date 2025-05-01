"use client";

import {
  Activity,
  Code,
  ImageIcon,
  Smartphone,
  ArrowRight,
  Search,
  Award,
  TrendingUp,
  Cpu,
  Database,
  Server,
  Box,
  Mail,
  ChevronRight,
  Sparkles,
  Gauge,
  Moon,
  LayoutDashboard,
  LogIn,
  ShoppingCart,
  SmartphoneIcon as MobileIcon,
  BarChart,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";

export default function InsightsPage() {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <main className="min-h-screen bg-[#0c0c0c] text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/10 to-transparent opacity-20 rounded-3xl"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative z-10"
        >
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="text-blue-400 h-8 w-8 mr-3" />
            <span className="text-blue-400 uppercase tracking-wider text-sm font-semibold">
              Data-Driven Excellence
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 text-center mb-6 px-4">
            Insights That Power Your Digital Growth
          </h1>

          <p className="text-neutral-400 text-center max-w-3xl mx-auto mb-10 text-base sm:text-lg px-4">
            Discover how our technical expertise can transform your web presence
            with data-driven improvements and innovative solutions that deliver
            measurable results.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { delay: 0.4, staggerChildren: 0.2 },
              },
            }}
          >
            <motion.button
              variants={scaleIn}
              className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all flex items-center justify-center group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Services
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
            <motion.button
              variants={scaleIn}
              className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all flex items-center justify-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Us
              <Mail className="ml-2 h-4 w-4" />
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Visual Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              icon: Code,
              iconColor: "text-blue-400",
              text: "78% of sites",
              subtext: "had unused CSS",
              description: "Bloating page load times",
              color: "from-blue-400/20 to-transparent",
            },
            {
              icon: ImageIcon,
              iconColor: "text-purple-400",
              text: "56% suffered",
              subtext: "uncompressed images",
              description: "Slowing page rendering",
              color: "from-purple-400/20 to-transparent",
            },
            {
              icon: Activity,
              iconColor: "text-green-400",
              text: "34% had",
              subtext: "slow TTFB",
              description: "Hurting SEO rankings",
              color: "from-green-400/20 to-transparent",
            },
            {
              icon: Smartphone,
              iconColor: "text-orange-400",
              text: "82% lacked",
              subtext: "mobile optimization",
              description: "Missing mobile traffic",
              color: "from-orange-400/20 to-transparent",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariant}
              className="bg-[#111111] p-6 sm:p-8 rounded-xl border border-[#222222] hover:border-[#333333] transition-all duration-300 relative overflow-hidden group"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-b ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>
              <div className="relative z-10">
                <div className="bg-[#1a1a1a] p-3 inline-flex rounded-lg mb-4">
                    <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-1">
                  {stat.text}
                </h3>
                <h4 className="text-lg sm:text-xl font-medium mb-2">
                  {stat.subtext}
                </h4>
                <p className="text-neutral-400 text-sm">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Before & After Fix Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-blue-400/5 opacity-30"></div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="relative z-10"
        >
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="text-blue-400 h-6 w-6 mr-2" />
            <span className="text-blue-400 uppercase tracking-wider text-sm font-semibold">
              Performance Improvements
            </span>
          </div>

          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mb-4 text-center px-4">
            Real Results, Measurable Impact
          </h2>

          <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-12 px-4 text-base sm:text-lg">
            We don't just make promises—we deliver quantifiable improvements
            that directly impact your business metrics.
          </p>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
              title: "Increased Sales",
              before: "$10k/month",
              after: "$50k/month",
              icon: TrendingUp,
              description: "Boosted revenue through optimized strategies",
              },
              {
              title: "Conversion Rate",
              before: "1.2%",
              after: "5.8%",
              icon: ShoppingCart,
              description: "Enhanced user experience for better conversions",
              },
              {
              title: "Customer Retention",
              before: "30%",
              after: "70%",
              icon: Award,
              description: "Improved loyalty with personalized engagement",
              },
            ].map((card, index) => (
              <motion.div
              key={index}
              variants={itemVariant}
              className="bg-[#111111] rounded-xl overflow-hidden border border-[#222222] hover:border-blue-400/30 transition-all duration-500 shadow-lg"
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
              <div className="p-6">
                <div className="flex items-center mb-6">
                <div className="bg-[#1a1a1a] p-2 rounded-lg mr-3">
                  <card.icon className="text-blue-400 h-5 w-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold truncate">
                  {card.title}
                </h3>
                </div>

                <div className="flex items-center justify-between mb-4">
                <div className="bg-[#1a1a1a] p-3 sm:p-4 rounded-lg text-neutral-400 w-[45%]">
                  <p className="text-xs sm:text-sm mb-1">Before</p>
                  <p className="text-xl sm:text-3xl font-bold truncate">
                  {card.before}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <ArrowRight className="text-blue-400 h-5 w-5 sm:h-6 sm:w-6 mb-1" />
                </div>
                <div className="bg-[#1a1a1a] p-3 sm:p-4 rounded-lg text-blue-400 w-[45%]">
                  <p className="text-xs sm:text-sm mb-1">After</p>
                  <p className="text-xl sm:text-3xl font-bold truncate">
                  {card.after}
                  </p>
                </div>
                </div>

                <p className="text-neutral-400 text-sm">{card.description}</p>
              </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Implemented Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-[#0a0a0a]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="flex items-center justify-center mb-4">
            <Award className="text-blue-400 h-6 w-6 mr-2" />
            <span className="text-blue-400 uppercase tracking-wider text-sm font-semibold">
              Technical Excellence
            </span>
          </div>

          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mb-4 text-center px-4">
            Features We've Implemented
          </h2>

          <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-12 px-4 text-base sm:text-lg">
            Our technical expertise allows us to implement complex features that
            enhance user experience and drive business growth.
          </p>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {[
              { name: "Dark Mode Toggle", icon: Moon },
              { name: "Image Lazy Loading", icon: ImageIcon },
              { name: "Admin Dashboard", icon: LayoutDashboard },
              { name: "Login Bug Resolved", icon: LogIn },
              { name: "Checkout Optimization", icon: ShoppingCart },
              { name: "Mobile Responsiveness", icon: MobileIcon },
              { name: "Performance Monitoring", icon: BarChart },
              { name: "Security Hardening", icon: Shield },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariant}
                className="bg-[#111111] px-4 py-3 rounded-full flex items-center gap-3 hover:bg-[#161616] transition-colors group cursor-pointer"
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <div className="bg-[#1a1a1a] p-1.5 rounded-full group-hover:bg-blue-400/10 transition-colors">
                  <feature.icon className="text-blue-400 h-4 w-4" />
                </div>
                <span className="text-sm font-medium group-hover:text-blue-400 transition-colors truncate">
                  {feature.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Tech Stack Display */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <div className="flex items-center justify-center mb-4">
            <Cpu className="text-blue-400 h-6 w-6 mr-2" />
            <span className="text-blue-400 uppercase tracking-wider text-sm font-semibold">
              Powerful Technology
            </span>
          </div>

          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 mb-4 text-center px-4">
            Our Tech Stack
          </h2>

          <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-12 px-4 text-base sm:text-lg">
            We leverage cutting-edge technologies to deliver high-performance,
            scalable solutions.
          </p>

          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              { name: "Next.js", icon: Code },
              { name: "React", icon: Code },
              { name: "Tailwind", icon: Code },
              { name: "Prisma", icon: Database },
              { name: "PostgreSQL", icon: Database },
              { name: "Vercel", icon: Server },
              { name: "Docker", icon: Box },
            ].map((tech, index) => (
              <motion.div
                key={index}
                variants={itemVariant}
                className="bg-[#111111] px-5 py-3 rounded-full border border-[#222222] hover:border-blue-400 transition-colors flex items-center gap-2 group"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <tech.icon className="text-blue-400 h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Newsletter Signup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 mb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleIn}
          className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-2xl p-6 sm:p-10 border border-[#222222] shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <Mail className="text-blue-400 h-6 w-6 mr-2" />
              <span className="text-blue-400 uppercase tracking-wider text-sm font-semibold">
                Stay Updated
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center px-4">
              Get Web Dev Insights Monthly
            </h2>

            <p className="text-neutral-400 mb-8 text-center max-w-2xl mx-auto px-4 text-base sm:text-lg">
              Stay updated with the latest web development trends, optimization
              techniques, and exclusive tips from our experts delivered straight
              to your inbox.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.2, duration: 0.5 },
                },
              }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#0c0c0c] border border-[#222222] rounded-md px-4 py-3 focus:outline-none focus:border-blue-400 transition-colors"
              />
              <motion.button
                className="bg-white text-blue-400 px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all flex items-center justify-center whitespace-nowrap"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
                <ChevronRight className="ml-2 h-4 w-4" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

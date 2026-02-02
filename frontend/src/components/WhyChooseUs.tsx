import { motion } from 'motion/react';
import { Shield, Award, Headphones, Star, Zap, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "Verified Yachts",
    description: "Every yacht is thoroughly inspected and verified to meet our luxury standards",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description: "We guarantee the best prices with no hidden fees or surprise charges",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Headphones,
    title: "24/7 Concierge",
    description: "Our dedicated team is available around the clock to assist you",
    color: "from-cyan-500 to-blue-500"
  },
  {
    icon: Star,
    title: "Premium Experience",
    description: "Curated experiences with professional crew and exceptional service",
    color: "from-pink-500 to-purple-500"
  }
];

const benefits = [
  "Instant booking confirmation",
  "Flexible cancellation policy",
  "Complimentary concierge service",
  "Exclusive member discounts",
  "Priority customer support",
  "Verified reviews & ratings"
];

export function WhyChooseUs() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 opacity-100"
        style={{ backgroundSize: '200% 200%' }}
      ></motion.div>

      {/* Animated Overlay Pattern */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        ></motion.div>
      </div>

      {/* Glowing Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 w-96 h-96 bg-white rounded-full blur-[120px]"
      ></motion.div>
      <motion.div
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-white rounded-full blur-[120px]"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-full mb-8"
          >
            <Zap className="w-4 h-4 text-white" />
            <span className="text-sm uppercase tracking-[0.3em] text-white">Why Choose Us</span>
          </motion.div>

          <h2 className="text-5xl lg:text-7xl text-white mb-6 tracking-tight">
            The OcholaYachts
            <br />
            <span className="italic">Difference</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Experience unparalleled service and luxury with our premium yacht charter services
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <motion.div
                whileHover={{ y: -12 }}
                transition={{ duration: 0.3 }}
                className="relative h-full"
              >
                {/* Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all h-full relative overflow-hidden">
                  {/* Gradient Icon Background */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl mb-6 shadow-2xl`}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  <h3 className="text-2xl text-white mb-4">{feature.title}</h3>
                  <p className="text-white/80 leading-relaxed">{feature.description}</p>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full"></div>
                </div>

                {/* Glow Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl blur-xl -z-10`}
                ></motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
              backgroundSize: '20px 20px',
            }}></div>
          </div>

          <div className="relative grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Benefits List */}
            <div>
              <h3 className="text-3xl text-white mb-8">Premium Benefits</h3>
              <div className="grid grid-cols-1 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white text-lg group-hover:translate-x-2 transition-transform">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "500+", label: "Luxury Yachts", delay: 0 },
                { value: "150+", label: "Destinations", delay: 0.1 },
                { value: "10K+", label: "Happy Clients", delay: 0.2 },
                { value: "98%", label: "Satisfaction Rate", delay: 0.3 },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: stat.delay, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 text-center hover:bg-white/20 transition-all"
                >
                  <div className="text-5xl text-white mb-3">{stat.value}</div>
                  <div className="text-white/80 uppercase tracking-wider text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-600 px-12 py-6 rounded-full text-lg hover:shadow-2xl hover:shadow-white/50 transition-all uppercase tracking-wider"
          >
            Start Your Journey Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
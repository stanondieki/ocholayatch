'use client'

import { motion } from 'motion/react';
import { Calendar, Clock, User, ArrowRight, Tag, TrendingUp, Sparkles, Search } from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { useState } from 'react';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPost = {
    id: 1,
    title: 'The Ultimate Guide to Mediterranean Yacht Charters',
    excerpt: 'Discover the most breathtaking destinations, hidden gems, and essential tips for an unforgettable Mediterranean yacht charter experience.',
    image: 'https://images.unsplash.com/photo-1604771868982-003c36db0814?w=1200&h=600&fit=crop',
    author: 'Sophie Laurent',
    authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    date: 'December 10, 2024',
    readTime: '8 min read',
    category: 'Destinations',
  };

  const blogPosts = [
    {
      id: 2,
      title: 'Top 10 Luxury Yacht Destinations for 2025',
      excerpt: 'From the Caribbean to Southeast Asia, explore the most sought-after yacht charter destinations for the upcoming year.',
      image: 'https://images.unsplash.com/photo-1627761801957-4bf6cfb4fa20?w=800&h=500&fit=crop',
      author: 'Michael Chen',
      authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      date: 'December 8, 2024',
      readTime: '6 min read',
      category: 'Destinations',
    },
    {
      id: 3,
      title: 'How to Choose the Perfect Yacht for Your Needs',
      excerpt: 'A comprehensive guide to selecting the ideal yacht based on your group size, preferences, and desired amenities.',
      image: 'https://images.unsplash.com/photo-1692942198293-c600f7c9cb53?w=800&h=500&fit=crop',
      author: 'Isabella Martinez',
      authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
      date: 'December 5, 2024',
      readTime: '7 min read',
      category: 'Yacht Tips',
    },
    {
      id: 4,
      title: 'Luxury Yacht Charter: What to Expect',
      excerpt: 'Everything you need to know about the luxury yacht charter experience, from booking to disembarkation.',
      image: 'https://images.unsplash.com/photo-1573717865061-202c78c4b414?w=800&h=500&fit=crop',
      author: 'David Thompson',
      authorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
      date: 'December 3, 2024',
      readTime: '5 min read',
      category: 'Lifestyle',
    },
    {
      id: 5,
      title: 'Caribbean vs Mediterranean: Which is Right for You?',
      excerpt: 'Compare the two most popular yacht charter regions and discover which one suits your preferences.',
      image: 'https://images.unsplash.com/photo-1637585569991-b013294d8f26?w=800&h=500&fit=crop',
      author: 'Emma Richardson',
      authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      date: 'November 30, 2024',
      readTime: '9 min read',
      category: 'Destinations',
    },
    {
      id: 6,
      title: 'Sustainable Yachting: The Future of Luxury',
      excerpt: 'Learn about eco-friendly practices in luxury yachting and how we\'re contributing to ocean conservation.',
      image: 'https://images.unsplash.com/photo-1735208073648-5f08ae9a8b29?w=800&h=500&fit=crop',
      author: 'James Anderson',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      date: 'November 28, 2024',
      readTime: '6 min read',
      category: 'Industry News',
    },
    {
      id: 7,
      title: 'Planning the Perfect Yacht Charter Itinerary',
      excerpt: 'Expert tips on creating an unforgettable itinerary that balances adventure, relaxation, and exploration.',
      image: 'https://images.unsplash.com/photo-1604771868982-003c36db0814?w=800&h=500&fit=crop',
      author: 'Sophie Laurent',
      authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
      date: 'November 25, 2024',
      readTime: '8 min read',
      category: 'Yacht Tips',
    },
  ];

  const categories = ['All', 'Destinations', 'Yacht Tips', 'Lifestyle', 'Industry News'];

  const trendingTopics = [
    'Mediterranean Charters',
    'Yacht Selection Guide',
    'Luxury Amenities',
    'Charter Costs',
    'Best Season to Charter',
    'Yacht Events',
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-black"></div>
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[150px]"
        ></motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-purple-500/30 px-6 py-3 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm uppercase tracking-[0.3em] text-white">Insights & Stories</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl lg:text-8xl text-white mb-8 tracking-tight"
          >
            The OcholaYachts
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Journal
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Expert insights, destination guides, and luxury yachting inspiration
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/60" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white text-lg placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-full text-sm uppercase tracking-wider transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl shadow-purple-500/50'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group relative cursor-pointer"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-96 lg:h-auto overflow-hidden">
                  <ImageWithFallback
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent lg:bg-gradient-to-r"></div>
                  
                  {/* Featured Badge */}
                  <div className="absolute top-6 left-6 bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-full">
                    <span className="text-white text-sm uppercase tracking-wider flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Featured
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-6">
                    <Tag className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-400 text-sm uppercase tracking-wider">{featuredPost.category}</span>
                  </div>

                  <h2 className="text-4xl lg:text-5xl text-white mb-6 leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-white/70 text-lg leading-relaxed mb-8">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-purple-500/50">
                        <ImageWithFallback
                          src={featuredPost.authorImage}
                          alt={featuredPost.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-white text-sm">{featuredPost.author}</p>
                        <div className="flex items-center gap-3 text-white/60 text-sm">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {featuredPost.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {featuredPost.readTime}
                          </span>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center"
                    >
                      <ArrowRight className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl lg:text-6xl text-white mb-6 tracking-tight">
              Latest <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Articles</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative cursor-pointer"
              >
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full">
                      <span className="text-white text-xs uppercase tracking-wider">{post.category}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl text-white mb-4 leading-tight group-hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-white/70 mb-6 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500/50">
                          <ImageWithFallback
                            src={post.authorImage}
                            alt={post.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-white text-sm">{post.author}</p>
                          <p className="text-white/60 text-xs">{post.readTime}</p>
                        </div>
                      </div>

                      <motion.div
                        whileHover={{ x: 5 }}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 transition-all"
                      >
                        <ArrowRight className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-6">📝</div>
              <h3 className="text-3xl text-white mb-4">No articles found</h3>
              <p className="text-white/60 text-lg">
                Try adjusting your filters or search terms
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Trending Topics */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl text-white mb-6 tracking-tight">
              Trending <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Topics</span>
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {trendingTopics.map((topic, index) => (
              <motion.button
                key={topic}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 hover:border-transparent transition-all flex items-center gap-2"
              >
                <Tag className="w-4 h-4" />
                {topic}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative py-32 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600 rounded-full blur-[150px]"
        ></motion.div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl text-white mb-8 tracking-tight">
              Never Miss <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">an Update</span>
            </h2>
            <p className="text-xl text-white/70 mb-12 leading-relaxed">
              Subscribe to our newsletter for the latest articles, exclusive deals, and yachting insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-10 py-5 rounded-2xl text-lg uppercase tracking-wider hover:shadow-2xl hover:shadow-cyan-500/50 transition-all"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
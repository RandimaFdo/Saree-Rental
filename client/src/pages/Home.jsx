import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SareeCard from '../components/SareeCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [featuredSarees, setFeaturedSarees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedSarees();
  }, []);

  const fetchFeaturedSarees = async () => {
    try {
      const response = await axios.get('/api/sarees');
      // Show first 3 sarees as featured
      setFeaturedSarees(response.data.slice(0, 3));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching featured sarees:', error);
      // Use mock data as fallback
      const mockSarees = [
        {
          _id: 's1',
          title: 'Elegant Red Bridal Saree',
          pricePerDay: 85,
          color: 'Red',
          occasion: 'Wedding',
          images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjZGMxNDM3Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5SZWQgV2VkZGluZyBTYXJlZTwvdGV4dD4KPC9zdmc+']
        },
        {
          _id: 's2',
          title: 'Traditional Silk Banarasi',
          pricePerDay: 120,
          color: 'Blue',
          occasion: 'Festive',
          images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjM2I4MmVjIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5CbHVlIEJhbmFyYXNpPC90ZXh0Pgo8L3N2Zz4=']
        },
        {
          _id: 's3',
          title: 'Designer Pink Party Wear',
          pricePerDay: 95,
          color: 'Pink',
          occasion: 'Party',
          images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjZWM0ODk5Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5QaW5rIFBhcnR5IFNhcmVlPC90ZXh0Pgo8L3N2Zz4=']
        }
      ];
      setFeaturedSarees(mockSarees);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-700 via-green-600 to-lime-600 text-white py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white opacity-5 rounded-full animate-pulse delay-75"></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse delay-150"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in-up bg-clip-text text-transparent bg-gradient-to-r from-white to-green-100">
              Rent Beautiful Sarees
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-green-50 animate-fade-in-up delay-100">
              Discover and rent exquisite sarees for your special occasions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
              <Link 
                to="/browse" 
                className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Browse Sarees
              </Link>
              <Link 
                to="/register" 
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-emerald-600 transform hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Why Choose SilkSwap?
            </h2>
            <p className="text-gray-600 text-lg">Premium quality sarees at affordable rental prices</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-200">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Premium Quality</h3>
              <p className="text-gray-600">Handpicked collection of authentic designer sarees for every occasion</p>
            </div>
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-200">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Affordable Prices</h3>
              <p className="text-gray-600">Rent premium sarees at a fraction of the purchase cost</p>
            </div>
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-200">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600">Quick and secure delivery to your doorstep anywhere in the city</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sarees */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">Featured Sarees</h2>
            <p className="text-gray-600 text-lg">Handpicked selections from our premium collection</p>
          </div>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredSarees.map((saree, index) => (
                <div key={saree._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <SareeCard saree={saree} />
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link 
              to="/browse" 
              className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              View All Sarees
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-stone-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">How It Works</h2>
            <p className="text-gray-600 text-lg">Simple steps to rent your perfect saree</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Browse & Choose</h3>
                <p className="text-gray-600">Explore our collection of beautiful sarees and find the perfect one for your occasion</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-emerald-300 text-3xl">→</div>
            </div>
            <div className="relative group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">📅</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Book & Confirm</h3>
                <p className="text-gray-600">Select your rental dates and complete the booking process securely</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-emerald-300 text-3xl">→</div>
            </div>
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🎉</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">Enjoy & Return</h3>
                <p className="text-gray-600">Receive your saree and enjoy your special occasion. Return it when you're done</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-700 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Saree?</h2>
          <p className="text-xl mb-8 text-pink-50">Join thousands of satisfied customers who found their dream saree with us</p>
          <Link 
            to="/register" 
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-pink-50 transform hover:scale-105 transition-all duration-300 shadow-xl inline-block"
          >
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

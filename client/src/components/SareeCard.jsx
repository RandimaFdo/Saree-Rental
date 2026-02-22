import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SareeCard = ({ saree }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Generate a beautiful gradient background based on saree color
  const getGradientBackground = (color) => {
    const colorMap = {
      'Red': 'from-red-400 to-red-600',
      'Blue': 'from-blue-400 to-blue-600',
      'Green': 'from-green-400 to-green-600',
      'Purple': 'from-purple-400 to-purple-600',
      'Pink': 'from-pink-400 to-pink-600',
      'Gold': 'from-yellow-400 to-yellow-600',
      'Cream': 'from-yellow-200 to-yellow-400',
      'Black': 'from-gray-600 to-gray-800',
      'Yellow': 'from-yellow-400 to-yellow-600',
      'Maroon': 'from-red-600 to-red-800',
      'Grey': 'from-gray-400 to-gray-600',
      'Orange': 'from-orange-400 to-orange-600',
      'Peach': 'from-orange-300 to-pink-400',
      'Burgundy': 'from-red-700 to-purple-800',
      'Turquoise': 'from-teal-400 to-cyan-600'
    };
    return colorMap[color] || 'from-purple-400 to-pink-600';
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={saree.images[0]}
          alt={saree.title}
          className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          loading="lazy"
        />
        
        {/* Overlay on Hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
        
        {/* Quick Action Buttons */}
        <div className={`absolute top-4 right-4 space-y-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
            <span className="text-red-500">❤️</span>
          </button>
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg">
            <span className="text-blue-500">👁️</span>
          </button>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-purple-600 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            {saree.occasion}
          </span>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
            <span className="text-purple-600 font-bold text-lg">${saree.pricePerDay}</span>
            <span className="text-gray-600 text-xs">/day</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
          {saree.title}
        </h3>

        {/* Details */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <div 
                className="w-4 h-4 rounded-full border-2 border-gray-300"
                style={{ backgroundColor: saree.color.toLowerCase() }}
              ></div>
              <span className="text-sm text-gray-600">{saree.color}</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-sm text-gray-600">{saree.occasion}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400 text-sm">
                {star <= 4 ? '⭐' : '☆'}
              </span>
            ))}
            <span className="text-sm text-gray-600 ml-2">(4.5)</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/saree/${saree._id}`}
          className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold text-center hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          View Details
        </Link>

        {/* Additional Info on Hover */}
        <div className={`mt-4 pt-4 border-t border-gray-100 transition-all duration-300 ${isHovered ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Available for rent</span>
            <span className="text-green-600 font-medium">In Stock</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SareeCard;

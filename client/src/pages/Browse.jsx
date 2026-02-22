import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SareeCard from '../components/SareeCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Browse = () => {
  const [sarees, setSarees] = useState([]);
  const [filters, setFilters] = useState({ 
    search: '', 
    price: '', 
    color: '', 
    occasion: '',
    sortBy: 'newest'
  });
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchSarees();
  }, [filters]);

  const fetchSarees = async () => {
    try {
      const response = await axios.get('/api/sarees', { params: filters });
      setSarees(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sarees:', error);
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
        },
        {
          _id: 's4',
          title: 'Royal Blue Kanjeevaram',
          pricePerDay: 150,
          color: 'Blue',
          occasion: 'Wedding',
          images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMWU0MGU2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Sb3lhbCBCbHVlIEthbmplZXZhcmFtPC90ZXh0Pgo8L3N2Zz4=']
        },
        {
          _id: 's5',
          title: 'Golden Bridal Lehenga',
          pricePerDay: 200,
          color: 'Gold',
          occasion: 'Wedding',
          images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjZmJiZjI0Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9ImJsYWNrIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Hb2xkZW4gQnJpZGFsIExlaGVuZ2E8L3RleHQ+Cjwvc3ZnPg==']
        },
        {
          _id: 's6',
          title: 'Green Traditional Paithani',
          pricePerDay: 110,
          color: 'Green',
          occasion: 'Festive',
          images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMTBhNTUyIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5HcmVlbiBQYWl0aGFuaTwvdGV4dD4KPC9zdmc+']
        },
        {
          _id: 's7',
          title: 'Purple Designer Georgette',
          pricePerDay: 75,
          color: 'Purple',
          occasion: 'Party',
          images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjOGI1Y2Y2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5QdXJwbGUgR2VvcmdldHRlPC90ZXh0Pgo8L3N2Zz4=']
        },
        {
          _id: 's8',
          title: 'Maroon Traditional Madurai',
          pricePerDay: 135,
          color: 'Maroon',
          occasion: 'Festive',
          images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjODAwMDAwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5NYXJvb24gTWFkdXJhaTwvdGV4dD4KPC9zdmc+']
        },
        {
          _id: 's9',
          title: 'Orange Casual Cotton',
          pricePerDay: 45,
          color: 'Orange',
          occasion: 'Casual',
          images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjZmE3OTMxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5PcmFuZ2UgQ290dG9uPC90ZXh0Pgo8L3N2Zz4=']
        },
        {
          _id: 's10',
          title: 'Cream Wedding Mysore Silk',
          pricePerDay: 180,
          color: 'Cream',
          occasion: 'Wedding',
          images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjZmZmZmY4Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9ImJsYWNrIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DcmVhbSBNeXNvcmUgU2lsazwvdGV4dD4KPC9zdmc+']
        },
        {
          _id: 's11',
          title: 'Black Designer Evening Wear',
          pricePerDay: 90,
          color: 'Black',
          occasion: 'Party',
          images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjMDAwMDAwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5CbGFjayBFdmVuaW5nIFdlYXJ8PC90ZXh0Pgo8L3N2Zz4=']
        },
        {
          _id: 's12',
          title: 'Yellow Festive Bandhani',
          pricePerDay: 65,
          color: 'Yellow',
          occasion: 'Festive',
          images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjZmJmZjAwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9ImJsYWNrIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ZZWxsb3cgQmFuZGhhbmk8L3RleHQ+Cjwvc3ZnPg==']
        },
        {
          _id: 's13',
          title: 'Silver Grey Modern Saree',
          pricePerDay: 70,
          color: 'Grey',
          occasion: 'Party',
          images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjNmI3MjgwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5TaWx2ZXIgR3JleSBTYXJlZTwvdGV4dD4KPC9zdmc+']
        },
        {
          _id: 's14',
          title: 'Peach Bridal Soft Silk',
          pricePerDay: 140,
          color: 'Peach',
          occasion: 'Wedding',
          images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjZmZjNWE4Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9ImJsYWNrIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5QZWFjaCBCcmlkYWwgU2lsazwvdGV4dD4KPC9zdmc+']
        },
        {
          _id: 's15',
          title: 'Royal Purple Banarasi',
          pricePerDay: 160,
          color: 'Purple',
          occasion: 'Festive',
          images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjN2IyZmE4Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Sb3lhbCBQdXJwbGUgQmFuYXJhc2k8L3RleHQ+Cjwvc3ZnPg==']
        },
        {
          _id: 's16',
          title: 'Mint Green Casual Wear',
          pricePerDay: 50,
          color: 'Green',
          occasion: 'Casual',
          images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjOThlYWFkIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9ImJsYWNrIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5NaW50IEdyZWVuIENhc3VhbDwvdGV4dD4KPC9zdmc+']
        },
        {
          _id: 's17',
          title: 'Burgundy Wedding Ensemble',
          pricePerDay: 175,
          color: 'Burgundy',
          occasion: 'Wedding',
          images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjODAwMDIwIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5CdXJndW5keSBXZWRkaW5nPC90ZXh0Pgo8L3N2Zz4=']
        },
        {
          _id: 's18',
          title: 'Turquoise Designer Crepe',
          pricePerDay: 85,
          color: 'Turquoise',
          occasion: 'Party',
          images: ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjNDBlMGRhIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5UdXJxdW9pc2UgQ3JlcGU8L3RleHQ+Cjwvc3ZnPg==']
        }
      ];
      
      // Apply filters to mock data
      let filteredSarees = mockSarees;
      if (filters.search) {
        filteredSarees = filteredSarees.filter(saree => 
          saree.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          saree.color.toLowerCase().includes(filters.search.toLowerCase()) ||
          saree.occasion.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      if (filters.price) {
        filteredSarees = filteredSarees.filter(saree => saree.pricePerDay <= parseInt(filters.price));
      }
      if (filters.color) {
        filteredSarees = filteredSarees.filter(saree => saree.color === filters.color);
      }
      if (filters.occasion) {
        filteredSarees = filteredSarees.filter(saree => saree.occasion === filters.occasion);
      }
      
      setSarees(filteredSarees);
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ search: '', price: '', color: '', occasion: '', sortBy: 'newest' });
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Browse Our Collection
          </h1>
          <p className="text-gray-600 text-lg">Find the perfect saree for your special occasion</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search for sarees by name, color, or occasion..."
              value={filters.search}
              onChange={handleFilterChange}
              className="w-full px-6 py-4 pr-12 text-lg border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <span className="text-gray-400 text-xl">🔍</span>
            </div>
          </div>
        </div>

        {/* Filter Toggle Button */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            <span className="text-xl">⚙️</span>
            <span className="font-semibold">Filters</span>
            <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-sm">
              {Object.values(filters).filter(v => v !== '').length}
            </span>
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Sort by:</span>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Filter Options</h2>
              <button
                onClick={clearFilters}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Clear All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price/Day</label>
                <input
                  type="number"
                  name="price"
                  placeholder="e.g. 50"
                  value={filters.price}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
                <select
                  name="color"
                  value={filters.color}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Colors</option>
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  <option value="Purple">Purple</option>
                  <option value="Pink">Pink</option>
                  <option value="Yellow">Yellow</option>
                  <option value="Black">Black</option>
                  <option value="White">White</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Occasion</label>
                <select
                  name="occasion"
                  value={filters.occasion}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Occasions</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Festive">Festive</option>
                  <option value="Casual">Casual</option>
                  <option value="Party">Party</option>
                  <option value="Formal">Formal</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-purple-600">{sarees.length}</span> sarees
            {filters.search && (
              <span> for "<span className="font-semibold">{filters.search}</span>"</span>
            )}
          </p>
        </div>

        {/* Saree Grid */}
        {sarees.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No sarees found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={clearFilters}
              className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sarees.map((saree, index) => (
              <div 
                key={saree._id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <SareeCard saree={saree} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [sarees, setSarees] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      if (user.role === 'admin') {
        const [bookingsRes, usersRes] = await Promise.all([
          axios.get('/api/bookings').catch(() => ({ data: mockBookings })),
          axios.get('/api/admin/users').catch(() => ({ data: mockUsers })),
        ]);
        setBookings(bookingsRes.data);
        setUsers(usersRes.data);
      } else if (user.role === 'seller') {
        const [bookingsRes, sareesRes] = await Promise.all([
          axios.get('/api/bookings').catch(() => ({ data: mockBookings })),
          axios.get('/api/sarees').catch(() => ({ data: mockSarees })),
        ]);
        setBookings(bookingsRes.data);
        setSarees(sareesRes.data.filter(saree => saree.sellerId?._id === user._id || saree.sellerId === user._id));
      } else {
        // buyer
        const bookingsRes = await axios.get('/api/bookings').catch(() => ({ data: mockBookings.filter(b => b.buyerId?._id === user._id || b.buyerId === user._id) }));
        setBookings(bookingsRes.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Use mock data as fallback
      if (user.role === 'admin') {
        setBookings(mockBookings);
        setUsers(mockUsers);
      } else if (user.role === 'seller') {
        setBookings(mockBookings);
        setSarees(mockSarees);
      } else {
        setBookings(mockBookings.filter(b => b.buyerId?._id === user._id || b.buyerId === user._id));
      }
      setLoading(false);
    }
  };

  // Mock data for demo purposes
  const mockBookings = [
    {
      _id: '1',
      sareeId: { _id: 's1', title: 'Elegant Wedding Saree' },
      buyerId: { _id: 'b1', name: 'John Doe' },
      rentalStartDate: new Date('2024-01-15'),
      rentalEndDate: new Date('2024-01-17'),
      totalAmount: 150,
      status: 'confirmed'
    },
    {
      _id: '2',
      sareeId: { _id: 's2', title: 'Traditional Silk Saree' },
      buyerId: { _id: 'b2', name: 'Jane Smith' },
      rentalStartDate: new Date('2024-01-20'),
      rentalEndDate: new Date('2024-01-22'),
      totalAmount: 200,
      status: 'pending'
    },
    {
      _id: '3',
      sareeId: { _id: 's3', title: 'Designer Party Wear Saree' },
      buyerId: { _id: 'b3', name: 'Alice Johnson' },
      rentalStartDate: new Date('2024-01-10'),
      rentalEndDate: new Date('2024-01-12'),
      totalAmount: 180,
      status: 'cancelled'
    }
  ];

  const mockUsers = [
    { _id: 'u1', name: 'John Doe', email: 'john@example.com', role: 'buyer', isApproved: true },
    { _id: 'u2', name: 'Jane Smith', email: 'jane@example.com', role: 'seller', isApproved: true },
    { _id: 'u3', name: 'Bob Wilson', email: 'bob@example.com', role: 'seller', isApproved: false },
    { _id: 'u4', name: 'Alice Brown', email: 'alice@example.com', role: 'buyer', isApproved: true },
    { _id: 'u5', name: 'Charlie Davis', email: 'charlie@example.com', role: 'admin', isApproved: true }
  ];

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
    }
  ];

  const handleApproveSeller = async (userId) => {
    try {
      await axios.put(`/api/admin/users/${userId}/approve`);
      toast.success('Seller approved successfully');
      fetchData();
    } catch (error) {
      // Demo mode - just update local state
      console.log('Demo mode: Approving seller');
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user._id === userId ? { ...user, isApproved: true } : user
        )
      );
      toast.success('Seller approved successfully (Demo Mode)');
    }
  };

  const handleUpdateBookingStatus = async (bookingId, status) => {
    try {
      await axios.put(`/api/bookings/${bookingId}/status`, { status });
      toast.success('Booking status updated');
      fetchData();
    } catch (error) {
      // Demo mode - just update local state
      console.log('Demo mode: Updating booking status');
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking._id === bookingId ? { ...booking, status } : booking
        )
      );
      toast.success('Booking status updated (Demo Mode)');
    }
  };

  if (!user) {
    return <div className="text-center py-8">Please login to access dashboard</div>;
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {user.name}! Here's what's happening with your account.</p>
        </div>

        {user.role === 'admin' && (
          <div>
            {/* Admin Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-sm p-1 mb-8 inline-flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'overview'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'users'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'bookings'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                All Bookings
              </button>
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">👥</span>
                      </div>
                      <span className="text-sm text-gray-500 font-medium">Total</span>
                    </div>
                    <h3 className="text-gray-600 text-sm font-medium mb-1">Users</h3>
                    <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="text-green-600 font-medium">+12%</span>
                      <span className="text-gray-500 ml-2">from last month</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">📅</span>
                      </div>
                      <span className="text-sm text-gray-500 font-medium">Total</span>
                    </div>
                    <h3 className="text-gray-600 text-sm font-medium mb-1">Bookings</h3>
                    <p className="text-3xl font-bold text-gray-900">{bookings.length}</p>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="text-green-600 font-medium">+8%</span>
                      <span className="text-gray-500 ml-2">from last month</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">⏳</span>
                      </div>
                      <span className="text-sm text-gray-500 font-medium">Pending</span>
                    </div>
                    <h3 className="text-gray-600 text-sm font-medium mb-1">Sellers</h3>
                    <p className="text-3xl font-bold text-gray-900">{users.filter(u => u.role === 'seller' && !u.isApproved).length}</p>
                    <div className="mt-4 flex items-center text-sm">
                      <span className="text-orange-600 font-medium">Need approval</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    {bookings.slice(0, 5).map(booking => (
                      <div key={booking._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600">📅</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{booking.sareeId.title}</p>
                            <p className="text-sm text-gray-500">by {booking.buyerId.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-8 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                  <p className="text-gray-600 mt-2">Manage all users and their permissions</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {users.map(u => (
                        <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {u.name.charAt(0).toUpperCase()}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{u.name}</div>
                                <div className="text-sm text-gray-500">{u.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              u.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                              u.role === 'seller' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              u.role === 'seller' && !u.isApproved ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {u.role === 'seller' ? (u.isApproved ? 'Approved' : 'Pending') : 'Active'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {u.role === 'seller' && !u.isApproved && (
                              <button
                                onClick={() => handleApproveSeller(u._id)}
                                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
                              >
                                Approve
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">All Bookings</h2>
                  <div className="grid gap-6">
                    {bookings.map(booking => (
                      <div key={booking._id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                                <span className="text-purple-600">👘</span>
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900 text-lg">{booking.sareeId.title}</h3>
                                <p className="text-gray-600">Booked by: {booking.buyerId.name}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-6 text-sm text-gray-600">
                              <div className="flex items-center space-x-2">
                                <span>📅</span>
                                <span>{new Date(booking.rentalStartDate).toLocaleDateString()} - {new Date(booking.rentalEndDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span>💰</span>
                                <span className="font-semibold text-gray-900">${booking.totalAmount}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-3">
                            <span className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {booking.status}
                            </span>
                            {booking.status === 'pending' && (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleUpdateBookingStatus(booking._id, 'confirmed')}
                                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => handleUpdateBookingStatus(booking._id, 'cancelled')}
                                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      {user.role === 'seller' && (
          <div>
            {/* Seller Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-sm p-1 mb-8 inline-flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'overview'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('sarees')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'sarees'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                My Sarees
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'bookings'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Bookings
              </button>
            </div>

            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">👘</span>
                    </div>
                    <span className="text-sm text-gray-500 font-medium">Total</span>
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">My Sarees</h3>
                  <p className="text-3xl font-bold text-gray-900">{sarees.length}</p>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-600 font-medium">Active listings</span>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">📅</span>
                    </div>
                    <span className="text-sm text-gray-500 font-medium">Total</span>
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">Bookings</h3>
                  <p className="text-3xl font-bold text-gray-900">{bookings.length}</p>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-blue-600 font-medium">All time</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sarees' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">My Sarees</h2>
                  <Link 
                    to="/add-saree" 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Add New Saree
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sarees.map(saree => (
                    <div key={saree._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <img src={saree.images[0]} alt={saree.title} className="w-full h-48 object-cover" />
                      <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{saree.title}</h3>
                        <p className="text-purple-600 font-semibold text-lg mb-4">${saree.pricePerDay}/day</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">{saree.color} • {saree.occasion}</span>
                          <Link 
                            to={`/saree/${saree._id}`}
                            className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                          >
                            View Details →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
                <div className="grid gap-6">
                  {bookings.map(booking => (
                    <div key={booking._id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                              <span className="text-purple-600">👘</span>
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">{booking.sareeId.title}</h3>
                              <p className="text-gray-600">Booked by: {booking.buyerId.name}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <span>📅</span>
                              <span>{new Date(booking.rentalStartDate).toLocaleDateString()} - {new Date(booking.rentalEndDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span>💰</span>
                              <span className="font-semibold text-gray-900">${booking.totalAmount}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-3">
                          <span className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                          {booking.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleUpdateBookingStatus(booking._id, 'confirmed')}
                                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => handleUpdateBookingStatus(booking._id, 'cancelled')}
                                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {user.role === 'buyer' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
              {bookings.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">No bookings yet</h3>
                  <p className="text-gray-600 mb-6">You haven't made any bookings yet. Start browsing beautiful sarees!</p>
                  <Link 
                    to="/browse" 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 inline-block"
                  >
                    Browse Sarees
                  </Link>
                </div>
              ) : (
                <div className="grid gap-6">
                  {bookings.map(booking => (
                    <div key={booking._id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                              <span className="text-purple-600">👘</span>
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">{booking.sareeId.title}</h3>
                              <p className="text-gray-600">Rental Period</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <span>📅</span>
                              <span>{new Date(booking.rentalStartDate).toLocaleDateString()} - {new Date(booking.rentalEndDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span>💰</span>
                              <span className="font-semibold text-gray-900">${booking.totalAmount}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-3">
                          <span className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

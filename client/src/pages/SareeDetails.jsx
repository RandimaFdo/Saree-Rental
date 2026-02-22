import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const SareeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [saree, setSaree] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchSaree();
  }, [id]);

  const fetchSaree = async () => {
    try {
      const response = await axios.get(`/api/sarees/${id}`);
      setSaree(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching saree:', error);
      toast.error('Failed to load saree details');
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      toast.error('Please login to book a saree');
      navigate('/login');
      return;
    }

    if (!startDate || !endDate) {
      toast.error('Please select rental dates');
      return;
    }

    if (startDate >= endDate) {
      toast.error('End date must be after start date');
      return;
    }

    setBookingLoading(true);
    try {
      await axios.post('/api/bookings', {
        sareeId: id,
        rentalStartDate: startDate,
        rentalEndDate: endDate,
      });
      toast.success('Booking created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error(error.response?.data?.message || 'Failed to create booking');
    }
    setBookingLoading(false);
  };

  if (loading) return <LoadingSpinner />;
  if (!saree) return <div className="text-center py-8">Saree not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={saree.images[0] || 'https://via.placeholder.com/400x500'}
            alt={saree.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{saree.title}</h1>
          <p className="text-gray-600 mb-4">{saree.description}</p>
          <div className="mb-4">
            <span className="text-2xl font-semibold text-purple-600">${saree.pricePerDay}/day</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="font-semibold">Color:</span> {saree.color}
            </div>
            <div>
              <span className="font-semibold">Occasion:</span> {saree.occasion}
            </div>
            <div>
              <span className="font-semibold">Seller:</span> {saree.sellerId.name}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Book This Saree</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  minDate={new Date()}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholderText="Select start date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  minDate={startDate || new Date()}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholderText="Select end date"
                />
              </div>
            </div>
            <button
              onClick={handleBooking}
              disabled={bookingLoading}
              className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {bookingLoading ? 'Creating Booking...' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SareeDetails;

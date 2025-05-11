import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

const SchedulePage = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);

  const navigate = useNavigate();

  const timeSlots = Array.from({ length: 24 }, (_, i) =>
    `${String(i).padStart(2, '0')}:00`
  );

  const confirmBooking = () => {
    if (selectedSlot && selectedDate) {
      setBookedSlots(prev => [...prev, `${selectedDate.toLocaleDateString()}-${selectedSlot}`]);
      setStep(3);
    }
  };

  const goToAvailabilityPage = () => {
    navigate('/availability');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 px-6 md:px-20 py-20">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Schedule Your Interview</h1>

        {/* Step Indicator */}
        <div className="flex justify-center gap-4 text-sm font-medium text-gray-600">
          <div className={`px-4 py-2 rounded-full ${step === 1 ? 'bg-indigo-100 text-indigo-700' : ''}`}>1. Choose Date</div>
          <div className={`px-4 py-2 rounded-full ${step === 2 ? 'bg-indigo-100 text-indigo-700' : ''}`}>2. Select Time</div>
          <div className={`px-4 py-2 rounded-full ${step === 3 ? 'bg-green-100 text-green-700' : ''}`}>3. Confirm</div>
        </div>

        {/* Step 1: Date Picker */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700 text-center">Pick a Date</h2>
            <div className="flex justify-center">
              <div className="bg-white rounded-xl shadow p-4 border border-gray-200">
                <DatePicker
                  selected={selectedDate}
                  onChange={date => {
                    setSelectedDate(date);
                    setStep(2);
                  }}
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  inline
                  calendarClassName="custom-calendar"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Time Picker */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-700">Pick a Time Slot</h2>
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-sm text-indigo-600 hover:underline"
              >
                <FaArrowLeft /> Change Date
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {timeSlots.map(slot => {
                const key = `${selectedDate?.toLocaleDateString()}-${slot}`;
                const isBooked = bookedSlots.includes(key);

                return (
                  <button
                    key={slot}
                    disabled={isBooked}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-3 rounded-lg border shadow-sm text-sm transition-all duration-200
                      ${isBooked
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : selectedSlot === slot
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white hover:bg-indigo-100 text-gray-800 border-gray-300'}`}
                  >
                    <FaClock className="inline mr-2" /> {slot}
                  </button>
                );
              })}
            </div>

            <div className="text-center">
              <button
                onClick={confirmBooking}
                disabled={!selectedSlot}
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                <FaCheckCircle /> Confirm Slot
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="text-center space-y-4">
            <FaCheckCircle className="text-green-500 text-4xl mx-auto" />
            <h2 className="text-2xl font-semibold text-gray-800">You're Booked!</h2>
            <p className="text-gray-600">
              Interview on <strong>{selectedDate?.toLocaleDateString()}</strong> at{' '}
              <strong>{selectedSlot}</strong>
            </p>
            <button
              onClick={goToAvailabilityPage}
              className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Book Another Slot
            </button>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default SchedulePage;

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../componenets/Footer';
import axios from 'axios';

<<<<<<< Updated upstream
const Event = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState('');
=======
const MyEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); 
>>>>>>> Stashed changes
  const eventDetailRef = useRef(null); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/event/all-events`);
<<<<<<< Updated upstream
        // Filter to show only approved events
        const approvedEvents = response.data.AllEvent.filter(event => event.status === 'Approved');
        setEvents(approvedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events');
      } finally {
        setLoading(false);
=======
        console.log('response:', response);
        setEvents(response.data.AllEvent || []);
      } catch (error) {
        console.error('Error fetching events:', error);
>>>>>>> Stashed changes
      }
    };

    fetchEvents();
  }, []);

  // Handle clicking an event box
  const handleEventClick = (event) => {
<<<<<<< Updated upstream
    setSelectedEvent(event);
    eventDetailRef.current.scrollIntoView({ behavior: 'smooth' });
=======
    setSelectedEvent(event); // Set the selected event to display details
    eventDetailRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to the event details block
>>>>>>> Stashed changes
  };

  // Handle the Request button click
  const handleRequestClick = (event) => {
<<<<<<< Updated upstream
    setSelectedEvent(event);
    setShowRequestModal(true);
  };

  const handleRequestSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setRequestStatus('Please login to request to join events');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/event/request-event',
        {
          eventId: selectedEvent._id,
          message: requestMessage
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setRequestStatus('Request sent successfully!');
        setRequestMessage('');
        setTimeout(() => {
          setShowRequestModal(false);
          setRequestStatus('');
        }, 2000);
      } else {
        setRequestStatus(response.data.message || 'Failed to send request');
      }
    } catch (error) {
      console.error('Error sending request:', error);
      setRequestStatus(error.response?.data?.message || 'Failed to send request');
    }
=======
    alert(`Request sent for the event: ${event.eventName}`);
    
>>>>>>> Stashed changes
  };

  const handleGetQR = () => {
    if (selectedEvent && selectedEvent._id) {
      navigate(`/qr/${selectedEvent._id}`);
    }
  };

<<<<<<< Updated upstream
  if (loading) return <div className="p-4">Loading events...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col min-h-screen p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Events</h1>
        </div>
        <div className="text-center text-gray-500">No approved events available</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Approved Events</h1>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition cursor-pointer flex flex-col"
            onClick={() => handleEventClick(event)}
          >
            <h3 className="text-xl font-bold text-blue-700 mb-2">{event.eventName}</h3>
            <p className="text-gray-700 mb-1"><span className="font-semibold">Organizer:</span> {event.organizarName}</p>
            <p className="text-gray-600 mb-1">{event.date} | {event.time}</p>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Venue:</span> {event.venue}</p>
            {event.requestType === 'Request to Join' && (
              <button 
                className="mt-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                onClick={e => {
                  e.stopPropagation();
                  handleRequestClick(event);
                }}
              >
                Request
              </button>
            )}
=======
  if (!events || events.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Events</h1>
      </div>

      {/* Container for the event boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="cursor-pointer p-4 border rounded-lg shadow-lg hover:bg-gray-100"
            onClick={() => handleEventClick(event)} // Set selected event on click
          >
            <h3 className="text-lg font-semibold">{event.eventName}</h3>
            <p className="text-sm text-gray-600">{event.organizarName}</p>
            <p className="text-sm text-gray-600">{event.date} | {event.time}</p>

            
            {event.requestType === 'Request to Join' && (
              <button 
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the card click handler from firing
                  handleRequestClick(event); // Handle the request button click
                }}
              >
                
                Request
              </button>
            )}
            
>>>>>>> Stashed changes
          </div>
        ))}
      </div>

<<<<<<< Updated upstream
      {/* Event Details */}
      {selectedEvent && (
        <div ref={eventDetailRef} className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setSelectedEvent(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-blue-700">{selectedEvent.eventName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="mb-2"><span className="font-semibold">Organizer Name:</span> {selectedEvent.organizarName}</p>
                <p className="mb-2"><span className="font-semibold">Date:</span> {selectedEvent.date}</p>
                <p className="mb-2"><span className="font-semibold">Time:</span> {selectedEvent.time}</p>
                <p className="mb-2"><span className="font-semibold">Venue:</span> {selectedEvent.venue}</p>
                <p className="mb-2"><span className="font-semibold">Expected Count:</span> {selectedEvent.expectedCount}</p>
              </div>
              <div>
                <p className="mb-2"><span className="font-semibold">Description:</span> {selectedEvent.discription}</p>
                <p className="mb-2"><span className="font-semibold">Contact No:</span> {selectedEvent.organizarContactNo}</p>
                <p className="mb-2"><span className="font-semibold">Email:</span> {selectedEvent.organizarEmail}</p>
                <p className="mb-2"><span className="font-semibold">Request Type:</span> {selectedEvent.requestType}</p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition"
                onClick={handleGetQR}
              >
                Get QR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Request to Join Event</h2>
            <p className="mb-4 text-gray-700">Event: <span className="font-semibold">{selectedEvent.eventName}</span></p>
            <textarea
              value={requestMessage}
              onChange={e => setRequestMessage(e.target.value)}
              placeholder="Enter your message..."
              className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
            />
            {requestStatus && (
              <div className={`mb-4 p-2 rounded ${
                requestStatus.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {requestStatus}
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowRequestModal(false);
                  setRequestMessage('');
                  setRequestStatus('');
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Send Request
              </button>
            </div>
          </div>
=======
      
      {selectedEvent && (
        <div ref={eventDetailRef} className="mt-8 p-6 border rounded-lg shadow-lg bg-white">
          <h2 className="text-xl font-bold mb-4">Event Details</h2>
          <div className="mb-2"><strong>Event Name:</strong> {selectedEvent.eventName}</div>
          <div className="mb-2"><strong>Organizer Name:</strong> {selectedEvent.organizarName}</div>
          <div className="mb-2"><strong>Description:</strong> {selectedEvent.discription}</div>
          <div className="mb-2"><strong>Date:</strong> {selectedEvent.date}</div>
          <div className="mb-2"><strong>Time:</strong> {selectedEvent.time}</div>
          <div className="mb-2"><strong>Venue:</strong> {selectedEvent.venue}</div>
          <div className="mb-2"><strong>Contact No:</strong> {selectedEvent.organizarContactNo}</div>
          <div className="mb-2"><strong>Email:</strong> {selectedEvent.organizarEmail}</div>
          <div className="mb-2"><strong>Expected Count:</strong> {selectedEvent.expectedCount}</div>
          <div className="mb-2"><strong>Request Type:</strong> {selectedEvent.requestType}</div>
          <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" onClick={handleGetQR}>GetQR</button>
>>>>>>> Stashed changes
        </div>
      )}

      <Footer />
    </div>
  );
};

<<<<<<< Updated upstream
export default Event;
=======
export default MyEvents;
>>>>>>> Stashed changes

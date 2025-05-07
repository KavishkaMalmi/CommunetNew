import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../componenets/Footer';
import axios from 'axios';

const UpdateEvent = () => {
  const navigate = useNavigate();
<<<<<<< Updated upstream
  const { id } = useParams();
  const [event, setEvent] = useState({
    eventName: '',
    organizarName: '',
    discription: '',
    date: '',
    time: '',
    venue: '',
    organizarContactNo: '',
    organizarEmail: '',
    expectedCount: '',
    requestType: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
=======
  const [event, setEvent] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const eventId = '67e335e3a98233634496d859';
>>>>>>> Stashed changes

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError('Please login to update event');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/api/event/my-events', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.data && response.data.event) {
          // Find the specific event by ID from the array of events
          const eventToUpdate = response.data.event.find(e => e._id === id);
          if (eventToUpdate) {
            setEvent(eventToUpdate);
          } else {
            setError('Event not found');
          }
        } else {
          setError('No events found');
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Failed to fetch event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert('Please login to update event');
        return;
      }
      const response = await axios.put(
        `http://localhost:5000/api/event/update-event/${id}`,
        event,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );


      if (response.data.success) {
        alert('Event updated successfully');
        navigate('/MyEvents');
      } else {
        alert(response.data.message || 'Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error.response?.data || error.message);
      alert('Failed to update event. Please try again.');
    }
  };

  if (loading) return <div className="p-4">Loading event details...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
<<<<<<< Updated upstream
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">Update Event</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Event Name</label>
            <input
              type="text"
              name="eventName"
              value={event.eventName}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Organizer Name</label>
            <input
              type="text"
              name="organizarName"
              value={event.organizarName}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="discription"
              value={event.discription}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={event.date}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Time</label>
            <input
              type="time"
              name="time"
              value={event.time}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Venue</label>
            <input
              type="text"
              name="venue"
              value={event.venue}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Contact Number</label>
            <input
              type="text"
              name="organizarContactNo"
              value={event.organizarContactNo}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="organizarEmail"
              value={event.organizarEmail}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Expected Count</label>
            <input
              type="number"
              name="expectedCount"
              value={event.expectedCount}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Request Type</label>
            <select
              name="requestType"
              value={event.requestType}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Select a request type</option>
              <option value="Request to Join">Request to Join</option>
              <option value="All In">All In</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/my-events')}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Update Event
          </button>
        </div>
      </form>
=======
    <div className="flex flex-col min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Event Details</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Event Name</th>
              <th className="p-2 border">Organizer Name</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Venue</th>
              <th className="p-2 border">Contact No</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Expected Count</th>
              <th className="p-2 border">Request Type</th> 
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="p-2 border">
                {isEdit ? (
                  <input
                    type="text"
                    value={event?.eventName || ''}
                    onChange={(e) => setEvent({ ...event, eventName: e.target.value })}
                  />
                ) : (
                  event.eventName
                )}
              </td>
              <td className="p-2 border">{event?.organizerName || 'N/A'}</td>
              <td className="p-2 border">
                {isEdit ? (
                  <textarea
                    value={event?.description || ''}
                    onChange={(e) => setEvent({ ...event, description: e.target.value })}
                  />
                ) : (
                  event.description
                )}
              </td>
              <td className="p-2 border">{event?.date || 'N/A'}</td>
              <td className="p-2 border">{event?.time || 'N/A'}</td>
              <td className="p-2 border">{event?.venue || 'N/A'}</td>
              <td className="p-2 border">{event?.organizerContactNo || 'N/A'}</td>
              <td className="p-2 border">{event?.organizerEmail || 'N/A'}</td>
              <td className="p-2 border">{event?.expectedCount || 'N/A'}</td>
              <td className="p-2 border">
                {isEdit ? (
                  <select
                    value={event?.requestType || ''}
                    onChange={(e) => setEvent({ ...event, requestType: e.target.value })}
                    className="p-2 w-full border rounded-md"
                  >
                    <option value="">Select a request type</option>
                    <option value="Request to Join">Request to Join</option>
                    <option value="All In">All In</option>
                  </select>
                ) : (
                  event.requestType || 'N/A'
                )}
              </td>
              <td className="p-2 border">
                {isEdit ? (
                  <button onClick={updateEvent} className="bg-green-500 text-white px-4 py-1 rounded-lg mr-2">
                    Save
                  </button>
                ) : (
                  <button onClick={() => setIsEdit(true)} className="bg-yellow-500 text-white px-4 py-1 rounded-lg mr-2">
                    Edit
                  </button>
                )}
                <button onClick={deleteEvent} className="bg-red-500 text-white px-4 py-1 rounded-lg">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
>>>>>>> Stashed changes
      <Footer />
    </div>
  );
};

export default UpdateEvent;

import React from 'react';
import Footer from '../componenets/Footer';
<<<<<<< Updated upstream
import HomeHeder from '../componenets/HomeHeder';
import poolImg from '../assets/pool.jpg'; 
import gardenImg from '../assets/garden.jpg'; 

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="pt-24">
        <HomeHeder />
        
        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Community Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Beautiful Homes</h3>
                <p className="text-gray-600">Discover our well-maintained properties with modern amenities and beautiful landscaping.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Events</h3>
                <p className="text-gray-600">Join our vibrant community with regular events, gatherings, and social activities.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Security</h3>
                <p className="text-gray-600">Enjoy peace of mind with our comprehensive security measures and surveillance systems.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Highlights */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Community Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src={poolImg}
                  alt="Community Pool"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">Swimming Pool</h3>
                    <p className="text-sm">Enjoy our Olympic-sized pool with dedicated lap lanes and children's area.</p>
                  </div>
                </div>
              </div>
              
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src={gardenImg}
                  alt="Community Garden"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">Community Garden</h3>
                    <p className="text-sm">Grow your own vegetables and flowers in our well-maintained community garden.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
=======
import HomeHeader from '../componenets/HomeHeder';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header Section */}
      <HomeHeader />

      {/* Introduction Section */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 text-lg leading-relaxed">
        <p className="text-center text-2xl font-bold text-gray-900 mb-6">
          Welcome to Our Apartment Community
        </p>
        <p className="text-gray-700 text-center">
          Experience modern living with a vibrant, well-connected, and secure apartment community. We provide top-notch amenities, seamless communication, and efficient management to enhance your lifestyle.
        </p>
      </div>

      {/* Features Section */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-12 grid gap-6 md:grid-cols-2">
        {[
          { title: "Luxury Amenities", description: "Enjoy swimming pools, gyms, lounges, and green spaces designed for relaxation and socializing." },
          { title: "Security & Safety", description: "24/7 surveillance, gated entry, and responsive security teams ensure a safe living environment." },
          { title: "Community Events", description: "Participate in social gatherings, cultural festivals, and interactive resident meetups." },
          { title: "Maintenance Requests", description: "Easily report and track maintenance issues to keep your home in top condition." },
          { title: "Resident Services", description: "Access billing, lease information, and personalized services at your convenience." },
        ].map((feature, index) => (
          <div key={index} className="bg-white p-6 shadow-md rounded-lg border-l-4 border-blue-600">
            <p className="text-xl font-bold text-gray-900 mb-2">{feature.title}</p>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center py-8">
        <p className="text-gray-700 text-lg mb-4">
          Join a welcoming, well-managed apartment community where comfort meets convenience.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Explore More
        </button>
>>>>>>> Stashed changes
      </div>

      <Footer />
    </div>
  );
};

export default Home;

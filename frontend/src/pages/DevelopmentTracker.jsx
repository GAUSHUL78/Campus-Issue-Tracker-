import React from 'react';

const DevelopmentTracker = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto pt-24">
      <h1 className="text-2xl font-bold mb-4">Campus Development Tracker</h1>
      {/* Placeholder for development list and form */}
      <div className="bg-white rounded shadow p-4 mb-4">
        <div className="text-gray-500">(Campus developments will be listed here.)</div>
      </div>
      <div className="bg-white rounded shadow p-4">
        <div className="text-gray-500">(Form to add/edit development will appear here for admins.)</div>
      </div>
    </div>
  );
};

export default DevelopmentTracker; 
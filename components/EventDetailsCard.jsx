"use client";

import React from 'react';

const EventDetailsCard = ({ eventDetail }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Image */}
      <div className="w-full h-64">
        <img
          className="w-full h-full object-cover"
          src={eventDetail.image}
          alt="Event Image"
        />
      </div>

      {/* Details */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{eventDetail.name}</h2>
        <div className="text-gray-600 mb-4">
          <p className="text-lg">{eventDetail.location}</p>
          <p className="text-md">By {eventDetail.artist}</p>
        </div>

        {/* Tags */}
        <div className="mb-4">
          {Array.isArray(eventDetail.tags) &&
            eventDetail.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 mb-2"
              >
                #{tag}
              </span>
            ))}
        </div>

        {/* Description */}
        <div className="text-gray-700 mb-4">
          {eventDetail.description}
        </div>

        {/* Price & Buy Button */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-green-600">
            {/* nice idea to add free if price is 0 */}
            {eventDetail.price > 0 ? `$${eventDetail.price}` : "FREE"}
          </span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Buy Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsCard;

"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
  iconSize: [30, 30],
});

const LeafletMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

 
  const locations = [
    { id: 1, name: "خیابان امام خمینی", position: [35.6892, 51.389] },
    { id: 2, name: "اصفهان", position: [32.6546, 51.6675] },
    { id: 3, name: "شیراز", position: [29.5918, 52.5837] },
  ];

  return (
    <div className="w-full h-[500px] relative">
     
      <MapContainer center={[35.6892, 51.389]} zoom={6} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={location.position}
            icon={customIcon}
            eventHandlers={{
              click: () => setSelectedLocation(location),
            }}
          >
            <Tooltip>{location.name}</Tooltip>
          </Marker>
        ))}
      </MapContainer>

   
      {selectedLocation && (
        <div
          className="absolute bg-white border border-gray-300 rounded-md shadow-lg p-4"
          style={{
            left: "50%",
            top: "10%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h3 className="text-lg font-semibold">{selectedLocation.name}</h3>
          <p className="text-sm text-gray-600">موقعیت انتخاب شده: {selectedLocation.name}</p>
          <button
            onClick={() => setSelectedLocation(null)}
            className="text-red-500 underline mt-2"
          >
            بستن
          </button>
        </div>
      )}
    </div>
  );
};

export default LeafletMap;

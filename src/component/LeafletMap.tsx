"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MapData from "./MapData";

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
  iconSize: [30, 30],
});

const MapWithPopup = () => {
  const Data = MapData().Location;

  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  return (
    <div className="w-full h-[600px] relative">
      <MapContainer
        center={[35.7002, 51.4103]}
        zoom={12}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {Data.map((location) => (
          <Marker
            key={location.id}
            position={location.position}
            icon={customIcon}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{location.name}</h3>
                <p>{location.description}</p>
                <p className="text-xs text-gray-500">
                  مختصات: {location.position[0]}, {location.position[1]}
                </p>
                <button
                  onClick={() => setSelectedLocation(location)}
                  className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg"
                >
                  جزئیات بیشتر
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {selectedLocation && (
        <div className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-[300px] top-10 left-10 transition-all duration-300">
          <button
            className="absolute top-2 right-2 text-red-600 text-lg"
            onClick={() => setSelectedLocation(null)} // بستن پنجره
          >
            &times;
          </button>
          <h3 className="text-lg font-bold mb-2">{selectedLocation.name}</h3>
          <p className="text-sm text-gray-600">
            {selectedLocation.description}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            مختصات: {selectedLocation.position[0]},{" "}
            {selectedLocation.position[1]}
          </p>
        </div>
      )}
    </div>
  );
};

export default MapWithPopup;

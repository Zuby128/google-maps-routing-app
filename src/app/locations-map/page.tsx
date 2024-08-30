"use client";
import GoogleMapComponent from "@/src/components/GoogleMap";
import { MapProvider } from "@/src/providers/map-providers";
import { useState } from "react";

function LocationsMap() {
  const [markers, setMarkers] = useState<MarkerProps[]>([]);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  return (
    <>
      <MapProvider>
        <GoogleMapComponent markers={markers} onMapClick={setCoordinates} />
      </MapProvider>
    </>
  );
}

export default LocationsMap;

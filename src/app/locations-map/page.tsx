"use client";
import GoogleMapComponent from "@/src/components/GoogleMap";
import { MapProvider } from "@/src/providers/map-providers";
import { useMarkerStore } from "@/src/store/useMarkerStore";
import { useState } from "react";

function LocationsMap() {
  const { markers } = useMarkerStore();
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  return (
    <>
      <MapProvider>
        <GoogleMapComponent
          markers={markers}
          setCoordinate={setCoordinates}
          coordinate={coordinates}
        />
      </MapProvider>
    </>
  );
}

export default LocationsMap;

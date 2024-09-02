"use client";
import GoogleMapComponent from "@/src/components/GoogleMap";
import { MapProvider } from "@/src/providers/map-providers";
import { useMarkerStore } from "@/src/store/useMarkerStore";
import { InfoIcon } from "@chakra-ui/icons";
import { Alert, Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function LocationsMap() {
  const { markers, loadMarkers, loading } = useMarkerStore();
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    loadMarkers();
  }, [loadMarkers]);

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

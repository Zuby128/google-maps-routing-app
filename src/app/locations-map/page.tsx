"use client";
import GoogleMapComponent from "@/src/components/GoogleMap";
import { MapProvider } from "@/src/providers/map-providers";
import { InfoIcon } from "@chakra-ui/icons";
import { Alert, Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function LocationsMap() {
  const [markers, setMarkers] = useState<MarkerProps[]>([]);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  const getMarkers = () => {
    const list = JSON.parse(window.localStorage.getItem("markers") || `[]`);

    setMarkers(list);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getMarkers();
      console.log(window.localStorage.getItem("currentLocation"));
    }
  }, [typeof window]);

  return (
    <>
      <Container>
        <Alert status="info" marginY={4}>
          <InfoIcon marginRight={4} />
          Please click on map in order to select your current position
        </Alert>
      </Container>
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

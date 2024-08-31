"use client";
import GoogleMapComponent from "@/src/components/GoogleMap";
import { MapProvider } from "@/src/providers/map-providers";
import { useMarkerStore } from "@/src/store/useMarkerStore";
import { InfoIcon } from "@chakra-ui/icons";
import { Alert, Container } from "@chakra-ui/react";
import { useState } from "react";

function LocationsMap() {
  const { markers } = useMarkerStore();
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

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

import React from "react";
import { MapProvider } from "../providers/map-providers";
import { GoogleMap } from "@react-google-maps/api";
import { Container } from "@chakra-ui/react";

export const defaultMapContainerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "15px 0px 0px 15px",
};

const defaultMapCenter = {
  lat: 37.784562,
  lng: 29.08396,
};
const defaultMapZoom = 17;
const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  // mapTypeId: "satellite",
};

function GoogleMapComponent() {
  return (
    <Container maxW={"3xl"}>
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      ></GoogleMap>
    </Container>
  );
}

export default GoogleMapComponent;

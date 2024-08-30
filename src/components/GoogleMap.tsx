import React from "react";
import { MapProvider } from "../providers/map-providers";
import {
  Circle,
  GoogleMap,
  InfoBox,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { Container } from "@chakra-ui/react";

export const defaultMapContainerStyle = {
  width: "100%",
  height: "50vh",
  borderRadius: "8px",
};

const defaultMapCenter = {
  lat: 37.784562,
  lng: 29.08396,
};
const defaultMapZoom = 13;
const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  // mapTypeId: "satellite",
};

const GoogleMapComponent: React.FC<MapComponentProps> = ({ markers }) => {
  const onLoad = (infoBox: any) => {
    console.log("infoBox: ", infoBox);
  };

  const position = {
    lat: 37.784562,
    lng: 29.08396,
  };

  return (
    <Container maxW={"3xl"}>
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        <Marker
          onLoad={onLoad}
          position={position}
          shape={"circle" as unknown as google.maps.MarkerShape}
          clickable={true}
          onClick={() => console.log("first")}
          icon={{
            // url: `http://maps.google.com/mapfiles/ms/icons/${marker.color}-dot.png`,
            url: `http://maps.google.com/mapfiles/ms/icons/red-pushpin.png`,
          }}
          title="test"
        />
        <InfoWindow onLoad={onLoad} position={position}>
          <div>
            <h1>InfoWindow</h1>
          </div>
        </InfoWindow>
        <Marker
          onLoad={onLoad}
          position={{
            lat: 37.78,
            lng: 29.08,
          }}
          shape={"circle" as unknown as google.maps.MarkerShape}
          clickable={true}
          onClick={() => console.log("first")}
          icon={{
            // url: `http://maps.google.com/mapfiles/ms/icons/${marker.color}-dot.png`,
            url: `http://maps.google.com/mapfiles/ms/icons/red-dot.png`,
          }}
        />
      </GoogleMap>
    </Container>
  );
};

export default GoogleMapComponent;

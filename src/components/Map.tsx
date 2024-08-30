"use client";
import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Container } from "@chakra-ui/react";

function Map() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");
      const { Marker } = await loader.importLibrary("marker");

      const position = {
        lat: 37.784562,
        lng: 29.08396,
      };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 17,
        mapId: "TECH_ASSESSMENT",
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      const marker = new Marker({
        map: map,
        position: position,
      });
    };

    initMap();
  }, []);

  return (
    <Container maxW={"3xl"}>
      <div ref={mapRef} style={{ height: "50vh" }} />
    </Container>
  );
}

export default Map;

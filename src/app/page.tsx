"use client";
import GoogleMapComponent from "../components/GoogleMap";
import { MapProvider } from "../providers/map-providers";

// const GoogleMapComponent = dynamic(() => import("../components/GoogleMap"), {
//   ssr: false,
// });

export default function Home() {
  return (
    <>
      <MapProvider>
        <GoogleMapComponent />
      </MapProvider>
    </>
  );
}

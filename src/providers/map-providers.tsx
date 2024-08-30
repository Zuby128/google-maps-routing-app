"use client";

import { Box, Center, CircularProgress } from "@chakra-ui/react";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { ReactNode } from "react";

// Define a list of libraries to load from the Google Maps API
const libraries = ["places", "drawing", "geometry"];

// Define a function component called MapProvider that takes a children prop
export function MapProvider({ children }: { children: ReactNode }) {
  // Load the Google Maps JavaScript API asynchronously
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries: libraries as Libraries,
  });

  if (loadError) return <p>Encountered error while loading google maps</p>;

  if (!scriptLoaded)
    return (
      <Box width="100%" height="100vh">
        <Center width="100%" height="100%">
          <CircularProgress isIndeterminate color="green.300" />
        </Center>
      </Box>
    );

  // Return the children prop wrapped by this MapProvider component
  return children;
}

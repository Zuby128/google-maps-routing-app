"use client";

import { Box, Center, CircularProgress } from "@chakra-ui/react";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { ReactNode } from "react";

const libraries = ["places", "drawing", "geometry"];

export function MapProvider({ children }: { children: ReactNode }) {
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries: libraries as Libraries,
  });

  if (loadError) return <p>Encountered error while loading google maps</p>;

  if (!scriptLoaded)
    return (
      <Box width="100%" height="50vh">
        <Center width="100%" height="100%">
          <CircularProgress isIndeterminate color="green.300" />
        </Center>
      </Box>
    );

  return children;
}

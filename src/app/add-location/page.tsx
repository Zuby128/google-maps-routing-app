"use client";

import { Box } from "@chakra-ui/react";
import { MapProvider } from "@/src/providers/map-providers";
import GoogleMapComponent from "@/src/components/GoogleMap";
import { useState } from "react";
import AddForm from "@/src/components/AddForm";

function AddLocation() {
  const [coordinate, setCoordinate] = useState<Coordinates | null>(null);
  const [dotColor, setDotColor] = useState<string>("");
  return (
    <>
      <Box paddingTop={"10px"}>
        <MapProvider>
          <GoogleMapComponent
            markers={[]}
            setCoordinate={setCoordinate}
            coordinate={coordinate}
            dotColor={dotColor}
          />
        </MapProvider>
      </Box>
      <AddForm coordinate={coordinate} setDotColor={setDotColor} />
    </>
  );
}

export default AddLocation;

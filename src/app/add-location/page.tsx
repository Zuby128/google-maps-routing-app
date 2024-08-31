"use client";

import { Box } from "@chakra-ui/react";
import { MapProvider } from "@/src/providers/map-providers";
import GoogleMapComponent from "@/src/components/GoogleMap";
import { useState } from "react";
import AddForm from "@/src/components/AddForm";

function AddLocation() {
  const [coordinate, setCoordinate] = useState<Coordinates | null>(null);
  return (
    <>
      <Box paddingTop={"10px"}>
        <MapProvider>
          <GoogleMapComponent
            markers={[]}
            setCoordinate={setCoordinate}
            coordinate={coordinate}
          />
        </MapProvider>
      </Box>
      <AddForm coordinate={coordinate} />
    </>
  );
}

export default AddLocation;

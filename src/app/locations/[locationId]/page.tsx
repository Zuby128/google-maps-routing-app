"use client";

import { Box, Button, Container } from "@chakra-ui/react";
import { MapProvider } from "@/src/providers/map-providers";
import GoogleMapComponent from "@/src/components/GoogleMap";
import { useState } from "react";
import AddForm from "@/src/components/AddForm";
import { useParams, useRouter } from "next/navigation";

function EditLocation() {
  const [coordinate, setCoordinate] = useState<Coordinates | null>(null);
  const { locationId } = useParams();
  const route = useRouter();
  return (
    <>
      <Container>
        <Button
          width="100%"
          color="white"
          backgroundColor="red"
          onClick={() => route.push("/locations-map")}
        >
          Show Route
        </Button>
      </Container>
      <Box paddingTop={"10px"}>
        <MapProvider>
          <GoogleMapComponent markers={[]} setCoordinate={setCoordinate} />
        </MapProvider>
      </Box>
      <AddForm coordinate={coordinate} id={locationId as string} />
    </>
  );
}

export default EditLocation;

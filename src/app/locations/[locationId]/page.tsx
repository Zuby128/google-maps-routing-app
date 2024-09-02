"use client";

import { Box, Button, Container } from "@chakra-ui/react";
import { MapProvider } from "@/src/providers/map-providers";
import GoogleMapComponent from "@/src/components/GoogleMap";
import { Dispatch, useState } from "react";
import AddForm from "@/src/components/AddForm";
import { useParams, useRouter } from "next/navigation";
import { useMarkerStore } from "@/src/store/useMarkerStore";

function EditLocation() {
  const [coordinate, setCoordinate] = useState<Coordinates | null>(null);
  const [dotColor, setDotColor] = useState<string>("");
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
          <GoogleMapComponent
            markers={[]}
            setCoordinate={setCoordinate}
            dotColor={dotColor}
            coordinate={coordinate}
          />
        </MapProvider>
      </Box>
      <AddForm
        coordinate={coordinate}
        id={locationId as string}
        setDotColor={setDotColor}
        setCoordinate={
          setCoordinate as React.Dispatch<React.SetStateAction<Coordinates>>
        }
      />
    </>
  );
}

export default EditLocation;

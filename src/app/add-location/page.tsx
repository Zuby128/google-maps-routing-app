"use client";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Box, FormControl } from "@chakra-ui/react";
import { MapProvider } from "@/src/providers/map-providers";
import GoogleMapComponent from "@/src/components/GoogleMap";
import { useEffect, useState } from "react";
import AddForm from "@/src/components/AddForm";

function AddLocation() {
  const [coordinate, setCoordinate] = useState<Coordinates | null>(null);
  return (
    <>
      <Box paddingTop={"10px"}>
        <MapProvider>
          <GoogleMapComponent markers={[]} setCoordinate={setCoordinate} />
        </MapProvider>
      </Box>
      <AddForm coordinate={coordinate} />
    </>
  );
}

export default AddLocation;

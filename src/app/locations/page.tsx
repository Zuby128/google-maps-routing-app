"use client";
import ClickedPin from "@/src/components/ClickedPin";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Card,
  CardBody,
  Container,
  Flex,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Locations() {
  const router = useRouter();
  const [markers, setMarkers] = useState<MarkerProps[]>([]);
  const getMarkers = () => {
    const list = JSON.parse(window.localStorage.getItem("markers") || `[]`);

    setMarkers(list);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getMarkers();
      console.log(window.localStorage.getItem("markers"));
    }
  }, [typeof window]);

  return (
    <Container padding={4}>
      {markers.length === 0 && (
        <Alert status="error">
          <AlertIcon />
          You dont have any markers yet
        </Alert>
      )}
      {markers.map((v) => (
        <Card key={v.id}>
          <CardBody>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Box>{v.title}</Box>
              <ClickedPin coordinate={{ lat: v.lat, lng: v.lng }}>
                <Image
                  src={`http://maps.google.com/mapfiles/ms/icons/${v.color}-pushpin.png`}
                />
              </ClickedPin>
              <IconButton
                aria-label="Search database"
                icon={<ArrowForwardIcon />}
                onClick={() => router.push(`/locations/${v.id}`)}
              />
            </Flex>
          </CardBody>
        </Card>
      ))}
    </Container>
  );
}

export default Locations;

"use client";

import ClickedPin from "@/src/components/ClickedPin";
import { useMarkerStore } from "@/src/store/useMarkerStore";
import { ArrowForwardIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Card,
  CardBody,
  Center,
  CircularProgress,
  Container,
  Flex,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Locations() {
  const router = useRouter();
  const { markers, deleteMarker, loading, loadMarkers } = useMarkerStore();

  const handleDelete = (id: string) => {
    if (!id) return;
    deleteMarker(id);
  };

  useEffect(() => {
    loadMarkers();
  }, [loadMarkers]);

  return (
    <Container padding={4}>
      {loading && (
        <Center width="100%" height="100%">
          <CircularProgress isIndeterminate color="green.300" />
        </Center>
      )}
      {!loading && markers.length === 0 && (
        <Alert status="error">
          <AlertIcon />
          You dont have any markers yet
        </Alert>
      )}
      {!loading &&
        markers.map((v) => (
          <Card key={v.id}>
            <CardBody>
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Box>{v.title}</Box>
                <ClickedPin coordinate={{ lat: v.lat, lng: v.lng }}>
                  <Image
                    src={`http://maps.google.com/mapfiles/ms/icons/${v.color}-pushpin.png`}
                  />
                </ClickedPin>
                <Box gap={2}>
                  <IconButton
                    backgroundColor="transparent"
                    aria-label="delete marker"
                    icon={<DeleteIcon color="red" />}
                    onClick={() => handleDelete(v.id as string)}
                  />
                  <IconButton
                    aria-label="go to locations"
                    icon={<ArrowForwardIcon />}
                    onClick={() => router.push(`/locations/${v.id}`)}
                  />
                </Box>
              </Flex>
            </CardBody>
          </Card>
        ))}
    </Container>
  );
}

export default Locations;

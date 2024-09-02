"use client";
import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
  coordinate: Coordinates;
}

const ClickedPin: React.FC<Props> = ({ coordinate, children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => setOpen(!open);
  return (
    <Box
      display="flex"
      alignItems="center"
      position="relative"
      onClick={handleClick}
      cursor="pointer"
    >
      {children}
      {open && (
        <Box
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
          left="35px"
          alignItems="center"
          w={[55, 150, 200]}
        >
          <Text
            fontSize="xs"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            lat: {coordinate.lat}
          </Text>
          <Text
            fontSize="xs"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            lng: {coordinate.lng}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ClickedPin;

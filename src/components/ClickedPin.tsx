"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  children: React.ReactNode;
  coordinate: Coordinates;
}

const ClickedPin: React.FC<Props> = ({ coordinate, children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => setOpen(!open);
  return (
    <>
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
            left="30px"
            display="flex"
            alignItems="center"
            maxWidth="200px"
          >
            <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
              {coordinate.lat}
            </Text>
            ,{" "}
            <Text overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
              {coordinate.lng}
            </Text>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ClickedPin;

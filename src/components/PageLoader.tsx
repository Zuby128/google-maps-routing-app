import { Box, CircularProgress } from "@chakra-ui/react";
import React from "react";

function PageLoader() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="100vh"
      position="absolute"
      top={0}
      left={0}
      zIndex={99}
    >
      <CircularProgress isIndeterminate color="green.300" />
    </Box>
  );
}

export default PageLoader;

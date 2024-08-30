"use client";

import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();
  const pushToAddLocation = () => {
    route.push("/add-location");
  };
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Lets make it <br />
            <Text as={"span"} color={"green.400"}>
              Draw shortest route together
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
            iusto tenetur rerum quidem, molestias consequuntur harum sequi natus
            voluptates obcaecati aperiam molestiae debitis neque eveniet in nisi
            autem laboriosam. Nostrum.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"green"}
              bg={"green.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "green.500",
              }}
              onClick={pushToAddLocation}
            >
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

"use client";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Container,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NAV_MENU } from "../utils/NavMenu";
import { ReactNode } from "react";
import { Image } from "@chakra-ui/react";
import Link from "next/link";

interface Props {
  url: string;
  children: ReactNode;
}

const NavLink = (props: Props) => {
  const { url, children } = props;

  return <Link href={url}>{children}</Link>;
};

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} width={"100%"}>
        <Container maxW={"1200px"} width={"100%"}>
          <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
              <IconButton
                size={"md"}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={"Open Menu"}
                display={{ md: "none" }}
                onClick={isOpen ? onClose : onOpen}
              />
              <HStack spacing={8} alignItems={"center"} width={"100%"}>
                <Box marginLeft={"auto"} marginRight={"auto"}>
                  <Link href={"/"}>
                    <Image
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMTBaXYGjYC1VqDBlVcMIcmyl6yeuI4d9dmpITj2fORSWDzELeTMLG-bAYrA0ZZK04rw&usqp=CAU"
                      alt="app-logo"
                      width={120}
                      height={30}
                    />
                  </Link>
                </Box>
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                  justifyContent={"space-around"}
                  width={"100%"}
                >
                  {NAV_MENU.map((element) => (
                    <NavLink key={element.url} url={element.url}>
                      {element.name}
                    </NavLink>
                  ))}
                </HStack>
              </HStack>
            </Flex>

            {isOpen ? (
              <Box pb={4} display={{ md: "none" }}>
                <Stack as={"nav"} spacing={4}>
                  {NAV_MENU.map((element) => (
                    <NavLink key={element.url} url={element.url}>
                      {element.name}
                    </NavLink>
                  ))}
                </Stack>
              </Box>
            ) : null}
          </Box>
        </Container>
      </Box>
    </>
  );
}

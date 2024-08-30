import type { Metadata } from "next";
import { Providers } from "./providers";
import Header from "../components/Header";
import { Container } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "YUKAtech",
  description: "Technical Assessment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <Container maxW={"1200px"} width={"100%"}>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}

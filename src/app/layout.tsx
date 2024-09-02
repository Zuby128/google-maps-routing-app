import type { Metadata } from "next";
import { Providers } from "./providers";
import Header from "../components/Header";
import { Container } from "@chakra-ui/react";
import { Toaster } from "sonner";

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
            <Toaster
              richColors
              position="top-center"
              closeButton={true}
              invert={true}
            />
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}

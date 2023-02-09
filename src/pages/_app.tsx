import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
      <Analytics />
    </ChakraProvider>
  );
}

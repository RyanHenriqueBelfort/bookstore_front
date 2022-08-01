import { ChakraProvider } from "@chakra-ui/react";
import { BookProvider } from "../contexts/BookContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <BookProvider>
        <Component {...pageProps} />
      </BookProvider>
    </ChakraProvider>
  );
}

export default MyApp;

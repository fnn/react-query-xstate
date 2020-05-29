import { makeServer } from '../mirage';
import { ThemeProvider, CSSReset, Flex } from "@chakra-ui/core";

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" })
}

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <CSSReset />
      <Flex margin="16px" direction="column" justifyContent="space-between">
        <Component {...pageProps} />
      </Flex >
    </ThemeProvider>
  )
}

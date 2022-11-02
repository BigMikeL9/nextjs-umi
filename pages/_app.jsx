import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../src/styles/GlobalStyles";
import { lightTheme } from "../src/styles/Theme";

const MyApp = ({ Component, pageProps }) => {
  // console.log(Component);
  // console.log(pageProps);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />

      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;

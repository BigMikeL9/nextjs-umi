import { ThemeProvider } from "styled-components";
import Footer from "../src/layout/Footer/Footer";
import Header from "../src/layout/Header/Header";
import { GlobalStyles } from "../src/styles/GlobalStyles";
import { lightTheme } from "../src/styles/Theme";

const MyApp = ({ Component, pageProps }) => {
  // console.log(Component);
  // console.log(pageProps);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />

      <Header />

      <Component {...pageProps} />

      <Footer />
    </ThemeProvider>
  );
};

export default MyApp;

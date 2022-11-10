import { ThemeProvider } from "styled-components";
import Footer from "../src/layout/Footer/Footer.jsx";
import Header from "../src/layout/Header/Header.jsx";
import Main from "../src/layout/Main/Main.jsx";
import { GlobalStyles } from "../src/styles/GlobalStyles";
import { lightTheme } from "../src/styles/Theme";

const MyApp = ({ Component, pageProps }) => {
  // console.log(Component);
  // console.log(pageProps);

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />

      <Header />

      <Main>
        <Component {...pageProps} />
      </Main>

      <Footer />
    </ThemeProvider>
  );
};

export default MyApp;

import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Footer from "../src/layout/Footer/Footer.jsx";
import Header from "../src/layout/Header/Header.jsx";
import Main from "../src/layout/Main/Main.jsx";
import { GlobalStyles } from "../src/styles/GlobalStyles";
import { lightTheme } from "../src/styles/Theme";

const MyApp = ({ Component, pageProps }) => {
  // console.log(Component);
  // console.log(pageProps);

  // Create a React query client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />

        <Header />

        <Main>
          <Component {...pageProps} />
        </Main>

        <Footer />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default MyApp;

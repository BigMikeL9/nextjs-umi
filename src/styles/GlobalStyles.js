import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

import devices from "./Devices";

export const GlobalStyles = createGlobalStyle`
    ${normalize}  

    ::selection {
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.primary};
    }
   
    *,
    *::after,
    *::before {
      padding: 0;
      margin: 0;
      box-sizing: inherit;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }

    html {
      font-size: 62.5%;
      text-size-adjust: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
      position: relative;
      ${"" /* scroll-behavior: smooth; */}
      
      background-image: ${({ theme }) => theme.backgrounds.html};   

      ${"" /* ${console.log(props)}  */}
      
      // 'max-width: 1200px'
      @media ${devices.laptop} {
         font-size: 56%; 
      }
      
      
      // 'max-width: 900px'
      @media ${devices.tablet} {
        ${"" /* font-size: 50%; */}
      }
    

      // 'max-width: 600px'
      @media ${devices.mobile_L} {
        font-size: 44%; 
      }


      // 'max-width: 375px'
      @media ${devices.mobile_S} {
       font-size: 40%;  
      }
      

      // 'min-width: 1800px'
      @media ${devices.desktop} {
        
      }
    }

    body {
      font-family: sans-serif;
      font-size: max(13px, 1.6rem);
      text-size-adjust: 100%;
      overflow-x: hidden;
      font-weight: 400;
      line-height: 1.5; 
     

      color: ${({ theme }) => theme.colors.primary};
       background: ${({ theme }) => theme.backgrounds.body};
    }

    #__next {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
      display: block;
    }

    main {
      flex: 1;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.2;
      margin: 0;
    }

    a {
      &:link,
      &:visited,
      &:active,
      &:focus {
        color: inherit;
        text-decoration: none;
        outline: none;
      }
    }

    p {
      line-height: 2;
      word-wrap: break-word;
      white-space: normal;
    }

    ul,
    ol {
      list-style: none;
    }

    li {
      list-style-type: none;
    }

    img,
    picture {
      max-width: 100%;
      display: block;
      image-rendering: -webkit-optimize-contrast;
    }

    blockquote,
    q {
      quotes: none;
    }

    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
      content: "";
      content: none;
    }

    table {
      border-collapse: collapse;
      border-spacing: 0;
    }

    ${
      "" /* @media (prefers-color-scheme: dark) {
      html {
        color-scheme: dark;
      }

      body {
        color: white;
        background: rgb(0, 0, 0);
      }
    } */
    }
`;

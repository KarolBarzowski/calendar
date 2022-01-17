import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    html {
        font-size: 62.5%;
        scroll-behavior: smooth;
    }
    
    body {
        font-size: 1.6rem;
    }
`;

export default GlobalStyle;

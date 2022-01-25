import React from "react";
import styled from "styled-components";
import Nav from "components/Nav";

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.gray6};
  padding: 48px;
`;

function MainTemplate({ children, lang, setLang, theme, setTheme }) {
  return (
    <Container>
      <Nav lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      {children}
    </Container>
  );
}

export default MainTemplate;

import React from "react";
import styled from "styled-components";
import Nav from "components/Nav";

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.gray6};
  padding: 48px;
`;

function MainTemplate({ children }) {
  return (
    <Container>
      <Nav />
      {children}
    </Container>
  );
}

export default MainTemplate;

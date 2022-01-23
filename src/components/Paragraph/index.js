import styled from "styled-components";

const Paragraph = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  color: ${({ theme }) => theme.text};
`;

export default Paragraph;

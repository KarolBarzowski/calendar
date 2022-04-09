import styled from "styled-components";

const Paragraph = styled.p`
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  color: ${({ theme, secondary }) =>secondary ? theme.textSecondary : theme.text};
`;

export default Paragraph;

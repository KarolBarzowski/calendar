import styled from "styled-components";

const Tooltip = styled.span`
  position: absolute;
  top: calc(100% + 8px);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 36px;
  padding: 0 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.gray5};
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  transform: scale(0);
  opacity: 0;
  transform-origin: center center;
  transition: transform 0.15s ease-in-out, opacity 0.15s ease-in-out;
  z-index: 9999;
`;

export default Tooltip;

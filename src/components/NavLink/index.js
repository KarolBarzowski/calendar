import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import Tooltip from "components/Tooltip";

const StyledWrapper = styled(Link)`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  background-color: ${({ theme }) => theme.gray5};
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  transition: background-color 0.15s ease-in-out;

  svg {
    fill: ${({ theme }) => theme.text};
  }

  &.active {
    background-color: ${({ theme }) => theme.blue};
  }

  :hover:not(.active) {
    background-color: ${({ theme }) => theme.gray4};
  }

  :hover {
    ${Tooltip} {
      transform: scale(1) translateX(0);
      opacity: 1;
    }
  }
`;

function NavLink({ children, to, text }) {
  return (
    <StyledWrapper to={to}>
      {children}
      <Tooltip>{text}</Tooltip>
    </StyledWrapper>
  );
}

export default NavLink;

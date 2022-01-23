import React from "react";
import styled from "styled-components";
import LanguageContext from "context/LanguageContext";
import { ReactComponent as LeftIcon } from "assets/left.svg";
import { ReactComponent as RightIcon } from "assets/right.svg";
import Paragraph from "components/Paragraph";

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 10px;
`;

const StyledButton = styled.button`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  background-color: ${({ theme }) => theme.gray6};
  border: none;
  border-radius: 8px;
  transition: background-color 0.15s ease-in-out;
  cursor: pointer;

  svg {
    fill: ${({ theme }) => theme.text};
  }

  :hover {
    background-color: ${({ theme }) => theme.gray5};
  }
`;

function MonthSwitch({ month, setMonth, handleNext, handlePrev }) {
  return (
    <LanguageContext>
      {(language) => (
        <StyledWrapper>
          <StyledButton onClick={handlePrev}>
            <LeftIcon />
          </StyledButton>
          <Paragraph>{language.months[month]}</Paragraph>
          <StyledButton onClick={handleNext}>
            <RightIcon />
          </StyledButton>
        </StyledWrapper>
      )}
    </LanguageContext>
  );
}

export default MonthSwitch;

import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import LanguageContext from "context/LanguageContext";
import { ReactComponent as LeftIcon } from "assets/left.svg";
import { ReactComponent as RightIcon } from "assets/right.svg";
import Paragraph from "components/Paragraph";
import { useOnClickOutside } from "hooks/useOnClickOutside";

const StyledWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 5px;
`;

const StyledButton = styled.button`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
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

const StyledDropdownButton = styled(StyledButton)`
  width: 120px;

  ${StyledButton} {
    background-color: ${({ theme }) => theme.gray5};

    :hover {
      background-color: ${({ theme }) => theme.gray4};
    }
  }
`;

const StyledDropdown = styled.div`
  position: absolute;
  top: ${({ top }) => top * -36 - 4 * top}px;
  display: flex;
  flex-flow: column nowrap;
  gap: 4px;

  ${({ isVisible }) =>
    isVisible
      ? css`
          visibility: visible;
          opacity: 1;
          transition: opacity 0.15s ease-in-out;
        `
      : css`
          visibility: hidden;
          opacity: 0;
          transition: visibility 0s 0.15s, opacity 0.15s ease-in-out;
        `}
`;

function MonthSwitch({ month, setMonth, handleNext, handlePrev }) {
  const dropdownRef = useRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <LanguageContext.Consumer>
      {(language) => (
        <StyledWrapper>
          <StyledButton type="button" onClick={handlePrev}>
            <LeftIcon />
          </StyledButton>
          <StyledDropdownButton type="button" ref={dropdownRef} onClick={() => setIsDropdownOpen((prevState) => !prevState)}>
            <Paragraph>{language.months[month]}</Paragraph>
            <StyledDropdown isVisible={isDropdownOpen} top={month}>
              {language.months.map((m, i) => (
                <StyledDropdownButton type="button" onClick={() => setMonth(i)}>
                  <Paragraph>{m}</Paragraph>
                </StyledDropdownButton>
              ))}
            </StyledDropdown>
          </StyledDropdownButton>
          <StyledButton type="button" onClick={handleNext}>
            <RightIcon />
          </StyledButton>
        </StyledWrapper>
      )}
    </LanguageContext.Consumer>
  );
}

export default MonthSwitch;

import React, { useRef } from "react";
import styled, { css } from "styled-components";
import Paragraph from "components/Paragraph";
import LanguageContext from "context/LanguageContext";
import { useOnClickOutside } from "hooks/useOnClickOutside";

const StyledWrapper = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  display: flex;
  flex-flow: column nowrap;
  gap: 12px;
  background-color: ${({ theme }) => theme.gray5};
  border-radius: 8px;
  padding: 8px 12px;
  transform-origin: top right;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);

  ${({ isOpen }) =>
    isOpen
      ? css`
          visibility: visible;
          transform: scale(1);
          transition: visibility 0s, transform 0.15s ease-in-out;
        `
      : css`
          visibility: hidden;
          transform: scale(0);
          transition: visibility 0s 0.15s, transform 0.15s ease-in-out;
        `}
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`;

const StyledButton = styled.button`
  height: 48px;
  width: 96px;
  background-color: ${({ theme, active }) => (active ? theme.gray3 : theme.gray4)};
  border: none;
  cursor: pointer;
  outline: none;
`;

const StyledParagraph = styled(Paragraph)`
  text-align: center;
  margin-bottom: 4px;
`;

function Settings({ lang, setLang, isSettingsOpen, setIsSettingsOpen, theme, setTheme }) {
  const ref = useRef();

  useOnClickOutside(ref, () => setIsSettingsOpen(false));

  return (
    <LanguageContext.Consumer>
      {(language) => (
        <StyledWrapper isOpen={isSettingsOpen} ref={ref}>
          <div>
            <StyledParagraph>{language.language}</StyledParagraph>
            <Row>
              <StyledButton type="button" active={lang === "en"} onClick={() => setLang("en")}>
                <Paragraph>EN</Paragraph>
              </StyledButton>
              <StyledButton type="button" active={lang === "pl"} onClick={() => setLang("pl")}>
                <Paragraph>PL</Paragraph>
              </StyledButton>
            </Row>
          </div>
          <div>
            <StyledParagraph>{language.theme}</StyledParagraph>
            <Row>
              <StyledButton type="button" active={theme === "light"} onClick={() => setTheme("light")}>
                <Paragraph>{language.light}</Paragraph>
              </StyledButton>
              <StyledButton type="button" active={theme === "dark"} onClick={() => setTheme("dark")}>
                <Paragraph>{language.dark}</Paragraph>
              </StyledButton>
            </Row>
          </div>
        </StyledWrapper>
      )}
    </LanguageContext.Consumer>
  );
}

export default Settings;

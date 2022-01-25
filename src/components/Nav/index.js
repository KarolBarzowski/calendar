import React, { useState } from "react";
import styled from "styled-components";
import NavLink from "components/NavLink";
import { ReactComponent as CalendarIcon } from "assets/calendar.svg";
import { ReactComponent as HomeIcon } from "assets/home.svg";
import { ReactComponent as SettingsIcon } from "assets/settings.svg";
import Settings from "components/Settings";
import Tooltip from "components/Tooltip";
import LanguageContext from "context/LanguageContext";

const Wrapper = styled.nav`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 48px;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0 24px;
`;

const StyledButton = styled.button`
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
  cursor: pointer;
  border: none;

  svg {
    fill: ${({ theme }) => theme.text};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.blue};

    svg {
      fill: ${({ theme }) => theme.white};
    }
  }

  :hover:not(:disabled) {
    background-color: ${({ theme }) => theme.gray4};
  }

  :hover {
    ${Tooltip} {
      transform: scale(1) translateX(0);
      opacity: 1;
    }
  }
`;

function Nav({ lang, setLang, theme, setTheme }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <LanguageContext.Consumer>
      {(language) => (
        <Wrapper>
          <Row>
            <NavLink to="/" text={language.home}>
              <HomeIcon />
            </NavLink>
            <NavLink to="/calendar" text={language.calendar}>
              <CalendarIcon />
            </NavLink>
          </Row>
          <StyledButton type="button" onClick={() => setIsSettingsOpen(true)} disabled={isSettingsOpen}>
            <SettingsIcon />
            {!isSettingsOpen ? <Tooltip>{language.settings}</Tooltip> : null}
          </StyledButton>
          <Settings
            lang={lang}
            setLang={setLang}
            isSettingsOpen={isSettingsOpen}
            setIsSettingsOpen={setIsSettingsOpen}
            theme={theme}
            setTheme={setTheme}
          />
        </Wrapper>
      )}
    </LanguageContext.Consumer>
  );
}

export default Nav;

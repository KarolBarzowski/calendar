import React from "react";
import styled from "styled-components";
import NavLink from "components/NavLink";
import { ReactComponent as CalendarIcon } from "assets/calendar.svg";
import { ReactComponent as HomeIcon } from "assets/home.svg";
import { ReactComponent as SettingsIcon } from "assets/settings.svg";

const Wrapper = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 0 24px;
`;

function Nav() {
  return (
    <Wrapper>
      <Row>
        <NavLink to="/" text="Home">
          <HomeIcon />
        </NavLink>
        <NavLink to="/calendar" text="Calendar">
          <CalendarIcon />
        </NavLink>
      </Row>
      <NavLink to="/settings" text="Settings">
        <SettingsIcon />
      </NavLink>
    </Wrapper>
  );
}

export default Nav;

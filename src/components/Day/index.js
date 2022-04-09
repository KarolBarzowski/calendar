import React from "react";
import styled from "styled-components";
import Tooltip from "components/Tooltip";

const COLORS = {
  1: "#7986cb",
  2: "#33b679",
  3: "#8e24aa",
  4: "#e67c73",
  5: "#f6c026",
  6: "#f5511d",
  7: "#039be5",
  8: "#616161",
  9: "#3f51b5",
  10: "#0b8043",
  11: "#d60000",
};

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 48px;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;

  :hover {
    background-color: ${({ theme }) => theme.gray5};

    ${Tooltip} {
      transform: scale(1) translateX(0);
      opacity: 1;
    }
  }
`;

const StyledNumber = styled.span`
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  color: ${({ theme, secondary }) => (secondary ? theme.textSecondary : theme.text)};
`;

const StyledEventsWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 2px;
`;

const StyledEventMark = styled.span`
  background-color: ${({ theme, color }) => (color ? COLORS[color] : theme.blue)};
  height: 2px;
  width: 24px;
  border-radius: 16px;
`;

const StyledTooltipSpan = styled.span`
  width: 100%;
  white-space: pre;
`;

function Day({ day, month, year, events, secondary, isToday }) {
  return (
    <StyledWrapper>
      <StyledNumber secondary={secondary}>{day}</StyledNumber>
      <StyledEventsWrapper>
        {events?.map((ev) => (
          <StyledEventMark color={ev.colorId} />
        ))}
      </StyledEventsWrapper>
      {events.length ? (
        <Tooltip>
          {events.map((ev) => (
            <StyledTooltipSpan>{ev.title}</StyledTooltipSpan>
          ))}
        </Tooltip>
      ) : null}
    </StyledWrapper>
  );
}

export default Day;

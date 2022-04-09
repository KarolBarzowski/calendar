import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MonthSwitch from "components/MonthSwitch";
import Paragraph from "components/Paragraph";
import Day from "components/Day";
import LanguageContext from "context/LanguageContext";

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  gap: 24px;
`;

const StyledRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
`;

const StyledCalendarWrapper = styled.div``;

const StyledDayName = styled(Paragraph)`
  text-transform: capitalize;
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  display: flex;
  align-items: end;
  justify-content: center;
  font-size: 13px;
`;

const StyledCalendarDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 16px 48px;
`;

const StyledAgendaWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  width: 250px;
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.gray5};
`;

const StyledAgendaList = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  width: 100%;
  list-style-type: none;
`;

const StyledAgendaItem = styled.li`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  width: 100%;
  padding: 8px 12px;

  :first-child {
    border-top: 1px solid ${({ theme }) => theme.gray5};
  }

  :not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.gray5};
  }
`;

const StyledTitle = styled(Paragraph)`
  font-size: 16px;
  max-height: 48px;
  overflow: hidden;
`;

const StyledNumber = styled(Paragraph)`
  font-size: 24px;
`;

const StyledHeading = styled(Paragraph)`
  padding: 8px;
`;

function Calendar({ events }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [days, setDays] = useState([]);
  const [formattedDays, setFormattedDays] = useState([]);
  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    const firstDay = new Date(currentYear, currentMonth, 0).getDay();
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();

    const lastMonthDate = new Date(currentYear, currentMonth);
    lastMonthDate.setDate(0);

    const arr = [];

    for (let i = firstDay; i > 0; i--) {
      arr.push(new Date(lastMonthDate.getFullYear(), lastMonthDate.getMonth(), lastMonthDate.getDate() - i + 1));
      console.log(new Date(lastMonthDate.getFullYear(), lastMonthDate.getMonth(), lastMonthDate.getDate() - i + 1));
    }

    for (let i = 1; i <= lastDay; i++) {
      arr.push(new Date(currentYear, currentMonth, i));
    }

    let d = 1;
    for (let i = arr.length; i < 42; i++) {
      arr.push(new Date(currentYear, currentMonth + 1, d));
      d += 1;
    }

    const formattedArr = [];
    arr.forEach((day) => {
      formattedArr.push({
        day: day.getDate(),
        month: day.getMonth(),
        year: day.getFullYear(),
        date: `${day.getFullYear()}-${day.getMonth() + 1 < 10 ? `0${day.getMonth() + 1}` : day.getMonth() + 1}-${
          day.getDate() < 10 ? `0${day.getDate()}` : day.getDate()
        }`,
      });
    });

    setDays(formattedArr);
  }, [currentMonth, currentYear]);

  useEffect(() => {
    if (days.length && events.length) {
      const today = new Date().setHours(0, 0, 0, 0);
      const newDays = [];

      days.forEach((day) => {
        const eventsArr = [];

        const d = new Date(day.date).setHours(0, 0, 0, 0);

        events.forEach((ev) => {
          let { start } = ev;

          if (start.includes("T")) {
            start = start.split("T")[0];
          }

          if (day.date === start) {
            eventsArr.push(ev);
          }
        });

        newDays.push({ ...day, events: eventsArr, isToday: d === today });
      });

      setFormattedDays(newDays);
    }
  }, [days, events]);

  useEffect(() => {
    if (formattedDays.length) {
      const arr = [];

      formattedDays.forEach((day) => {
        if (day.events.length && day.month === currentMonth && day.year === currentYear) {
          arr.push(...day.events);
        }
      });

      setAgenda(arr);
    }
  }, [formattedDays, currentMonth, currentYear]);

  const handlePrevMonth = () => {
    if (currentMonth - 1 < 0) {
      setCurrentMonth(11);
      setCurrentYear((prevState) => prevState - 1);
    } else setCurrentMonth((prevState) => prevState - 1);
  };

  const handleNextMonth = () => {
    if (currentMonth + 1 > 11) {
      setCurrentMonth(0);
      setCurrentYear((prevState) => prevState + 1);
    } else setCurrentMonth((prevState) => prevState + 1);
  };

  return (
    <LanguageContext.Consumer>
      {(language) => (
        <StyledContainer>
          <StyledCalendarWrapper>
            <StyledRow>
              <Paragraph>{currentYear}</Paragraph>
              <MonthSwitch month={currentMonth} setMonth={setCurrentMonth} handlePrev={handlePrevMonth} handleNext={handleNextMonth} />
            </StyledRow>
            <StyledCalendarDays>
              {language.daysShort.map((day) => (
                <StyledDayName key={day}>{day}</StyledDayName>
              ))}
              {formattedDays.length ? (
                formattedDays.map(({ day, month, year, events, isToday }, i) => (
                  <Day key={i.toString()} day={day} month={month} year={year} events={events} secondary={month !== currentMonth} isToday={isToday} />
                ))
              ) : (
                <div>loading</div>
              )}
            </StyledCalendarDays>
          </StyledCalendarWrapper>
          <StyledAgendaWrapper>
            <StyledHeading secondary>{language.agenda}</StyledHeading>
            <StyledAgendaList>
              {agenda.length ? (
                agenda.map((event) => (
                  <StyledAgendaItem>
                    <StyledTitle>{event.title}</StyledTitle>
                    <StyledNumber>{parseInt(event.start.split("T")[0].split("-")[2])}</StyledNumber>
                  </StyledAgendaItem>
                ))
              ) : (
                <div>brak eventów</div>
              )}
            </StyledAgendaList>
          </StyledAgendaWrapper>
        </StyledContainer>
      )}
    </LanguageContext.Consumer>
  );
}

export default Calendar;

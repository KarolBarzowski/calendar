import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MonthSwitch from "components/MonthSwitch";
import Paragraph from "components/Paragraph";

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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
    <div>
      <Paragraph>{currentYear}</Paragraph>
      <MonthSwitch month={currentMonth} setMonth={setCurrentMonth} handlePrev={handlePrevMonth} handleNext={handleNextMonth} />
    </div>
  );
}

export default Calendar;

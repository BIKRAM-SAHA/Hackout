import React, { useContext, useState } from "react";
import moment from "moment";
import lodash from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Calender.scss";
import CalenderContext from "../../../common/contexts/CalenderContext";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calender() {
  const { today, selectedDate, changeSelectedDate } =
    useContext(CalenderContext);
  const [calenderViewDate, setCalenderViewDate] = useState(
    moment(selectedDate, "DD-MM-YYYY")
  );
  //   console.log(selectedDate);

  const onAnotherDateSelected = (day) => {
    console.log(
      "selected date changed to:",
      moment()
        .date(day)
        .month(calenderViewDate.month())
        .year(calenderViewDate.year())
        .format("DD-MM-YYYY")
    );
    changeSelectedDate(
      moment()
        .date(day)
        .month(calenderViewDate.month())
        .year(calenderViewDate.year())
        .format("DD-MM-YYYY")
    );
  };
  const onMonthChange = (type) => {
    if (type < 0) {
      setCalenderViewDate(moment(calenderViewDate).subtract(1, "month"));
      return;
    }
    setCalenderViewDate(moment(calenderViewDate).add(1, "month"));
  };
  return (
    <div className="calender__container">
      <div className="calendar">
        <div className="headerContainer">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="icon"
            onClick={() => onMonthChange(-1)}
          />
          <div className="header">
            <h1 className="header_title">{calenderViewDate.format("MMMM")}</h1>
            <p className="header_subtitle">{calenderViewDate.format("YYYY")}</p>
          </div>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="icon"
            onClick={() => onMonthChange(1)}
          />
        </div>
        <div className="days-of-week">
          {weekDays.map((weekDay, index) => (
            <p className="day-name" key={index}>
              {weekDay}
            </p>
          ))}
        </div>
        <div className="days">
          {lodash.range(0, calenderViewDate.day()).map((_, index) => (
            <p className="day-number day-number_disabled" key={index}></p>
          ))}
          {lodash.range(1, calenderViewDate.daysInMonth() + 1).map((day) => {
            if (
              calenderViewDate.year() ===
                moment(selectedDate, "DD-MM-YYYY").year() &&
              calenderViewDate.month() ===
                moment(selectedDate, "DD-MM-YYYY").month() &&
              moment(selectedDate, "DD-MM-YYYY").date() === day
            ) {
              return (
                <p className="day-number selected" key={day}>
                  {day}
                </p>
              );
            }
            if (
              calenderViewDate.year() === moment(today, "DD-MM-YYYY").year() &&
              calenderViewDate.month() ===
                moment(today, "DD-MM-YYYY").month() &&
              moment(today, "DD-MM-YYYY").date() === day
            ) {
              return (
                <p
                  className="day-number today"
                  onClick={() => onAnotherDateSelected(day)}
                  key={day}
                >
                  {day}
                </p>
              );
            }
            return (
              <p
                className="day-number"
                onClick={() => onAnotherDateSelected(day)}
                key={day}
              >
                {day}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calender;

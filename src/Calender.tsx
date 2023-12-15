import React, { CSSProperties } from "react";
import "./styles/grid.css";
import GridRow from "./GridRow";
import { Week, CalenderProps } from "./Types";

const Calender = ({ month, shifts, setShifts }: CalenderProps) => {
  return (
    <>
      <Grid kwNumbers={month.map(({ kwNumber }) => kwNumber)}>
        <GridHeader></GridHeader>
        {month?.map(({ weekDates, kwNumber }: Week) => {
          return <GridRow weekDates={weekDates.slice()} kwNumber={kwNumber} shifts={shifts}></GridRow>;
        })}
      </Grid>
    </>
  );
};
const Grid = function (props: any) {
  let kwNumbers = ``;
  props.kwNumbers?.map((kwNumber: any) => (kwNumbers += `[kw${kwNumber}] 1fr `));
  const styles: CSSProperties = {
    display: `grid`,
    height: `600px`,
    gridTemplateColumns: `[KW] auto [Montag] 1fr [Dienstag] 1fr [Mittwoch] 1fr [Donnerstag] 1fr [Freitag] 1fr [Samstag] 1fr [Sonntag] 1fr`,
    gridTemplateRows: ` [head] 40px ${kwNumbers}`,
  };
  console.log(`KwNubmers: ${styles.gridTemplateRows}`);
  return <div style={styles}>{props.children}</div>;
};
const GridHeader = function () {
  const weekdays = ["Mon", "Di", "Mit", "Do", "Fr", "Sa", "So"];
  return (
    <>
      {<div className="item">KW</div>}
      {weekdays.map((day) => {
        return <div className="item">{day}</div>;
      })}
    </>
  );
};
export default Calender;

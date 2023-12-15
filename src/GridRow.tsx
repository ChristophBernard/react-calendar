import DateItem from "./DateItem";
import React from "react";
import { ShiftClass, Week, GridRowProps } from "./Types";
import ShiftComponent from "./Shift";
import { getLowestInteger, hexColorArray } from "./utils/Utils";
import { setTime, tomorrowOf, weekdays } from "./utils/Date";
import { isBreakStatement } from "typescript";
const GridRow = function ({ weekDates, kwNumber, shifts }: GridRowProps) {
  function getShiftsInTimefame(shifts: ShiftClass[], beginningTime: Date, endTime: Date) {
    /* Filter relavant shifts: Shifts that take place inside the given timeframe */

    let filteredShifts = shifts.filter(({ from, to }) => {
      /* let includesTimeframe = false;
      if (beginningTime <= to && to < tomorrowOf(endTime)) {
        includesTimeframe = true;
      } else if (beginningTime <= from && from < tomorrowOf(endTime)) {
        includesTimeframe = true;
      } else if (from < beginningTime && tomorrowOf(endTime) <= to) {
        includesTimeframe = true;
      } else {
      } */
      return (
        (from < beginningTime && tomorrowOf(endTime) <= to) ||
        (beginningTime <= from && from < tomorrowOf(endTime)) ||
        (beginningTime <= to && to < tomorrowOf(endTime))
      );
    });

    return filteredShifts;
  }

  function getShiftSlots() {
    let monday = weekDates[0];
    let sunday = weekDates[6];

    let shiftSlots = [];
    let relevantShifts = getShiftsInTimefame(shifts, monday, sunday);
    if (relevantShifts.length === 0) return;
    relevantShifts.sort((shift1, shift2) => shift1.from.getTime() - shift2.from.getTime());

    for (let shift of relevantShifts) {
      let shiftSlotBeginning = shift.from < monday ? 1 : shift.from.getDay(); // ShiftSlot is the day of the week the shift is schedeuled (0: Sunday, 1: Monday, ...)
      let shiftSlotEnd = shift.to > sunday ? 0 : shift.to.getDay();

      let shiftSlot = { shift: shift, begin: shiftSlotBeginning, end: shiftSlotEnd };
      shiftSlots.push(shiftSlot);
    }
    return shiftSlots;
  }
  const shiftSlots = getShiftSlots();
  let shiftSlotComponents;

  const dateItemComponents = weekDates.map((date) => {
    let day = {
      date: new Date(),
      availablity: {
        from: new Date(),
        to: (() => {
          let to = new Date();
          to.setHours(168);
          return to;
        })(),
      },
    };
    const { from, to } = day.availablity;

    const isSelected = date !== undefined && from <= date && to >= tomorrowOf(date);
    return (
      <DateItem isSelected={isSelected} date={date} kw={kwNumber} key={date.getTime()}>
        {date.getDate()}
      </DateItem>
    );
  });

  return (
    <>
      <div className="item kw">{kwNumber}</div>
      {/*  <div className="gridRow"> */}
      {dateItemComponents}
      <div className="gridRow" style={{ marginTop: `20px`, gridRow: `kw${kwNumber} `, gridColumn: `Montag / span 7` }}>
        {shiftSlots !== undefined
          ? shiftSlots.map((slot) => {
              const gridColStart = weekdays[slot.begin];
              const gridColEnd = slot.end === 0 ? -1 : weekdays[slot.end]; // -1 means the element spans all the way till the last col
              return (
                <div
                  className={`shift`}
                  style={{
                    gridColumn: `${gridColStart} / ${gridColEnd}`,
                    height: `1.5rem`,
                    backgroundColor: `${hexColorArray[slot.shift.id % (hexColorArray.length - 1)]}`,
                  }}
                >
                  {slot.shift.title}
                </div>
              );
            })
          : ""}
      </div>

      {/* { shiftComponents } */}
      {/*  </div> */}
    </>
  );
};
export default GridRow;

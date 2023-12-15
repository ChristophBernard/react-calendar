import React, { CSSProperties } from "react";
import { ShiftClass } from "./Types";
import { toWeekDayString } from "./utils/Date";
import { isAbsolute } from "path";
const ShiftComponent = ({ shift, kw, index, day }: { shift: ShiftClass; kw: number; index: number; day: Date }) => {
  const columnStart = toWeekDayString(shift.from.getDay());
  const columnEnd = toWeekDayString(shift.to.getDay());
  const span = shift.to.getDate() - shift.from.getDate();
  const gridSpan: CSSProperties = {
    gridColumn: `${toWeekDayString(day.getDay())} / span ${span + 1}`,
    gridRow: `kw${kw}`,
  };
  console.log(`Shift span: ${span}`);
  let assignments = shift?.assignments.map((worker: any) => {
    return (
      <p className="workers" key={worker.concat(shift.from.toDateString())}>
        {worker}
      </p>
    );
  });
  return (
    <div className={`shift`} style={gridSpan} onClick={() => console.log(shift.id)}>
      {shift.title} <br></br>
      {assignments}
    </div>
  );
};
export default ShiftComponent;

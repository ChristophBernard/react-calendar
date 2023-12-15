import React, { CSSProperties, useRef, useState } from "react";
import { weekdays, formatDate } from "./utils/Date";

const DateItem = function (props: any) {
  const weekday = weekdays[props.date.getDay()];
  const classNames = formatDate(props.date) === formatDate(new Date()) ? `item highlightToday` : `item`;
  const selectedStyle: CSSProperties = {
    gridColumn: `${weekday}`,
    gridRow: `kw${props.kw} / kw${props.kw}`,
    display: "flex",
    zIndex: `2`,
    flexDirection: `column`,
  };

  function handleClick(e: EventTarget) {
    console.log(props.date.getTime());
  }

  return (
    <>
      <div className={classNames} onClick={(e) => handleClick(e.target)} style={selectedStyle}>
        {props.children}
      </div>
    </>
  );
};
export default DateItem;

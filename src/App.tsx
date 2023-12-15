import React, { useState, MouseEvent } from "react";
import "./styles/App.css";
import { createYear, monthsNames, randomDate, getCurrentMonth } from "./utils/Date";
import Calender from "./Calender";
import { shiftList, getFromLocalStorage } from "./data/shifts";

import { ShiftCreationDialog } from "./ShiftCreationDialog";

/*     
    ToDo: Provide better interface to the list of shifts indead of props drilling 
  -  using Context (maybe with a custom hook) */
function App() {
  const [year, setYear] = useState(createYear());
  const [month, setMonth] = useState(getCurrentMonth());
  const [shifts, setShifts] = useState(shiftList);
  const [showShiftDialog, setShowShiftDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().getTime());
  const monthName = monthsNames[month];
  getFromLocalStorage();
  function toggleDialogWindow(e: MouseEvent<HTMLButtonElement>) {
    setShowShiftDialog(!showShiftDialog);
  }
  function decrementMonth(event: MouseEvent<HTMLButtonElement>): void {
    if (month === 0) {
      setYear((year) => createYear(year.year - 1));
      setMonth(11);
    } else {
      setMonth((curr) => curr - 1);
    }
  }
  function incrementMonth(event: MouseEvent<HTMLButtonElement>): void {
    if (month === 11) {
      setYear((year) => createYear(year.year + 1));
      setMonth(0);
    } else {
      setMonth((currMonth) => currMonth + 1);
    }
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div className="monthSelection">
            <p className="pHeader">{year.year}</p>
            <p className="pHeader">{monthName}</p>
            <button id="decrement" onClick={decrementMonth}>
              &larr;
            </button>
            <button id="increment" onClick={incrementMonth}>
              &rarr;
            </button>
          </div>
        </header>
        {showShiftDialog && (
          <ShiftCreationDialog
            setShifts={setShifts}
            closeDialogWindow={toggleDialogWindow}
            date={selectedDate}
          ></ShiftCreationDialog>
        )}
        <Calender month={year.months[month]} shifts={shifts} setShifts={setShifts} key={year.year}></Calender>
        <div className="buttonPannelBottom">
          <button>Speichern</button>
          <button onClick={toggleDialogWindow}>{!showShiftDialog ? "Add Shift" : "Close"}</button>
        </div>
      </div>
    </>
  );
}
export default App;

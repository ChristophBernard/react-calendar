import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import "./styles/ShiftCreation.css";
import { ShiftClass } from "./Types";
import { formatDate, formatTime, getFollowingWeekday, setTime } from "./utils/Date";
import { workersTable } from "./data/workers";

const presets = [
  {
    title: "Bouldern",
    from: setTime(getFollowingWeekday(3), 20),
    to: setTime(getFollowingWeekday(3), 23),
    selectedWorkers: [""],
  },
  {
    title: "Arbeit",
    from: setTime(new Date()),
    to: setTime(getFollowingWeekday(3), 23),
    selectedWorkers: [""],
  },
];
export const ShiftCreationDialog = ({
  setShifts,
  closeDialogWindow,
  date,
}: {
  setShifts: React.Dispatch<React.SetStateAction<ShiftClass[]>>;
  closeDialogWindow: MouseEventHandler<HTMLButtonElement>;
  date: number;
}) => {
  const [presetID, setPresetID] = useState(0);
  let preset = presets[presetID];
  const [title, setTitle] = useState(preset.title);
  const [startDate, setStartDate] = useState(new Date(date));
  const [endDate, setEndDate] = useState(new Date(date));
  const [selectedWorkers, setSelectedWorkers] = useState(preset.selectedWorkers);

  const titleRef = useRef<HTMLInputElement>(null);
  const availableWorkers = workersTable.filter((worker) => {
    let { from, to } = worker.availablity;
    return from <= startDate && to >= endDate;
  });

  const assignedWorkersList = selectedWorkers.map((worker) => {
    return (
      <>
        <li>
          {worker + " "}
          <button
            type="button"
            title="delete"
            onClick={() => setSelectedWorkers((prev) => prev.filter((value) => value !== worker))}
          >
            X
          </button>
        </li>
      </>
    );
  });
  function addWorker(worker: string) {
    if (selectedWorkers.includes(worker)) return;
    setSelectedWorkers((prev) => [...prev, worker]);
  }
  function saveShift() {
    if (startDate > endDate) return;
    let id = Math.floor(Math.random() * 100000);
    let newShift = new ShiftClass(id, title, startDate, endDate, selectedWorkers);
    setShifts((prev) => [...prev, newShift]);
  }
  return (
    <>
      <div className="dialogWindow">
        <button className="closeDialogWindow" onClick={closeDialogWindow}>
          X
        </button>
        <h1>Shift Information</h1>

        <EditComponent
          title={title}
          onTitleChange={setTitle}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        ></EditComponent>
        <hr />
        <label>
          <h1>Workers: </h1>
          <WorkerListComponent workers={availableWorkers} addWorker={addWorker}></WorkerListComponent>
        </label>
        <hr />
        <h1>Assigned Workers</h1>
        <ul>{assignedWorkersList.slice(1)}</ul>
        <button type="button" title="Save" onClick={saveShift}>
          Save
        </button>
      </div>
    </>
  );
};
function EditComponent({
  title,
  onTitleChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: {
  title: string;
  onTitleChange: Function;
  startDate: Date;
  endDate: Date;
  onStartDateChange: Function;
  onEndDateChange: Function;
}) {
  const presets = [{ title: `bouldern` }];
  const [selectedPreset, setSelectedPreset] = useState(0);
  function setPreset(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedPreset(Number(e.target.value));
  }
  return (
    <>
      {"Titel: "}
      <input onChange={(e) => onTitleChange(e.target.value)} title="shiftTitle" defaultValue={title}></input>
      <select title="preset" value="Select Preset..." onChange={(e) => setPreset(e)}>
        <option value="0">Bouldern</option>
        <option value="1">Arbeit</option>
        <option value="2"></option>
      </select>
      <label>
        <DateEditComponent
          label="Start"
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={onStartDateChange}
          onEndDateChange={onEndDateChange}
        ></DateEditComponent>
      </label>
    </>
  );
}
const WorkerListComponent = ({ workers, addWorker }: any) => {
  return (
    <div className="workerList">
      {workers.map((worker: any) => {
        return (
          <div className="workerItem" onClick={(e) => addWorker(worker.name)}>
            {worker.name}
          </div>
        );
      })}
    </div>
  );
};

const DateEditComponent = ({
  onStartDateChange,
  onEndDateChange,
  label,
  endDate,
  startDate,
}: {
  onStartDateChange: Function;
  onEndDateChange: Function;
  label: string;
  endDate: Date;
  startDate: Date;
}) => {
  const startDateInputEle = useRef<HTMLInputElement>(null);
  const endDateInputEle = useRef<HTMLInputElement>(null);
  const startTimeInputEle = useRef<HTMLInputElement>(null);
  const endTimeInputEle = useRef<HTMLInputElement>(null);

  const startDateString = formatDate(startDate);
  const startTimeString = formatTime(startDate);
  const endDateString = formatDate(endDate);
  const endTimeString = formatTime(endDate);

  let newStartDate = startDateInputEle.current !== null ? new Date(startDateInputEle.current.value) : new Date();
  let newEndDate = endDateInputEle.current !== null ? new Date(endDateInputEle.current.value) : new Date();

  function handleStartDateChange() {
    const [startHours, startMinutes] =
      startTimeInputEle.current !== null ? startTimeInputEle.current.value.split(":") : ["0", "0"];
    newStartDate = startDateInputEle.current !== null ? new Date(startDateInputEle.current.value) : new Date();
    newStartDate.setHours(Number(startHours));
    newStartDate.setMinutes(Number(startMinutes));
    onStartDateChange(newStartDate);
  }
  function handleEndDateChange() {
    const [endHours, endMinutes] =
      endTimeInputEle.current !== null ? endTimeInputEle.current.value.split(":") : ["0", "0"];
    newEndDate = endDateInputEle.current !== null ? new Date(endDateInputEle.current.value) : new Date();
    newEndDate.setHours(Number(endHours));
    newEndDate.setMinutes(Number(endMinutes));
    onEndDateChange(newEndDate);
  }
  return (
    <div className="nativeTimePicker">
      <div>
        <label htmlFor={label}>Beginn</label>
        {/* Start Date Input Element */}
        <input
          value={startDateString}
          ref={startDateInputEle}
          type="date"
          id={label}
          name="trip-start"
          min=""
          max={endDateString}
          onChange={handleStartDateChange}
        ></input>
        {/* Start Time Input Element */}
        <input
          value={startTimeString}
          ref={startTimeInputEle}
          id="startTime"
          type="time"
          name="appt-time"
          min=""
          max={startDate.getDate() === endDate.getDate() ? endTimeString : ""}
          onChange={handleStartDateChange}
          required
        />
        <span className="validity"></span>
      </div>
      <div>
        <label htmlFor={label}>Ende</label>
        {/* End Date Input Element */}
        <input
          value={endDateString}
          ref={endDateInputEle}
          type="date"
          id="endDate"
          name="trip-start"
          min={startDateString}
          max=""
          onChange={handleEndDateChange}
        ></input>
        {/* End Time Input Element */}
        <input
          value={endTimeString}
          ref={endTimeInputEle}
          id="endTime"
          type="time"
          name="appt-time"
          min={startDate.getDate() === endDate.getDate() ? startTimeString : ""}
          max=""
          onChange={handleEndDateChange}
          required
        />
        <span className="validity"></span>
      </div>
    </div>
  );
};

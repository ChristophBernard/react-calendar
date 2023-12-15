export class ShiftClass {
  id: number;
  title: string;
  from: Date;
  to: Date;
  assignments: Array<string>;
  description = "";
  constructor(id: number, title: string, from: Date, to: Date, assignments: Array<string>, description = "") {
    this.id = id;
    this.title = title;
    this.from = from;
    this.to = to;
    this.assignments = assignments;
    this.description = description;
  }
}
/* interface Shift {
  id: number;
  title: string;
  from: Date;
  to: Date;
  assignments: Array<string>;
  description?: string;
} */
type Year = Map<String, Array<Week>>;
type Shifts = Map<String, Array<ShiftClass>>;
interface Day {
  date: Date;
  availability?: { from: Date; to: Date };
}
type Month = Array<Week>;
interface Week {
  kwNumber: number;
  weekDates: Date[];
}
export interface GridRowProps {
  kwNumber: number;
  weekDates: Date[];
  shifts: ShiftClass[];
}
interface CalenderProps {
  month: Array<Week>;
  shifts: Array<ShiftClass>;
  setShifts: React.Dispatch<React.SetStateAction<ShiftClass[]>>;
}

export { Month, Week, Year, CalenderProps };

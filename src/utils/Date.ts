import { Month, Week } from "../Types";
export const monthsNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
export function createYear(yearValue = new Date().getFullYear()) {
  function createWeek(startDate: Date) {
    const week: Array<Date> = [];
    let lastDate = new Date(startDate);
    lastDate.setHours(24 * 6);
    for (let date = new Date(startDate); date <= lastDate; date.setHours(24)) {
      week.push(new Date(date));
    }
    return week;
  }

  let monday = getFirstKWMonday(yearValue);
  let kwCounter = 1;

  const year = {
    year: yearValue,
    months: new Array<Month>(12),
  };
  let lastWeekOfPrevMonth;
  for (let m = 0; m < 12; m++) {
    let weeks: Week[] = [];
    let nextMonth = createDate(1, m + 1, yearValue);
    if (
      lastWeekOfPrevMonth !== undefined &&
      lastWeekOfPrevMonth.weekDates.some((date) => date.getMonth() === m && date.getDay() >= 1 && date.getDay() <= 5)
    ) {
      weeks.push(lastWeekOfPrevMonth);
    }
    while (monday < nextMonth) {
      weeks.push({ kwNumber: kwCounter, weekDates: createWeek(monday) });
      kwCounter++;
      monday.setHours(24 * 7);
    }
    lastWeekOfPrevMonth = weeks.slice(-1)[0];
    year.months[m] = weeks;
  }

  return year;
}
/**
 * createDate returns a Date with the time defaulting to midnight (instead of the current time like in 'new Date()')
 * @return {[Date]}     [Date with time at midnight]*/
export function createDate(
  day: number,
  month: number,
  year: number,
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0
) {
  let date = new Date();
  date.setFullYear(year);
  date.setMonth(month);
  date.setDate(day);
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);
  date.setMilliseconds(milliseconds);
  return date;
}
function isLeapYear(year = 2023) {
  return year % 4 === 0 && (!(year % 100 === 0) || year % 400 === 0);
}

function getFirstKWMonday(year: number): Date {
  /*  Returns the first monday of the given year*/

  let firstDayOfYear = createDate(1, 0, year);
  let weekDay = weekdays[firstDayOfYear.getDay()];
  switch (weekDay) {
    case "Dienstag":
      firstDayOfYear.setHours(-24);
      break;
    case "Mittwoch":
      firstDayOfYear.setHours(-(2 * 24));
      break;
    case "Donnerstag":
      firstDayOfYear.setHours(-(3 * 24));
      break;
    case "Sonntag":
      firstDayOfYear.setHours(24);
      break;
    case "Samstag":
      firstDayOfYear.setHours(2 * 24);
      break;
    case "Freitag":
      firstDayOfYear.setHours(3 * 24);
      break;
  }
  return firstDayOfYear;
}

export function formatTime(date: Date): string {
  const timeFormatter = new Intl.DateTimeFormat("de", {
    timeStyle: "short",
  });
  return timeFormatter.format(date);
}

export function formatDate(date: Date): string {
  const dateFormatter = new Intl.DateTimeFormat("de", {
    dateStyle: "medium",
  });
  return dateFormatter.format(date).split(".").reverse().join("-");
}
export function toWeekDayString(index: number) {
  return weekdays[index];
}
export function randomDate(hourSpan = 24) {
  let nextDay = new Date();
  nextDay.setHours(hourSpan * Math.random());
  return nextDay;
}
export function getCurrentMonth() {
  const d = new Date();
  return d.getMonth();
}
export function tomorrowOf(date: Date) {
  let tomorrow = new Date(date);
  return setTime(tomorrow, 24);
}
export function addTimeToDate(date: Date, amount: number) {
  /* Returns date added by the amount in milliseconds */
  return new Date(date.getTime() + amount);
}
export function setTime(date: Date, hours = 0, minutes = 0, seconds = 0, milliseconds = 0): Date {
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);
  date.setMilliseconds(milliseconds);
  return date;
}
export function getFollowingWeekday(weekday: number) {
  let date = new Date();
  while (date.getDay() !== weekday) {
    date = tomorrowOf(date);
  }
  console.log(console.log(`next ${weekdays[weekday]} is in on ${date}`));
  return date;
}

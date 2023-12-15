import { randomDate, createDate, getCurrentMonth } from "../utils/Date";
import { ShiftClass } from "../Types";
export const shiftList: ShiftClass[] = [];

export function saveInLocalStorage() {
  let shift = new ShiftClass(20202, "testShift", new Date(), randomDate(24 * 3), [], "testing Local Storage");
  localStorage.setItem(`${shift.id}`, JSON.stringify(shift));
  return shift.id;
}

export function getFromLocalStorage() {
  let id = saveInLocalStorage();
  console.log(JSON.parse(localStorage.getItem(`${id}`)!));
}

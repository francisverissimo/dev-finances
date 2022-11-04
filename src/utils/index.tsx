import { Moment } from "moment";

export function generateTransactionID() {
  return Math.floor(Date.now() * Math.random()).toString(36);
}

export function passDateInMomentFormatToDateFormat(date: Moment) {
  return new Date(date.format());
}

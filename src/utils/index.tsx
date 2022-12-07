import { Moment } from "moment";

export async function generateTransactionID() {
  return Math.floor(Date.now() * Math.random()).toString(36);
}

export async function passDateInMomentFormatToDateFormat(date: Moment) {
  return new Date(date.format());
}

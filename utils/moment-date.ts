import { Timestamp } from "firebase/firestore";
import moment from "moment";

export const formatDateToString = (currentDate: Date | Timestamp) =>
  moment(currentDate).format("DD-MM-YYYY");

export const getDiffBetweenTimeStamps = (
  date1: Date | Timestamp,
  date2: Date | Timestamp,
) => moment(date2).diff(moment(date1), "days");

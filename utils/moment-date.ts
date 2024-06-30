import moment from "moment";

export const formatDateToString = (currentDate: Date) =>
  moment(currentDate).format("DD-MM-YYYY");

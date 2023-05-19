import moment from "moment";

export const normalizeDate = (dateString: string) => {
  return moment(dateString).format("DD/MM/YY");
};

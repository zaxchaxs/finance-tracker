import { Timestamp } from "firebase/firestore";

export const dateToString = (date: Timestamp) => {
  const newDate = date.toDate();
  return newDate.toLocaleDateString("en-EN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

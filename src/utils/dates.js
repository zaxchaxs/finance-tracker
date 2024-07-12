// Is this used??
export const dateToString = (date) => {
  const option = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const newDate = date.toDate();
  return newDate.toLocaleDateString("id-ID", option);
};

export const selectedFilterConverting = (value) => {
  const options = { day: "numeric", month: "long", year: "2-digit" };
  const today = new Date();

  switch (value) {
    case "Today":
      return today.toLocaleDateString("en-US", options);

    case "Yesterday": {
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return yesterday.toLocaleDateString("en-US", options);
    }

    case "Last 7 days": {
      const option = { day: "numeric", month: "short" };
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      return `${lastWeek.toLocaleDateString(
        "en-US",
        option
      )} - ${today.toLocaleDateString("en-US", option)}`;
    }

    case "Last 30 days": {
      const option = { day: "numeric", month: "short" };
      const lastMonth = new Date(today);
      lastMonth.setDate(today.getDate() - 30);
      return `${lastMonth.toLocaleDateString(
        "en-US",
        option
      )} - ${today.toLocaleDateString("en-US", option)}`;
    }
    
    case "This month": {
      const option = { day: "numeric", month: "short" };
      const firstDayInMonth = new Date(today);
      firstDayInMonth.setDate(1)
      return `${firstDayInMonth.toLocaleDateString(
        "en-US",
        option
      )} - ${today.toLocaleDateString("en-US", option)}`;
    }

    case "Custom":
      break;

    default:
      break;
  }

  // const today = new Date();
  // console.log(today);

  // const yesterday = new Date(today);
  // yesterday.setDate(today.getDate() - 1);
  // console.log(yesterday);

  // const lastWeek = new Date(today)
  // lastWeek.setDate(today.getDate()- 7);
  // console.log(lastWeek);

  // const lastMonth = new Date(today);
  // lastMonth.setDate(today.getDate() - 30);
  // console.log(lastMonth);
};

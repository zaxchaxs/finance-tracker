"use client";

import { useState } from "react";
import { FilterFirestoreType } from "./FirestoreApiHooks";

export const useFirestoreFilteringQueries = () => {
  const [startOfFilter, setStartOfFilter] = useState<FilterFirestoreType[]>();
  const [endOfFilter, setEndOfFilter] = useState<FilterFirestoreType[]>();

  const today = new Date();

  const setTodayFiltering = (): FilterFirestoreType[] => {
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    return [
      {
        fieldPath: "date",
        opStf: ">=",
        value: startOfDay,
      },
      {
        fieldPath: "date",
        opStf: "<=",
        value: endOfDay,
      },
    ];
  };

  const setOneWeekFiltering = (): FilterFirestoreType[] => {
    const firstDay = today;
    firstDay.setDate(today.getDate() - today.getDay());

    const startOfWeek = new Date(firstDay.setHours(0, 0, 0, 0));
    const endOfWeek = new Date();
    endOfWeek.setHours(23, 59, 59, 999);

    return [
      {
        fieldPath: "date",
        opStf: ">=",
        value: startOfWeek,
      },
      {
        fieldPath: "date",
        opStf: "<=",
        value: endOfWeek,
      },
    ];
  };

  const setOneMonthFiltering = (year: number, month: number): FilterFirestoreType[] => {
    const firstDay = new Date(year, month, 1, 0, 0, 0, 0);
    const lastDay = new Date(year, month + 1, 0, 23, 59, 59, 999);

    return [
        { fieldPath: "date", opStf: ">=", value: firstDay },
        { fieldPath: "date", opStf: "<=", value: lastDay }
    ];
  };

  const setOneYearFiltering = (year: number): FilterFirestoreType[] => {
    const firstDay = new Date(year, 0, 1, 0, 0, 0, 0);
    const lastDay = new Date(year, 11, 31, 23, 59, 59, 999);

    return [
      { fieldPath: "date", opStf: ">=", value: firstDay },
      { fieldPath: "date", opStf: "<=", value: lastDay },
    ];
};

  return { setTodayFiltering, setOneWeekFiltering, setOneMonthFiltering, setOneYearFiltering };
};

export default useFirestoreFilteringQueries;

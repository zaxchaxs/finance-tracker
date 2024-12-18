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

  return { setTodayFiltering, setOneWeekFiltering };
};

export default useFirestoreFilteringQueries;

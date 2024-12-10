"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  FieldPath,
  FirestoreError,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryConstraint,
  QuerySnapshot,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  WhereFilterOp,
} from "firebase/firestore";
import { db } from "@/libs/firebase";
import { useEffect, useState } from "react";

type WhereClauseType = QueryConstraint[];

export const useSnapshotDatas = <T,>(
  collectionName: string,
  whereClause: {
    fieldPath: string | FieldPath;
    opStf: WhereFilterOp;
    value: unknown;
  }[]
): { data: T[]; loading: boolean; error: FirestoreError | null } => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<FirestoreError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const whereQueries: WhereClauseType = whereClause.map((query) => {
    return where(query.fieldPath, query.opStf, query.value);
  });
  const q = query(collection(db, collectionName), ...whereQueries);

  const getData = () => {
    setLoading(true);

    const unsubscribe = onSnapshot<DocumentData, DocumentData>(
      q,
      (snapshot) => {
        const response = snapshot.docs.map((doc) => ({ ...(doc.data() as T) }));
        setData(response);
        console.log(response);
        setLoading(false);
      },
      (error) => {
        console.error(error.message);
        setError(error);
        setLoading(false);
      }
    );
  }

  useEffect(() => {
    getData();
  }, []);

  return { data, loading, error};
};

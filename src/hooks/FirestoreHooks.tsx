"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
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
  WithFieldValue,
} from "firebase/firestore";
import { db } from "@/libs/firebase";
import { useEffect, useState } from "react";
import useToast from "./useToast";

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
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, loading, error };
};

export const usePostData = () => {
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] =
    useState<DocumentReference<object, DocumentData>>();
  const [loading, setLoading] = useState<boolean>(false);
  const { pushToast, updateToast } = useToast();

  const postData = async (
    data: object,
    collectionName: string
  ): Promise<DocumentReference<object, DocumentData> | null> => {
    setLoading(true);
    const toastId = pushToast({ message: "Loading...", isLoading: true });
    try {
      const docRef = collection(db, collectionName);
      const response = await addDoc(docRef, data);
      setResponse(response);
      updateToast({ toastId, message: "Success" });
      return response;
    } catch (error) {
      if (error instanceof FirestoreError) {
        console.error(error.message);
        setError(error.message);
        updateToast({
          toastId,
          message: error.message,
          isError: true,
        });
        throw new Error(error.message);
      } else if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
        updateToast({
          toastId,
          message: error.message,
          isError: true,
        });
        throw new Error(error.message);
      } else {
        console.error("Something Wrong!");
        setError("Something Wrong!");
        updateToast({
          toastId,
          message: "Something Wrong!",
          isError: true,
        });
        throw new Error("Something Wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error, response };
};

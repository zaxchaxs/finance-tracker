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
  OrderByDirection,
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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useToast from "./useToast";
import isEqual from "lodash.isequal";

export interface FilterFirestoreType {
  fieldPath: string | FieldPath;
  opStf: WhereFilterOp;
  value: unknown;
}

export interface OrderFirestoreType {
  fieldPath: string | FieldPath;
  directionStr?: OrderByDirection;
}

export const useSnapshotDatas = <T,>(
  collectionName: string,
  initialCall?: boolean,
  filters?: FilterFirestoreType[],
  orders?: OrderFirestoreType[],
  limitSnap?: number
) => {
  const [colName, setColName] = useState<string>(collectionName)
  const [filterQueries, setFilterQueries] = useState<FilterFirestoreType[]>(
    filters || []
  );
  const [orderQueries, setOrderQueries] = useState<OrderFirestoreType[]>(
    orders || []
  );
  const [limitData, setLimitData] = useState<number | null>(limitSnap || null);
  const [loading, setLoading] = useState<boolean>(initialCall || false);
  const [error, setError] = useState<FirestoreError | null>(null);
  const [data, setData] = useState<T[]>([]);
  const { pushToast, updateToast } = useToast();
  const isCanSnapshotRef = useRef<boolean>(false);

  // menggunakan ref ini untuk mengakali setiap ada perubahan di filters/orders, karena berbentuk array jadi referensinya berubah setiap kali komponen dirender ulang.
  const queriesChangedRef = useRef<boolean>(false);

  const q = useMemo(() => {
    const whereQ =
      filterQueries.map(({ fieldPath, opStf, value }) =>
        where(fieldPath, opStf, value)
      ) || [];
    const orderQ =
      orderQueries.map(({ fieldPath, directionStr }) =>
        orderBy(fieldPath, directionStr)
      ) || [];

    let baseQuery = query(collection(db, colName), ...whereQ, ...orderQ);

    if (limitData) {
      baseQuery = query(
        collection(db, colName),
        ...whereQ,
        ...orderQ,
        limit(limitData)
      );
    }

    return baseQuery;
  }, [queriesChangedRef.current]);

  const updateSnapshotParams = (
    collectionName: string,
    filters?: FilterFirestoreType[],
    orders?: OrderFirestoreType[],
    limit?: number
  ) => {
    setColName(collectionName);
    setFilterQueries(filters || filterQueries);
    setOrderQueries(orders || orderQueries);
    setLimitData(limit || limitData);
    isCanSnapshotRef.current = true;

    queriesChangedRef.current = !queriesChangedRef.current;
  };

  const snapshotData = () => {
    setLoading(true);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const response = snapshot.docs.map((doc) => ({ ...(doc.data() as T) }));
        setData(response);
        console.log(response);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
        pushToast({
          isError: true,
          message: error.name,
        });
        console.error(error);
      }
    );

    console.log("snapshot");
    return unsubscribe;
  };

  useEffect(() => {
    if(initialCall || isCanSnapshotRef.current) {
      snapshotData();
      console.log("inital call")
    };

    console.log("looping useEffect");
  }, [q]);

  return {
    reSnapshot: snapshotData,
    updateSnapshotParams,
    data,
    error,
    loading,
  };
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

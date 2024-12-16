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
};

export const useSnapshotDatas = <T,>(
  collectionName: string,
  filters: FilterFirestoreType[],
  initialCall?: boolean,
  orderData?: {
    fieldPath: string | FieldPath;
    directionStr?: OrderByDirection;
  }[],
  limitData?: number | null
): {
  data: T[];
  loading: boolean;
  error: FirestoreError | null;
  snapshotData: () => void;
} => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<FirestoreError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { pushToast, updateToast } = useToast();
  const filterRef = useRef(filters);
  const orderDataRef = useRef(orderData);

  const q = useMemo(() => {
    const whereQueries = filters.map(({ fieldPath, opStf, value }) =>
      where(fieldPath, opStf, value)
    );
    const orderQueries =
      orderData?.map(({ fieldPath, directionStr }) =>
        orderBy(fieldPath, directionStr)
      ) || [];

    const baseQuery = query(collection(db, collectionName), ...whereQueries);

    if (limitData && orderData) {
      return query(baseQuery, limit(limitData), ...orderQueries);
    } else if (limitData) {
      return query(baseQuery, limit(limitData));
    } else if (orderData) {
      return query(baseQuery, ...orderQueries);
    } else {
      return baseQuery;
    }
  }, [collectionName, filters, limitData, orderData]);

  // const snapshotData = () => {
  //   setLoading(true);
  //   console.log(q);

  //   const unsubscribe = onSnapshot<DocumentData, DocumentData>(
  //     q,
  //     (snapshot) => {
  //       const response = snapshot.docs.map((doc) => ({ ...(doc.data() as T) }));
  //       setData(response);
  //       console.log(response);
  //       setLoading(false);
  //     },
  //     (error) => {
  //       console.error(error.message);
  //       pushToast({
  //         message: "Failed getting wallet!",
  //         isError: true,
  //       });
  //       setError(error);
  //       setLoading(false);
  //     }
  //   );

  //   return unsubscribe;
  // };

  const snapshotData = useCallback(() => {
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
      }
    );
    return unsubscribe;
  }, [q]);

  useEffect(() => {
    if (initialCall) {
      const unsubscribe = snapshotData();
      console.log("call");
      return () => unsubscribe?.();
    }
  }, [filterRef.current, orderDataRef.current]);

  useEffect(() => {  
    if (!isEqual(filterRef.current, filters) || !isEqual(orderDataRef.current, orderData)) {
      filterRef.current = filters;
      orderDataRef.current = orderData;
      console.log("Changed");
    }
  }, [filters, orderData]);
  
  return { data, loading, error, snapshotData };
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

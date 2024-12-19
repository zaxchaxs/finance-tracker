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
  QueryDocumentSnapshot,
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
import { FirebaseError } from "firebase/app";

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
  const [colName, setColName] = useState<string>(collectionName);
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
    if (initialCall || isCanSnapshotRef.current) {
      snapshotData();
      console.log("inital call");
    }

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
  const [error, setError] = useState<FirestoreError | string | null>(null);
  const [response, setResponse] =
    useState<DocumentReference<object, DocumentData>>();
  const [loading, setLoading] = useState<boolean>(false);
  const { pushToast, updateToast } = useToast();

  const postData = async (
    data: object,
    collectionName: string
  ): Promise<DocumentReference<object, DocumentData> | null> => {
    console.log(data);
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
        setError(error);
        updateToast({
          toastId,
          message: error.name,
          isError: true,
        });
        throw new Error(error.message);
      } else if (error instanceof FirebaseError) {
        console.error(error.message);
        setError(error.message);
        updateToast({
          toastId,
          message: error.name,
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

export const useUpdateData = () => {
  const [error, setError] = useState<FirestoreError | string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { pushToast } = useToast();

  const getDocsReference = async <T,> (
    collectionName: string,
    filters?: FilterFirestoreType[]
  ): Promise<{
    ref: DocumentReference<DocumentData, DocumentData>;
    data: T;
  } | null> => {
    setLoading(true);
    try {
      const whereQ =
        filters?.map(({ fieldPath, opStf, value }) =>
          where(fieldPath, opStf, value)
        ) || [];

      const q = query(collection(db, collectionName), ...whereQ);
      const docSnapshot = await getDocs(q);

      if (docSnapshot.empty) return null;

      const docRef = docSnapshot.docs[0].ref;


      return {
        ref: docRef,
        data: docSnapshot.docs[0].data() as T
      };
    } catch (error) {
      if (error instanceof FirestoreError) {
        console.error(error.message);
        setError(error);
        pushToast({
          message: error.name,
          isError: true,
        });
      } else if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
        pushToast({
          message: error.message,
          isError: true,
        });
      } else {
        console.error("Something Wrong!");
        setError("Something Wrong!");
        pushToast({
          message: "Something Wrong!",
          isError: true,
        });
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (
    collectionRef: DocumentReference<DocumentData, DocumentData>,
    data: object
  ) => {
    setLoading(true);
    try {
      await updateDoc(collectionRef, data);
    } catch (error) {
      if (error instanceof FirestoreError) {
        console.error(error.message);
        setError(error);
        pushToast({
          message: error.name,
          isError: true,
        });
      } else if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
        pushToast({
          message: error.message,
          isError: true,
        });
      } else {
        console.error("Something Wrong!");
        setError("Something Wrong!");
        pushToast({
          message: "Something Wrong!",
          isError: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    updateData,
    getDocsReference
  };
};

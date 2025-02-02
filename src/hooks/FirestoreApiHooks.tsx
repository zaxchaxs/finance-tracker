"use client";

import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
  FieldPath,
  FirestoreError,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  OrderByDirection,
  query,
  updateDoc,
  where,
  WhereFilterOp,
} from "firebase/firestore";
import { db } from "@/libs/firebase";
import { useEffect, useMemo, useRef, useState } from "react";
import useToast from "./useToast";

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

    return unsubscribe;
  };

  useEffect(() => {
    if (initialCall || isCanSnapshotRef.current) {
      snapshotData();
    }
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
  const [error, setError] = useState<string>("");
  const [response, setResponse] =
    useState<DocumentReference<object, DocumentData>>();
  const [loading, setLoading] = useState<boolean>(false);
  const { pushToast, updateToast } = useToast();

  const postData = async (
    data: object,
    collectionName: string,
    isUseToast?: boolean
  ): Promise<DocumentReference<object, DocumentData> | null> => {
    setLoading(true);

    let toastId;
    if (isUseToast) {
      toastId = pushToast({ message: "Loading...", isLoading: true });
    }

    try {
      const docRef = collection(db, collectionName);
      const response = await addDoc(docRef, data);
      setResponse(response);

      isUseToast && updateToast({ toastId, message: "Success" });

      return response;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something wrong!";
      console.error(errorMessage);
      setError(errorMessage);
      isUseToast &&
        updateToast({ toastId, message: errorMessage, isError: true });
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error, response };
};

export const useUpdateData = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { pushToast } = useToast();

  const getDocsReference = async <T,>(
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
        data: docSnapshot.docs[0].data() as T,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something wrong!";
      console.error(errorMessage);
      setError(errorMessage);
      pushToast({ message: errorMessage, isError: true });
      throw new Error(errorMessage);
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
      const errorMessage =
        error instanceof Error ? error.message : "Something wrong!";
      console.error(errorMessage);
      setError(errorMessage);
      pushToast({ message: errorMessage, isError: true });
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    loading,
    updateData,
    getDocsReference,
  };
};

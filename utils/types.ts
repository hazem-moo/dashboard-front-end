import { Dispatch, ReactNode, SetStateAction } from "react";

export type PropsHeader = {
  project_title: string;
  description: string;
};

export type getOrders = {
  title: string;
  category: string;
  price: number | string;
  count: number | string;
  discount: number | string;
  id: number;
  total: number;
  min_count?: number;
};

export type postDataOrder = {
  data: Omit<getOrders, "id">;
};

export type PropsChildren = {
  children: ReactNode;
};

export type PropsProductContext = {
  product: getOrders[];
  setProduct: Dispatch<SetStateAction<getOrders[]>>;
  removeProduct: (id: number) => void;
};

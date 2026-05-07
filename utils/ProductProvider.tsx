"use client";
import React, { createContext, useContext, useState } from "react";
import { getOrders, PropsChildren, PropsProductContext } from "./types";

const ProviderProducts = createContext<undefined | PropsProductContext>(
  undefined,
);

export const ProductProvider = ({ children }: PropsChildren) => {
  const [product, setProduct] = useState<getOrders[]>([]);
  const removeProduct = (id: number) => {
    setProduct((el) => el.filter((p) => p.id !== id));
  };
  return (
    <ProviderProducts.Provider value={{ product, setProduct, removeProduct }}>
      {children}
    </ProviderProducts.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProviderProducts);
  if (!context) throw new Error("context no`t find...");
  return context;
};

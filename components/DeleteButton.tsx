"use client";
import { axiosClient } from "@/utils/FUNc";
import { useProduct } from "@/utils/ProductProvider";
import React from "react";

const deleteData = async (id: number) => {
  const res = await axiosClient.delete(`/api/orders/${id}`);
  return res.data;
};

const DeleteButton = ({ id }: { id: number }) => {
  const { removeProduct } = useProduct();

  const deleteOrder = async (id: number) => {
    removeProduct(id);
    await deleteData(id);
  };
  return (
    <button className="bg-red-600 px-5" onClick={() => deleteOrder(id)}>
      delete
    </button>
  );
};

export default DeleteButton;

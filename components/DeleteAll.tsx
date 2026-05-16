import { axiosClient } from "@/utils/FUNc";
import { useProduct } from "@/utils/ProductProvider";
import React from "react";

const deleteAll = async () => {
  const res = await axiosClient.delete("/api/orders");
  return res.data;
};
const DeleteAll = () => {
  const { product, setProduct } = useProduct();

  const deleteAllProducts = async () => {
    setProduct([]);
    await deleteAll();
  };

  const totalCount = product.reduce((total, item) => (total += +item.count), 0);

  return (
    <>
      {product.length > 0 ? (
        <button className="w-full bg-red-600" onClick={deleteAllProducts}>
          delete all: {totalCount} count
        </button>
      ) : (
        <h1
          className="text-white
         text-center my-10"
        >
          products not foun...
        </h1>
      )}
    </>
  );
};

export default DeleteAll;

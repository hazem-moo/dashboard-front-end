"use client";

import { axiosClient } from "@/utils/FUNc";
import { useProduct } from "@/utils/ProductProvider";
import { getOrders } from "@/utils/types";
import React, { useEffect } from "react";

const deleteData = async (id: number) => {
  const res = await axiosClient.delete(`/api/orders/${id}`);
  return res.data;
};

// DataList component
const DataList = () => {
  const { product, setProduct, removeProduct } = useProduct();

  const findProductTitle = product.reduce<getOrders[]>((arr, item) => {
    const findTitle = arr.find((p) => p.title === item.title);
    if (findTitle) {
      findTitle.count = Number(findTitle.count) + Number(item.count);
      findTitle.price = Number(findTitle.price) + Number(item.price);
    } else {
      arr.push({ ...item });
    }
    return arr;
  }, []);

  const deleteOrder = async (id: number) => {
    removeProduct(id);
    await deleteData(id);
  };

  const updateProduct = () => {};

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosClient.get("/api/orders");
      setProduct(res.data);
      return res.data;
    };
    fetchData();
  }, [setProduct]);

  return (
    <section className="data-list flex flex-col gap-5 justify-center mt-6 ">
      {findProductTitle.map((el) => (
        <div
          className="grid grid-cols-2 sm:grid-cols-8 gap-3 border border-white items-center justify-evenly text-center"
          key={el.id}
        >
          <h4 className="text-center border-r border-white p-2.5 text-lg font-medium ">
            {el.title}
          </h4>
          <p className="p-2.5 border-r border-white">category: {el.category}</p>
          <p className="p-2.5 border-r border-white">item price: {el.price}</p>
          <p className="p-2.5 border-r border-white">discount: {el.discount}</p>
          <p
            className={`p-2.5 border-r border-white count 
            ${el.min_count !== undefined && +el.count <= el.min_count ? "animate" : ""}`}
          >
            count: {el.count}
          </p>
          <p className="p-2.5">total price: {el.total}</p>
          <button className="bg-green-700 px-5 " onClick={updateProduct}>
            update
          </button>
          <button
            className="bg-red-600 px-5"
            onClick={() => deleteOrder(el.id)}
          >
            delete
          </button>
        </div>
      ))}
    </section>
  );
};

export default DataList;

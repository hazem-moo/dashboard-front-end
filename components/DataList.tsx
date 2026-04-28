"use client";
import { axiosClient } from "@/utils/FUNc";
import { useProduct } from "@/utils/ProductProvider";
import React, { useEffect } from "react";

const DataList = () => {
  const { product, setProduct } = useProduct();
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
      {product.map((el) => (
        <div
          className="grid grid-cols-3 sm:grid-cols-7 gap-3 border border-white items-center justify-evenly text-center py-2"
          key={el.id}
        >
          <h4 className="text-center text-lg font-medium  col-span-full sm:col-auto">
            {el.title}
          </h4>
          <p className="px-2.5">category: {el.category}</p>
          <p className="px-2.5">price: {el.price}</p>
          <p className="px-2.5">discount: {el.discount}</p>
          <p className=" px-2.5">count: {el.count}</p>
          <button className="bg-green-700 px-5 ">update</button>
          <button className="bg-red-600 px-5">delete</button>
        </div>
      ))}
    </section>
  );
};

export default DataList;

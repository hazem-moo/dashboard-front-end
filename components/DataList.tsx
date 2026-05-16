"use client";
import { axiosClient } from "@/utils/FUNc";
import { useProduct } from "@/utils/ProductProvider";
import { getOrders } from "@/utils/types";
import React, { useEffect } from "react";
import DeleteAll from "./DeleteAll";
import Details from "./Details";

// DataList component
const DataList = () => {
  const { product, setProduct } = useProduct();

  // find Date with title
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
      <DeleteAll />
      {findProductTitle.map((el) => (
        <Details
          key={el.id}
          id={el.id}
          title={el.title}
          category={el.category}
          count={el.count}
          price={el.price}
          discount={el.discount}
          min_count={el.min_count}
          total={el.total}
        />
      ))}
    </section>
  );
};

export default DataList;

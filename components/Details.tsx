"use client";

import { getOrders } from "@/utils/types";
import React, { ChangeEvent, FormEvent, useState } from "react";
import DeleteButton from "./DeleteButton";
import { useProduct } from "@/utils/ProductProvider";

const Details = ({
  category,
  count,
  discount,
  id,
  price,
  min_count,
  title,
  total,
}: getOrders) => {
  const [ediit, setEdit] = useState<boolean>(false);
  const { setProduct } = useProduct();
  const [newTitle, setNewTitle] = useState(title);
  const [newCategory, setNewCategory] = useState(category);
  const [newPrice, setNewPrice] = useState(price);
  const [newDiscount, setNewDiscount] = useState(discount);
  const [newCount, setNewCount] = useState(count);
  const [newTotal, setNewTotal] = useState(0);

  const calcolatePrice = () => {
    if (newPrice !== "") {
      const $count = newCount || 1;
      const $discount = +newDiscount || 0;
      const allTotal = +newPrice - $discount;
      const totalP = allTotal * +$count;
      setNewTotal(totalP);
    }
  };

  const listData = (
    <div
      className="grid grid-cols-2 sm:grid-cols-8 gap-3 border border-white items-center justify-evenly text-center mb-6"
      key={id}
    >
      <h4 className="text-center border-r border-white p-2.5 text-lg font-medium ">
        {title}
      </h4>
      <p className="p-2.5 border-r border-white">category: {category}</p>
      <p className="p-2.5 border-r border-white">item price: {price}</p>
      <p className="p-2.5 border-r border-white">discount: {discount}</p>
      <p
        className={`p-2.5 border-r border-white count 
                ${min_count !== undefined && +count <= min_count ? "animate" : ""}`}
      >
        count: {count}
      </p>
      <p className="p-2.5">total price: {total}</p>
      <button className="bg-green-700 px-5 " onClick={() => setEdit(!ediit)}>
        update
      </button>
      <DeleteButton id={id} />
    </div>
  );

  const updateData = async () => {
    const res = await fetch(`/api/orders/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        data: {
          title: newTitle,
          category: newCategory,
          price: newPrice,
          discount: newDiscount,
          count: newCount,
          total: newTotal,
        },
      }),
    });

    return res.json();
  };

  const editForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // update form
    await updateData();
    setProduct((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              title: newTitle,
              category: newCategory,
              price: newPrice,
              discount: newDiscount,
              count: newCount,
              total: newTotal,
            }
          : item,
      ),
    );
    setEdit(false);
  };

  const updateForm = (
    <form
      onSubmit={editForm}
      className="grid grid-cols-3 border border-white sm:grid-cols-7 justify-evenly items-center gap-3.5"
    >
      <input
        type="text"
        value={newTitle}
        className="input-u"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewTitle(e.target.value)
        }
      />
      <input
        type="text"
        value={newCategory}
        className="input-u"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewCategory(e.target.value)
        }
      />
      <input
        type="number"
        onKeyUp={calcolatePrice}
        value={newPrice}
        className="input-u"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewPrice(e.target.valueAsNumber)
        }
      />
      <input
        type="number"
        value={newDiscount}
        onKeyUp={calcolatePrice}
        className="input-u"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewDiscount(e.target.valueAsNumber)
        }
      />
      <input
        type="number"
        onKeyUp={calcolatePrice}
        value={newCount}
        className="input-u"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNewCount(e.target.valueAsNumber)
        }
      />
      <small>total price: {newTotal}</small>
      <button className="bg-green-600">update</button>
    </form>
  );
  return <>{ediit ? updateForm : listData}</>;
};

export default Details;

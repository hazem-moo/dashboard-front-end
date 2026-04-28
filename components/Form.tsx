"use client";

import { postDataOrder } from "@/utils/types";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";

function Form() {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number | string>("");
  const [count, setCount] = useState<number | string>("");
  const [discount, setDiscount] = useState<number | string>("");
  const btnRef = useRef<HTMLButtonElement>(null);

  const PostData = async (data: postDataOrder) => {
    const res = await fetch("/api/orders", {
      method: "POSt",
      body: JSON.stringify(data),
    });
    return res.json();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const api = {
      data: {
        title,
        category,
        price,
        count,
        discount,
      },
    };
    await PostData(api);
  };

  return (
    <section className="">
      <form
        className="grid grid-cols-2 sm:grid-cols-5 gap-4 items-center justify-between w-full"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="type title..."
          className="input col-span-full w-[95%] mx-auto"
          value={title}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <input
          type="text"
          placeholder="type category..."
          className="input"
          required
          value={category}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCategory(e.target.value)
          }
        />
        <input
          type="number"
          placeholder="type price..."
          className="input"
          required
          value={price}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPrice(e.target.valueAsNumber)
          }
        />
        <input
          type="number"
          placeholder="type discount..."
          className="input"
          required
          value={discount}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setDiscount(e.target.valueAsNumber)
          }
        />
        <input
          type="number"
          placeholder="type count..."
          className="input"
          required
          value={count}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCount(e.target.valueAsNumber)
          }
        />
        <small>total:</small>
        <button
          type="submit"
          ref={btnRef}
          className="col-span-full bg-black w-[90%] mx-auto"
        >
          create projuct
        </button>
      </form>
    </section>
  );
}

export default Form;

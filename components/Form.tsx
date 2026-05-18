"use client";

import { postDataOrder } from "@/utils/types";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

function Form() {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number | string>("");
  const [count, setCount] = useState<number | string>("");
  const [discount, setDiscount] = useState<number | string>("");
  const [total, setTotal] = useState(0);
  const [write, setWrite] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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
        total,
      },
    };
    if (+count === 0) {
      e.preventDefault();
      setWrite("count must be more than 0");
    } else {
      await PostData(api);
    }
  };

  const calcolatePrice = () => {
    if (price !== "") {
      const $count = count || 1;
      const $discount = +discount || 0;
      const allTotal = +price - $discount;
      const totalP = allTotal * +$count;
      setTotal(totalP);
    }
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });

  return (
    <section className="my-5">
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
          ref={inputRef}
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
          onKeyUp={calcolatePrice}
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
          onKeyUp={calcolatePrice}
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
          onKeyUp={calcolatePrice}
          placeholder="type count..."
          className="input"
          required
          value={count}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCount(e.target.valueAsNumber)
          }
        />
        <small
          className={`py-1.5 px-2.5 text-center ${total === 0 || isNaN(total) ? "bg-red-600" : "bg-green-800"}`}
        >
          total: {total === 0 || isNaN(total) ? "" : total}
        </small>
        <p className="text-white text-center col-span-full">{write}</p>
        <button
          type="submit"
          className="col-span-full bg-black w-[90%] mx-auto"
        >
          create projuct
        </button>
      </form>
    </section>
  );
}

export default Form;

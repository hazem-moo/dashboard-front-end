/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from "@/utils/FUNc";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const res = await axiosClient.post(`/orders`, body);
    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    const res = await axiosClient.get("/orders");
    return NextResponse.json(res.data.data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

// delete all items
export const DELETE = async () => {
  try {
    // جيب كل الـ orders الأول
    const res = await axiosClient.get("/orders");
    const orders = res.data.data;

    // احذف كل واحد بـ id
    await Promise.all(
      orders.map((order: { id: number }) =>
        axiosClient.delete(`/orders/${order.id}`),
      ),
    );

    return NextResponse.json({ message: "All deleted" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

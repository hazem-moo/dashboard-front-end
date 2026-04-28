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

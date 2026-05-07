/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from "@/utils/FUNc";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) => {
  try {
    const id = (await context.params).id;
    const res = await axiosClient.delete(`/orders/${id}`);
    return NextResponse.json(res.data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

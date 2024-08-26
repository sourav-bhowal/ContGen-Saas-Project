import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
    let razorpayInstance = new Razorpay({
        key_id: process.env.RAZORPAY_ID!,
        key_secret: process.env.RAZORPAY_SECRET,
    });

    const order = await razorpayInstance.subscriptions.create({
        plan_id: process.env.RAZORPAY_PLAN_ID!,
        customer_notify: 1,
        total_count: 1,
        notes: {
            key1: "value1",
        }
    });

    return NextResponse.json(order);
}

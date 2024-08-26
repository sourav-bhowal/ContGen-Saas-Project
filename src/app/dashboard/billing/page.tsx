"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { UserSubscription } from "@/schema/schema";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Script from "next/script";
import { useState } from "react";

export default function BillingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  // CREATE SUB
  const CreateSubscription = async () => {
    setIsLoading(true);
    await axios.post("/api/create-subscription").then(
      (res) => {
        OnPayment(res.data.id);
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
      }
    );
  };

  // RAZORPAY
  const OnPayment = async (id: string) => {
    // options
    const options = {
      key: process.env.RAZORPAY_ID!,
      subscription_id: id,
      name: "ContGen",
      description: "ContGen Subscription",
      // handler
      handler: async (response: any) => {
        if (response) {
          SaveSub(response.razorpay_payment_id);
        }
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  // SAVE SUB
  const SaveSub = async (paymentId: string) => {
    const data = await db.insert(UserSubscription).values({
      email: user?.primaryEmailAddress?.emailAddress!,
      userName: user?.fullName!,
      active: true,
      paymentId: paymentId,
    });

    if (data) {
      setIsLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className=" flex justify-center items-center flex-col bg-primary p-10 space-y-2">
        <h1>Monthly</h1>
        <h2>₹399/month</h2>
        <p>1,00,000 words/month</p>
        <p>50+ Templates</p>
        <Button
          onClick={() => CreateSubscription()}
          disabled={isLoading}
          variant={"outline"}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Subscribe"}
        </Button>
      </div>
    </div>
  );
}

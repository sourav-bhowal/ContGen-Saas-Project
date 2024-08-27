import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { useContext, useEffect, useRef, useState } from "react";
import { myPrompts } from "@/app/dashboard/history/page";
import { TotalUsageCreditContext } from "@/context/TotalUsageCreditContext";

function UsageTrack() {
  // GET USER
  const { user } = useUser();
  const { totalUsageState, setTotalUsageState } = useContext(
    TotalUsageCreditContext
  );

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const data = await fetch(`/api/get-prompts`);
        const prompts = await data.json();
        TotalUsage(prompts);
      };
      fetchData();
    }
  }, [user]);

  // TOTAL USAGE
  const TotalUsage = (data: myPrompts[]) => {
    let total = 0;
    data?.map((data) => {
      total += Number(data?.aiResponse?.length);
    });
    // set total usage context
    setTotalUsageState(total);
  };
  return (
    <>
      <div className="bg-primary text-white rounded-lg p-3">
        <h2>Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className={`h-full bg-white rounded-full`}
            style={{ width: `${(Number(totalUsageState) / 10000) * 100}%` }}
          />
        </div>

        <p className="text-sm my-2">
          {Number(totalUsageState)}/10,000 credits used
        </p>
      </div>
      <Button
        className="bg-[#765ce0] text-white w-full my-2"
        variant={"outline"}
      >
        Upgrade
      </Button>
    </>
  );
}

export default UsageTrack;

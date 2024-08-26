"use client";
import { createContext, useState } from "react";

interface TotalUsageCreditState {
  totalUsageState: number;
  setTotalUsageState: React.Dispatch<React.SetStateAction<number>>;
}

export const TotalUsageCreditContext = createContext<TotalUsageCreditState>({
  totalUsageState: 0,
  setTotalUsageState: () => {},
});

export default function TotalUsageCreditProvider({ children }: any) {
  const [totalUsageState, setTotalUsageState] = useState<number>(0);
  return (
    <TotalUsageCreditContext.Provider
      value={{ totalUsageState, setTotalUsageState }}
    >
      {children}
    </TotalUsageCreditContext.Provider>
  );
}

import Header from "@/components/shared/Header";
import SideNav from "@/components/shared/SideNav";
import TotalUsageCreditProvider from "@/context/TotalUsageCreditContext";
import React from "react";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TotalUsageCreditProvider>
      <div className="h-screen bg-slate-100">
        <div className="fixed md:w-64 hidden md:block">
          {/* RENDER SIDE NAV */}
          <SideNav />
        </div>
        <div className="md:ml-64">
          {/* RENDER HEADER */}
          <Header />
          {children}
        </div>
      </div>
    </TotalUsageCreditProvider>
  );
}

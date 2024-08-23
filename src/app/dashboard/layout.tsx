import Header from "@/components/shared/Header";
import SideNav from "@/components/shared/SideNav";
import React from "react";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
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
  );
}

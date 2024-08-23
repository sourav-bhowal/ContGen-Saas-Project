import SideNav from "@/components/shared/SideNav";
import React from "react";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div>
        <SideNav />
      </div>
      <div>{children}</div>
    </div>
  );
}

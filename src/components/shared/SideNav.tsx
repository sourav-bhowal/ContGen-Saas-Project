"use client";
import { History, Home, LayoutDashboard, Settings, Wallet } from "lucide-react";
import { usePathname } from "next/navigation";
import UsageTrack from "./UsageTrack";

export default function SideNav() {
  // GET PATHNAME OF CURRENT PAGE
  const path = usePathname();

  // MENU LIST
  const MenuList = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      link: "/dashboard",
    },
    {
      name: "History",
      icon: History,
      link: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: Wallet,
      link: "/dashboard/billing",
    },
    {
      name: "Settings",
      icon: Settings,
      link: "/dashboard/settings",
    },
  ];

  return (
    <nav className="h-screen relative p-5 shadow-sm border bg-white">
      <h1 className="text-3xl font-bold text-primary p-3 tracking-wide">
        ContGen
      </h1>
      <div className="mt-5">
        {MenuList.map((menu, index) => (
          <div
            key={index}
            className={`flex font-semibold items-center gap-2 mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer
            ${path === menu.link && "bg-primary text-white"}`}
          >
            <menu.icon />
            <a href={menu.link}>{menu.name}</a>
          </div>
        ))}
      </div>
      <div className="absolute bottom-10 w-full p-2 left-0">
        <UsageTrack />
      </div>
    </nav>
  );
}

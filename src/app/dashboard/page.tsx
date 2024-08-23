"use client";
import SearchTemplate from "@/components/shared/SearchTemplate";
import Templates from "@/components/shared/Templates";
import { useState } from "react";

const DashboardPage = () => {
  // STATE OF SEARCH BAR
  const [userSearchInput, setUserSearchInput] = useState<string>("");
  return (
    <div>
      {/* RENDER SEARCH BAR */}
      <SearchTemplate setSearchInput={(value: string) => setUserSearchInput(value)} />
      {/* RENDER TEMPLATE LIST */}
      <Templates searchInput={userSearchInput} />
    </div>
  );
};

export default DashboardPage;

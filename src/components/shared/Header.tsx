import { Search } from "lucide-react";
import { Button } from "../ui/button";

// HEADER COMPONENT
export default function Header() {
  return (
    <section className="p-4 shadow-sm border-b-2 flex justify-between items-center bg-white">
      <div className="flex items-center gap-2 rounded-md border p-2 w-[40%]">
        <Search />
        <input
          type="text"
          placeholder="Search for anything"
          className="outline-none"
        />
      </div>
      <div>
        <Button
          className="bg-primary text-white font-semibold text-lg tracking-wide"
          size="lg"
          variant="default"
        >
          Join
        </Button>
      </div>
    </section>
  );
}

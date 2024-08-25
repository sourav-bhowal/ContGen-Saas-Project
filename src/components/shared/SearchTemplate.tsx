import { Search } from "lucide-react";

// SEARCH TEMPLATE COMPONENT
function SearchTemplate({
  setSearchInput,
}: {
  setSearchInput: (value: string) => void;
}) {
  return (
    <div className="p-10 flex justify-center flex-col text-white items-center bg-gradient-to-br from-purple-500 to-purple-600">
      <h2 className="text-3xl font-bold tracking-wide">Browse All Templates</h2>
      <p>What template are you looking for?</p>
      <div className="w-full flex justify-center items-center">
        <div className="flex items-center gap-2 p-2 border rounded-md bg-white my-5 w-[60%]">
          <Search className="text-primary" />
          <input
            type="text"
            placeholder="Search for anything"
            className="outline-none bg-transparent text-black w-full"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchTemplate;

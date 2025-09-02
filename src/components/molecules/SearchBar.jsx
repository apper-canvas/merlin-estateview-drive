import { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = ({ onSearch, placeholder = "Search by location, property type, or neighborhood..." }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <ApperIcon name="Search" className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 py-3 text-base"
        />
      </div>
      <Button type="submit" size="lg" className="px-6">
        <ApperIcon name="Search" className="h-5 w-5" />
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
import React, { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${query.trim()}`);
    }
  };

  if (!isMounted) return null;

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 sm:mt-4 lg:mt-0">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Tìm kiếm..."
        className="w-full"
      />
      <Button variant="default">
        Tìm kiếm
      </Button>
    </form>
  );
}

export default SearchBar;

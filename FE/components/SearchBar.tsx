import React, { useState, FormEvent, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAllGenre } from "@/api/fetchAllGenre";
import { Genre } from "@/schema/Genre";

interface SearchState {
    title: string;
    author?: string;
    genre?: Genre;
}

function SearchBar() {
    const { data: items } = useQuery({
        queryKey: ["genresSearch"],
        queryFn: fetchAllGenre,
        placeholderData: keepPreviousData,
    });
    const [query, setQuery] = useState<SearchState>({
        title: "",
        author: "",
        genre: {
            name: "",
            href: "",
        },
    });
    const router = useRouter();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setQuery((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.title.trim()) {
            let path = `/search?title=${query.title.trim()}`;
            if (query.author?.trim()) {
                path = path.concat(`&author=${query.author.trim()}`);
            }
            if (query.genre?.name) {
                path = path.concat(
                    `&genre=${query.genre.name}&href=${query.genre.href}`
                );
            }
            router.push(path);
            setQuery({
                title: "",
                author: "",
                genre: {
                    name: "",
                    href: "",
                },
            });
        }
    };

    return (
        <div className="mt-4 md:mt-0">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="w-[275px] py-2 px-4 text-sm text-gray-500 border rounded-md cursor-pointer">
                        Tìm kiếm ...
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <form
                        onSubmit={handleSearch}
                        className="w-[275px] flex flex-col justify-center gap-2 mt-4 md:mt-0 p-2"
                    >
                        <Input
                            type="title"
                            id="title"
                            value={query.title}
                            onChange={(e) => handleChange(e)}
                            placeholder="Tên truyện"
                            className="w-full"
                        />
                        <Input
                            type="author"
                            id="author"
                            value={query.author}
                            onChange={(e) => handleChange(e)}
                            placeholder="Tên tác giả"
                            className="w-full"
                        />
                        <p className="text-sm">
                            Chọn thể loại: <span>{query.genre?.name}</span>
                        </p>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    className="flex items-center space-x-2 text-base text-muted-foreground hover:text-foreground"
                                    variant="outline"
                                >
                                    <span>Thể loại</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <ul className="grid grid-cols-2 justify-self-center p-4 gap-2">
                                    {items?.slice(1).map((item) => (
                                        <DropdownMenuItem
                                            key={item.name}
                                            asChild
                                        >
                                            <li
                                                onClick={() =>
                                                    setQuery((prev) => ({
                                                        ...prev,
                                                        genre: {
                                                            name: item.name,
                                                            href: item.href,
                                                        },
                                                    }))
                                                }
                                                className="text-[#808080] dark:text-white cursor-pointer text-sm font-medium"
                                            >
                                                {item.name}
                                            </li>
                                        </DropdownMenuItem>
                                    ))}
                                </ul>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="default">Tìm kiếm</Button>
                    </form>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default SearchBar;

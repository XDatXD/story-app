import { Genre } from "@/schema/Genre";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Button } from "./ui/button";
import GenreItem from "./GenreItem";

const DropdownGenreList: React.FC<{ items?: Genre[] }> = ({ items }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="flex items-center space-x-2 text-lg text-muted-foreground hover:text-foreground"
                    variant="outline"
                >
                    <span>Thể loại</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <ul className="grid grid-cols-2 justify-self-center p-4 gap-2">
                    {items?.slice(1).map((item) => (
                        <DropdownMenuItem key={item?.name} asChild>
                            <GenreItem genre={item} />
                        </DropdownMenuItem>
                    ))}
                </ul>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownGenreList;

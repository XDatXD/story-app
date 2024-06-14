import React from "react";
import NovelByGenreItem from "./NovelByGenreItem";
import { NovelGenre } from "@/schema/NovelGenre";


const NovelByGenreList: React.FC<{ novels?: NovelGenre[] }> = ({ novels }) => {
    return (
        <div className="p-4">
            <div className="flex flex-col gap-4">
                {novels?.map((novel) => (
                    <NovelByGenreItem key={novel.href} novel={novel}/>
                ))}
            </div>
        </div>
    );
};

export default NovelByGenreList;

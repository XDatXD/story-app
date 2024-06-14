import React from "react";
import { Separator } from "./ui/separator";
import ListStory from "./NovelList";
import ReadingNovel from "./ReadingNovel";
import GenreList from "./GenreList";

const MainApp: React.FC = () => {
    return (
        <div className="container mx-auto px-16 py-8">
            <h2 className="text-xl font-semibold mb-4 uppercase w-fit">
                Danh sách truyện
                <Separator />
            </h2>
            <div className="block lg:grid grid-cols-12 gap-8">
                <div className="col-start-1 col-end-10">
                    <ListStory />
                </div>
                <div className="col-start-10 col-end-13">
                    <ReadingNovel />
                    <GenreList />
                </div>
            </div>
        </div>
    );
};

export default MainApp;

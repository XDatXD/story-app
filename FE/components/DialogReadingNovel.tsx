import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ReadingState } from "@/schema/ReadingState";
import ReadingNovelItem from "./ReadingNovelItem";

const DialogReadingNovel: React.FC<{ readingStates: ReadingState[] }> = ({
    readingStates,
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <p className="text-blue-900 cursor-pointer dark:text-white hover:underline text-sm font-medium w-fit">
                    Xem tất cả
                </p>
            </DialogTrigger>
            <DialogContent className="max-w-[80%] md:max-w-[50%] max-h-[60%] overflow-y-hidden">
                <DialogHeader>
                    <DialogTitle>Truyện đang đọc</DialogTitle>
                    <DialogDescription>
                        Danh sách truyện đang đọc
                    </DialogDescription>
                </DialogHeader>
                <div className="h-[40vh] overflow-y-scroll">
                    <ul className="p-4">
                        {readingStates.map((reading, index) => (
                            <ReadingNovelItem key={index} reading={reading} />
                        ))}
                    </ul>
                </div>
                <DialogFooter></DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DialogReadingNovel;

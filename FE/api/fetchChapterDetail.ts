import { ChapterDetail } from "@/schema/ChapterDetail";


export const fetchChapterDetail = async (url: string) => {
    const res = await fetch(
        `https://localhost:7187/GetContentChapter?href=${url}`
    );
    if (!res.ok) {
        throw new Error("Fetching error");
    }
    const data: ChapterDetail = await res.json();
    return data;
};

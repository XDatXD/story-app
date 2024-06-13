import { NovelGenre } from "@/schema/NovelGenre";

interface GetNovelByGenreResponse {
    novels: NovelGenre[];
    listPage?: string[];
}

export const fetchNovelByGenre = async (url: string) => {
    const res = await fetch(
        `https://localhost:7187/GetNovelByGenre?href=${url}`
    );
    if (!res.ok) {
        throw new Error("Fetching error");
    }
    const data: GetNovelByGenreResponse = await res.json();
    return data;
};

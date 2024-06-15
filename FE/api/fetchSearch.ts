import { NovelGenre as NovelSearch } from "@/schema/NovelGenre";

export const fetchSearch = async (
    title: string,
    author: string,
    genreHref: string
) => {
    const res = await fetch(
        `https://localhost:7187/Search?title=${title}&author=${author}&genre=${genreHref}`
    );
    if (!res.ok) {
        throw new Error("Fetching error");
    }
    const data: NovelSearch[] = await res.json();
    return data;
};

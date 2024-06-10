import { ContentChapter } from "@/schema/ContentChapter";

export const fetchContentChapter = async ({ url }: { url: string }) => {
    const res = await fetch(
        `https://localhost:7187/GetContentChapter?href=${url}`
    );
    if (!res.ok) {
        throw new Error("Fetching error");
    }
    const data: ContentChapter[] = await res.json();
    return data;
};

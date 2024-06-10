import { NovelDetail } from "@/schema/NovelDetail";

export const fetchDetailNovel = async ({ url }: { url: string }) => {
    const res = await fetch(
        `https://localhost:7187/GetDetailNovel?href=${url}`
    );
    if (!res.ok) {
        throw new Error("Fetching error");
    }
    const data: NovelDetail[] = await res.json();
    return data;
};

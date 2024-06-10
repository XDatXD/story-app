import { Novel } from "@/schema/Novel";

interface GetAllNovelResponse {
    novels: Novel[];
    // page: number;
    // total_pages: number;
    // per_page: number
}

export const fetchAllNovel = async () => {
    const res = await fetch("https://localhost:7187/GetAllNovel");
    if (!res.ok) {
        throw new Error("Fetching error");
    }
    const data: GetAllNovelResponse = await res.json();
    return data;
};
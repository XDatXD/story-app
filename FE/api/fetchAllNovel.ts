import { Novel } from "@/schema/Novel";
import qs from "qs";

interface GetAllNovelResponse {
    novels: Novel[];
    listPage?: string[];
}

export const fetchAllNovel = async (nextUrl: string) => {
    const queryParams = {
        href: nextUrl
    };

    const queryString = qs.stringify(queryParams, {
        encodeValuesOnly: true,
    });
    const res = await fetch(
        `https://localhost:7187/GetAllNovel?${queryString}`
    );
    if (!res.ok) {
        throw new Error("Fetching error");
    }
    const data: GetAllNovelResponse = await res.json();
    return data;
};

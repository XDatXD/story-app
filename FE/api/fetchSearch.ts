import { NovelGenre as NovelSearch } from "@/schema/NovelGenre";
import qs from "qs";

interface GetNovelBySearchResponse {
    novels: NovelSearch[];
    listPage?: string[];
}

export const fetchSearch = async (query: string, page: number) => {
    const queryParams: { href: string; page?: number } = {
        href: `https://truyenfull.vn/tim-kiem/?tukhoa=${query
            .split(" ")
            .join("+")}`,
    };

    if (page === 1) {
        delete queryParams?.page;
    }

    const queryString = qs.stringify(queryParams, {
        encodeValuesOnly: true,
    });
    const res = await fetch(`https://localhost:7187/Search?${queryString}`);
    if (!res.ok) {
        throw new Error("Fetching error");
    }
    const data: GetNovelBySearchResponse = await res.json();
    return data;
};

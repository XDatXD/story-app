export const fetchTotalChapters = async (novelHref: string) => {
    const res = await fetch(
        `https://localhost:7187/GetTotalNumberChapter?href=${novelHref}`
    );
    if (!res.ok) {
        throw new Error("Fetching error");
    }
    const data: number = await res.json();
    return data;
};

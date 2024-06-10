import { Genre } from "@/schema/Genre";

export const fetchAllGenre = async () => {
    const res = await fetch("https://localhost:7187/GetAllGenre");
    if (!res.ok) {
        throw new Error("Fetching error");
    }
    const data: Genre[] = await res.json();
    return data;
};
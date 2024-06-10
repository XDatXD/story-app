"use client";

import { useSearchParams } from "next/navigation";

export default function GenrePage() {
    const search = useSearchParams();
    const genreHref = search?.get("href");

    return <div>{genreHref}</div>;
}

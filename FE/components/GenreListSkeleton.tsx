import React from 'react'
import { Skeleton } from './ui/skeleton';

const GenreListSkeleton = () => {
    return (
        <ul className="mx-auto w-fit grid grid-cols-2 gap-y-2 gap-x-4">
            {Array.from({ length: 36 }, (_, i) => i + 1).map((index) => (
                <li
                    key={index}
                    className="w-[100px] h-[30px]"
                >
                    <Skeleton className="w-[100%] h-[100%]" />
                </li>
            ))}
        </ul>
    );
}

export default GenreListSkeleton
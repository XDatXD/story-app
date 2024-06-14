"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllGenre } from "@/api/fetchAllGenre";
import GenreItem from "./GenreItem";

const Footer: React.FC = () => {
    const { data } = useQuery({
        queryKey: ["genres"],
        queryFn: fetchAllGenre,
    });

    return (
        <footer className="bg-gray-100 dark:bg-[#333333] py-4 mt-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="w-full md:w-2/5 text-left sm:text-center md:text-left">
                        <p className="text-gray-600 dark:text-gray-300">
                            &copy; {new Date().getFullYear()} Group19. All
                            rights reserved.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                            Trang web này dành cho các truyện yêu thích của bạn.
                            Liên hệ: contact@group19.com
                        </p>
                    </div>
                    <ul className="w-full md:w-3/5 mt-4 md:mt-0 flex flex-wrap justify-center gap-3 sm:hidden md:flex">
                        {data?.slice(1).map((item) => (
                            <div key={item.href} className="border border-1 p-2 rounded-md">
                                <GenreItem key={item.name} genre={item} />
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

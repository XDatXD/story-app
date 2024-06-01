"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from "./ui/separator";

interface Story {
  id: number;
  title: string;
  genre: string;
  chapters: number;
}

const stories: Story[] = [
  { id: 1, title: "Bach Dao Su", genre: "Tien Hiep, Huyen Huyen, ...", chapters: 473 },
  { id: 2, title: "Dai Nguy Vuong Trieu Song Thanh Giang Ph...", genre: "Tien Hiep, Kiem Hiep, Co ...", chapters: 50 },
  { id: 3, title: "Trung Sinh Duoc Chong Yeu Chieu", genre: "Ngon Tinh, Trong Sinh, S...", chapters: 20 },
  { id: 4, title: "Y Trung Nhan", genre: "Ngon Tinh, Sung", chapters: 20 },
  { id: 5, title: "Tinh Mat Dem: Chan Troi Goc Be Deu La Em", genre: "Ngon Tinh, Sung", chapters: 25 },
  { id: 6, title: "Bach Dao Su", genre: "Tien Hiep, Huyen Huyen, ...", chapters: 473 },
  { id: 7, title: "Dai Nguy Vuong Trieu Song Thanh Giang Ph...", genre: "Tien Hiep, Kiem Hiep, Co ...", chapters: 50 },
  { id: 8, title: "Trung Sinh Duoc Chong Yeu Chieu", genre: "Ngon Tinh, Trong Sinh, S...", chapters: 20 },
  { id: 9, title: "Y Trung Nhan", genre: "Ngon Tinh, Sung", chapters: 20 },
  { id: 10, title: "Tinh Mat Dem: Chan Troi Goc Be Deu La Em", genre: "Ngon Tinh, Sung", chapters: 25 },
  { id: 11, title: "Bach Dao Su", genre: "Tien Hiep, Huyen Huyen, ...", chapters: 473 },
  { id: 12, title: "Dai Nguy Vuong Trieu Song Thanh Giang Ph...", genre: "Tien Hiep, Kiem Hiep, Co ...", chapters: 50 },
  { id: 13, title: "Trung Sinh Duoc Chong Yeu Chieu", genre: "Ngon Tinh, Trong Sinh, S...", chapters: 20 },
  { id: 14, title: "Y Trung Nhan", genre: "Ngon Tinh, Sung", chapters: 20 },
  { id: 15, title: "Tinh Mat Dem: Chan Troi Goc Be Deu La Em", genre: "Ngon Tinh, Sung", chapters: 25 },
  // Thêm các truyện khác tại đây
];

const ITEMS_PER_PAGE = 10;
const categories = [
  { label: "Kiếm Hiệp", link: "/category/kiem-hiep" },
  { label: "Ngôn Tình", link: "/category/ngon-tinh" },
  { label: "Dị Giới", link: "/category/di-gioi" },
  { label: "Dị Năng", link: "/category/di-nang" },
  { label: "Quân Sự", link: "/category/quan-su" },
  { label: "Lịch Sử", link: "/category/lich-su" },
  { label: "Xuyên Không", link: "/category/xuyen-khong" },
  { label: "Trinh Thám", link: "/category/trinh-tham" },
  { label: "Thám Hiểm", link: "/category/tham-hiem" },
  { label: "Đông Phương", link: "/category/dong-phuong" },
  { label: "Hài Hước", link: "/category/hai-huoc" },
  { label: "Cổ Đại", link: "/category/co-dai" },
  { label: "Truyện Teen", link: "/category/truyen-teen" },
  { label: "Phương Tây", link: "/category/phuong-tay" },
  { label: "Light Novel", link: "/category/light-novel" },
  { label: "Việt Nam", link: "/category/viet-nam" },
];

const NewStoryList: React.FC = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const handleRowClick = (id: number, title: string) => {
    const formattedTitle = title.replace(/ /g, "-");
    router.push(`/${id}-${formattedTitle}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedStories = stories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(stories.length / ITEMS_PER_PAGE);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6 text-left dark:text-white">TRUYỆN MỚI CẬP NHẬT</h2>
      <div className="flex gap-x-4 justify-between mb-6">
        {/* Bảng truyện chiếm 3/4 */}
        <div className="w-4/5 overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-[#292929] border border-gray-300 dark:border-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#1d1d1d] text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Truyện</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#1d1d1d] text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Thể loại</th>
                <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#1d1d1d] text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Số chương</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStories.map((story) => (
                <tr
                  key={story.id}
                  onClick={() => handleRowClick(story.id, story.title)}
                  className="cursor-pointer hover:bg-gray-200 dark:hover:bg-[#333333] border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{story.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{story.genre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{story.chapters}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-1/5 text-center p-2 dark:bg-[#292929] dark:text-white bg-[#F3F4F6]">
          <h3 className="text-2xl font-semibold mb-1 dark:text-white text-[#808080]">Thể loại</h3>
          <Separator className="mb-2 dark:bg-slate-100 bg-[#cecece]" />
          <CategoryList categories={categories} />
        </div>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationPrevious
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            className={`cursor-pointer ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
          />
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => handlePageChange(page)}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationNext
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            className={`cursor-pointer ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
          />
        </PaginationContent>
      </Pagination>
    </div>
  );
};

interface Category {
  label: string;
  link: string;
}

const CategoryList: React.FC<{ categories: Category[] }> = ({ categories }) => {
  return (
    <div>
      <ul className="space-y-2">
        {categories.map((category, index) => (
          <li key={index} className="text-[#808080] dark:text-white hover:underline">
            <a href={category.link}>{category.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewStoryList;

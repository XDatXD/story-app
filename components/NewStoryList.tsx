"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"; // Đường dẫn đến component Pagination của bạn

// Định nghĩa kiểu dữ liệu cho một truyện
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

const ITEMS_PER_PAGE = 10; // Số truyện trên mỗi trang

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
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">TRUYỆN MỚI CẬP NHẬT</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-900 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Truyện</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-900 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Thể loại</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-900 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Số chương</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStories.map((story) => (
              <tr
                key={story.id}
                onClick={() => handleRowClick(story.id, story.title)}
                className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{story.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{story.genre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{story.chapters}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination className="mt-6">
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

export default NewStoryList;

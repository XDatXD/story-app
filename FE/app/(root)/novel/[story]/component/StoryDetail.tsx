"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

const chapters = [
  'Đêm', 'Tai nghe là giả', 'Cứu người', 'Vô sỉ', 'Lương thiếp', 'Phụ huynh', 'Từ tâm đường', 'Hôn nhân đại sự',
  'Thưởng phạt', 'Ngựa quen đường cũ', 'Ngõ tối', 'Thiếu niên cùng cẩu', 'Dư Thất', 'Từ hôn', 'Phá gia chi tử',
  'Người yêu nhau cuối cùng cũng sống cùng nhau', 'Nhị đường tỷ', 'Mộng', 'Trà lâu', 'Chim tình yêu', 'Hái thuốc',
  'Ngẫu nhiên gặp', 'Thái độ của Nhị thái thái', 'Rao giá trên trời', 'Đào hố mặc chôn', 'Mất mặt', 'Trò khôi hài',
  'Đừng để ta nghe thấy là được', 'Đu dây', 'Còn muốn đánh nữa hay không hả?', 'Đây là xá muội', 'Tên khốn nạn lừa hôn',
  'Túi tiền', 'Tỷ muội', 'Ứng Nghiệm', 'Trò cũ', 'Tiên Cô', 'Mồi câu', 'Nhược Điểm', 'Lòng người hiểm ác',
  'Dương danh hiếu tâm', 'Lên đài', 'Linh âm (Cầu đặt đơn trước)', 'Người câm ăn hoàng liên', 'Kế Tiếp (Thiên Vũ, Thiên Nguyệt Trứng Linh Thú)',
  'Làm Ăn', 'Mượn Tiền', 'Lại gặp Nhị Ngưu', 'Chó nhà người khác', 'Quan sai đến'
];

const StoryDetail = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const itemsPerPage = 40;
  const totalPages = Math.ceil(chapters.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const renderChapters = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return chapters.slice(startIndex, endIndex).map((chapter, index) => (
      <li key={index} className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded">
        Chương {startIndex + index + 1}: {chapter}
      </li>
    ));
  };

  return (
    <div className="container mx-auto py-8 px-4 dark:text-white">
      <h2 className="text-2xl font-bold mb-6">Thông tin truyện</h2>

      <div className="flex flex-col lg:flex-row bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div className="lg:w-1/3 w-full p-4">
          <Image
            src="/image.png"
            alt="Truyện Xuyên Nhanh: Nam Thần, Bùng Cháy Đi!"
            width={400}
            height={600}
            className="object-cover rounded-t-lg lg:rounded-none lg:rounded-l-lg"
          />
        </div>
        <div className="lg:w-2/3 w-full p-6">
          <h3 className="text-2xl font-semibold mb-2 text-center">Tự Cẩm</h3>
          <Separator className="my-2" />
          <div className="text-center mb-4">
            <span className="text-gray-600 dark:text-gray-300">Đánh giá: </span>
            <span className="text-yellow-500 font-bold">8.1/10</span>
            <span className="text-gray-600 dark:text-gray-300"> từ 2761 lượt</span>
          </div>
          <div className={`mb-4 text-gray-800 dark:text-gray-200`}>
            <p>
              Thể loại: Trùng sinh, ngôn tình, cổ đại, HE, tình cảm, cung đình hầu tước. <br />
              Tác giả: Đông Thiên Đích Liễu Diệp<br />
              Thể loại: Ngôn Tình, Trọng Sinh, Cổ Đại<br />
              Nguồn: Wattpad.com/user/khuynhvu1892<br />
              Trạng thái: Full
            </p>
            <p className={`mt-4 ${isDescriptionExpanded ? '' : 'line-clamp-3'}`}>
              Tóm tắt:
              Trong kinh thành mọi người đều đồn đại rằng ở trong Khương gia thì Tử tiểu thư nổi tiếng là một đại tuyệt sắc mỹ nhân. Nhưng đáng tiếc là đáng tiếc lúc nàng xinh đẹp nhất lại bị phủ An quốc công chọn trúng.
              Không chỉ vậy mà đêm trước khi Khương Tự xuất giá, vị hôn phu cùng nữ nhân khác nhảy sông tự tử
              Không chỉ vậy mà đêm trước khi Khương Tự xuất giá, vị hôn phu cùng nữ nhân khác nhảy sông tự tử
              Không chỉ vậy mà đêm trước khi Khương Tự xuất giá, vị hôn phu cùng nữ nhân khác nhảy sông tự tử
              Không chỉ vậy mà đêm trước khi Khương Tự xuất giá, vị hôn phu cùng nữ nhân khác nhảy sông tự tử...
            </p>
            <button
              className="text-blue-500 dark:text-blue-300"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              {isDescriptionExpanded ? 'Thu gọn' : 'Xem thêm'}
            </button>
          </div>
          <div className="mt-4 flex justify-start gap-2">
            <Button variant="default">Đọc từ đầu</Button>
            <Button variant="default">Đọc chương mới nhất</Button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Danh Sách Chương</h2>
        <ul className="columns-1 sm:columns-2 gap-x-8 space-y-2">
          {renderChapters()}
        </ul>
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default StoryDetail;

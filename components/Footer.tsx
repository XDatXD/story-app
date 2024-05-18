import React from 'react';
import { Button } from './ui/button';

const listItems = [
  { label: "Truyện mới cập nhật", link: "/list/new" },
  { label: "Truyện Hot", link: "/list/hot" },
  { label: "Truyện Full", link: "/list/full" },
  { label: "Tiên Hiệp Hay", link: "/list/tien-hiep-hay" },
  { label: "Kiếm Hiệp Hay", link: "/list/kiem-hiep-hay" },
  { label: "Truyện Teen Hay", link: "/list/teen-hay" },
  { label: "Ngôn Tình Hay", link: "/list/ngon-tinh-hay" },
  { label: "Ngôn Tình Ngược", link: "/list/ngon-tinh-nguoc" },
  { label: "Ngôn Tình Sủng", link: "/list/ngon-tinh-sung" },
  { label: "Ngôn Tình Hài", link: "/list/ngon-tinh-hai" },
  { label: "Đam Mỹ Hài", link: "/list/dam-my-hai" },
  { label: "Đam Mỹ Hay", link: "/list/dam-my-hay" },
  { label: "Đam Mỹ H Văn", link: "/list/dam-my-h-van" },
  { label: "Đam Mỹ Sắc", link: "/list/dam-my-sac" },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-[#333333] py-4 mt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="w-full md:w-2/5 text-left sm:text-center md:text-left">
            <p className="text-gray-600 dark:text-gray-300">
              &copy; {new Date().getFullYear()} Group19. All rights reserved.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Trang web này dành cho các truyện yêu thích của bạn. Liên hệ: contact@group19.com
            </p>
          </div>
          <div className="w-full md:w-3/5 mt-4 md:mt-0 flex flex-wrap justify-center gap-2 sm:hidden md:flex">
            {listItems.map((item) => (
              <Button
                key={item.label}
                variant="outline"
                className="text-sm"
                asChild
              >
                <a href={item.link}>{item.label}</a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

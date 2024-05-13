// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-4 mt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-600 dark:text-gray-300">
          &copy; {new Date().getFullYear()} Group19. All rights reserved.
        </p>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Trang web này dành cho các truyện yêu thích của bạn. Liên hệ: contact@group19.com
        </p>
      </div>
    </footer>
  );
};

export default Footer;

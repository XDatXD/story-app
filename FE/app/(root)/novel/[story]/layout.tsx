import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      <Navbar />

      {children}
      <Footer />
    </div>

  );
};

export default PublicLayout;

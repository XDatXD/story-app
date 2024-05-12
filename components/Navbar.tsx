"use client";

import React, { useState } from "react";
import Logo, { LogoMobile } from "@/components/Logo";
import { ThemeSwitcherBtn } from "@/components/ThemeSwitcherBtn";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import { Menu, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "@/components/SearchBar";

const items = [
  {
    label: "Danh sách",
    subItems: [
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
    ],
  },
  {
    label: "Thể loại",
    subItems: [
      { label: "Truyện mới cập nhật", link: "/category/new" },
      { label: "Truyện Hot", link: "/category/hot" },
      { label: "Truyện Full", link: "/category/full" },
      { label: "Tiên Hiệp Hay", link: "/category/tien-hiep-hay" },
      { label: "Kiếm Hiệp Hay", link: "/category/kiem-hiep-hay" },
      { label: "Truyện Teen Hay", link: "/category/teen-hay" },
      { label: "Ngôn Tình Hay", link: "/category/ngon-tinh-hay" },
      { label: "Ngôn Tình Ngược", link: "/category/ngon-tinh-nguoc" },
      { label: "Ngôn Tình Sủng", link: "/category/ngon-tinh-sung" },
      { label: "Ngôn Tình Hài", link: "/category/ngon-tinh-hai" },
      { label: "Đam Mỹ Hài", link: "/category/dam-my-hai" },
      { label: "Đam Mỹ Hay", link: "/category/dam-my-hay" },
      { label: "Đam Mỹ H Văn", link: "/category/dam-my-h-van" },
      { label: "Đam Mỹ Sắc", link: "/category/dam-my-sac" },
    ],
  },
  {
    label: "Phân loại",
    subItems: [
      { label: "Dưới 100 chương", link: "/classify/duoi-100-chuong" },
      { label: "100 - 500 chương", link: "/classify/100-500-chuong" },
      { label: "500 - 1000 chương", link: "/classify/500-1000-chuong" },
      { label: "Trên 1000 chương", link: "/classify/tren-1000-chuong" },
    ],
  },
];

function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
}

function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]" side="left">
            <Logo />
            <Separator />
            <SearchBar />
            <div className="flex flex-col gap-1 pt-4">
              {items.map((item) =>
                item.subItems ? (
                  <AccordionItem key={item.label} item={item} />
                ) : (
                  <NavbarItem key={item.label} link={item.link!} label={item.label} />
                )
              )}
            </div>
            <div className="mt-4"></div>
          </SheetContent>
        </Sheet>
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <LogoMobile />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn />
        </div>
      </nav>
    </div>
  );
}

function DesktopNavbar() {
  return (
    <div className="hidden border-separate border-b bg-background md:block">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <Logo />
          <div className="flex h-full items-center space-x-6">
            {items.map((item) =>
              item.subItems ? (
                <DropdownItem key={item.label} item={item} />
              ) : (
                <NavbarItem key={item.label} link={item.link!} label={item.label} />
              )
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <SearchBar />
          <ThemeSwitcherBtn />
        </div>
      </nav>
    </div>
  );
}

type NavbarItemProps = {
  link: string;
  label: string;
  clickCallback?: () => void;
  hasSubItems?: boolean;
};

function NavbarItem({ link, label, clickCallback, hasSubItems }: NavbarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <div className="relative flex items-center">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
          isActive && "text-foreground"
        )}
        onClick={() => {
          if (clickCallback) clickCallback();
        }}
      >
        {label}
        {hasSubItems && <ChevronDown className="ml-auto" />}
      </Link>
      {isActive && (
        <div className="absolute bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-foreground md:block" />
      )}
    </div>
  );
}

type DropdownItemProps = {
  item: {
    label: string;
    subItems: { label: string; link: string }[];
  };
};

function DropdownItem({ item }: DropdownItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group relative">
      <Button
        className=
          "flex items-center space-x-2 text-lg text-muted-foreground hover:text-foreground"
        onClick={() => setIsExpanded(!isExpanded)}
        variant="outline"
      >
        <span>{item.label}</span>
      </Button>
      <div
        className={cn(
          "absolute left-0 top-full z-10 hidden w-56 flex-col rounded-md bg-background shadow-md group-hover:flex",
          isExpanded && "flex"
        )}
      >
        {item.subItems.map((subItem) => (
          <Link
            key={subItem.label}
            href={subItem.link}
            className="px-4 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {subItem.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

type AccordionItemProps = {
  item: {
    label: string;
    subItems: { label: string; link: string }[];
  };
};

function AccordionItem({ item }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="flex w-full justify-between py-2 text-left text-lg text-muted-foreground hover:text-foreground"
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.label}
        <ChevronDown className={cn("transition-transform", { "rotate-180": isOpen })} />
      </button>
      {isOpen && (
        <div className="pl-4">
          {item.subItems.map((subItem) => (
            <Link
              key={subItem.label}
              href={subItem.link}
              className="block py-2 text-muted-foreground hover:text-foreground"
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;

"use client";

import React, { useState } from "react";
import Logo, { LogoMobile } from "@/components/Logo";
import { ThemeSwitcherBtn } from "@/components/ThemeSwitcherBtn";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Menu, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { fetchAllGenre } from "@/api/fetchAllGenre";

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
    const { data } = useQuery({
        queryKey: ["genres"],
        queryFn: fetchAllGenre,
    });

    return (
        <div className="block border-separate bg-background md:hidden">
            <nav className="container flex items-center justify-between px-8">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant={"ghost"} size={"icon"}>
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        className="w-[400px] sm:w-[540px]"
                        side="left"
                    >
                        <Logo />
                        <Separator />
                        <SearchBar />
                        <div className="flex flex-col mt-4 gap-1 pt-4 max-h-[90vh] overflow-y-auto">
                            {" "}
                            {/* Add max height and enable scrolling */}
                            {data?.map((item) =>
                                item.subItems ? (
                                    <AccordionItemComponent
                                        key={item.label}
                                        item={item}
                                    />
                                ) : (
                                    <NavbarItem
                                        key={item.label}
                                        link={item.link!}
                                        label={item.label}
                                    />
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
    const { isPending, isError, error, isSuccess, data } = useQuery({
        queryKey: ["genres"],
        queryFn: fetchAllGenre,
    });

    return (
        <div className="hidden border-separate border-b bg-background md:block">
            <nav className="container flex items-center justify-between px-8">
                <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
                    <Logo />
                    <div className="flex h-full items-center space-x-6">
                        {data?.map((item) =>
                            item.subItems ? (
                                <DropdownMenuItemComponent
                                    key={item.label}
                                    item={item}
                                />
                            ) : (
                                <NavbarItem
                                    key={item.label}
                                    link={item.link!}
                                    label={item.label}
                                />
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

function NavbarItem({
    link,
    label,
    clickCallback,
    hasSubItems,
}: NavbarItemProps) {
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

type DropdownMenuItemProps = {
    item: {
        label: string;
        subItems: { label: string; link: string }[];
    };
};

function DropdownMenuItemComponent({ item }: DropdownMenuItemProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="flex items-center space-x-2 text-lg text-muted-foreground hover:text-foreground"
                    variant="outline"
                >
                    <span>{item.label}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {item.subItems.map((subItem) => (
                    <DropdownMenuItem key={subItem.label} asChild>
                        <Link
                            href={subItem.link}
                            className="px-4 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                            {subItem.label}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

type AccordionItemProps = {
    item: {
        label: string;
        subItems: { label: string; link: string }[];
    };
};

function AccordionItemComponent({ item }: AccordionItemProps) {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value={item.label}>
                <AccordionTrigger>{item.label}</AccordionTrigger>
                <AccordionContent>
                    {item.subItems.map((subItem) => (
                        <NavbarItem
                            key={subItem.label}
                            link={subItem.link}
                            label={subItem.label}
                            clickCallback={() => {}}
                        />
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default Navbar;

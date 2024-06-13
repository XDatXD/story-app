"use client";

import React, { useState } from "react";
import Logo, { LogoMobile } from "@/components/Logo";
import { ThemeSwitcherBtn } from "@/components/ThemeSwitcherBtn";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAllGenre } from "@/api/fetchAllGenre";
import DropdownGenreList from "./DropdownGenreList";
import AccordionGenreList from "./AccordionGenreList";
import { Genre } from "@/schema/Genre";

function Navbar() {
    const { data } = useQuery({
        queryKey: ["genres"],
        queryFn: fetchAllGenre,
        placeholderData: keepPreviousData,
    });
    
    return (
        <>
            <DesktopNavbar items={data} />
            <MobileNavbar items={data} />
        </>
    );
}

function MobileNavbar({ items }: { items?: Genre[] }) {
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
                    <SheetContent
                        className="w-[400px] sm:w-[540px]"
                        side="left"
                    >
                        <Logo />
                        <Separator />
                        <SearchBar />
                        <div className="flex flex-col mt-4 gap-1 pt-4 max-h-[90vh] overflow-y-auto">
                            {" "}
                            <AccordionGenreList items={items} />
                        </div>
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

function DesktopNavbar({ items }: { items?: Genre[] }) {
    return (
        <div className="hidden border-separate border-b bg-background md:block">
            <nav className="container flex items-center justify-between px-8">
                <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
                    <Logo />
                    <div className="flex h-full items-center space-x-6">
                        <DropdownGenreList items={items} />
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

export default Navbar;

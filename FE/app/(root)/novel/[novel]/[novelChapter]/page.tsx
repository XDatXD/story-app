"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import SettingsDialog from "../story/[slug]/component/SettingsDialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchChapterDetail } from "@/api/fetchChapterDetail";
import { getReadingState, saveReadingState } from "@/utils/readingState";
import { getCurrentChapterFromHref } from "@/utils/getCurrentChapterFromHref";
import { nextChapter } from "@/utils/nextChapter";
import ContentChapterSkeleton from "./components/Skeleton";
import { getNovelHrefFromChapterHref } from "@/utils/getNovelHrefFromChapterHref";
import { fetchTotalChapters } from "@/api/fetchTotalChapters";

const StoryRead: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const chapterHref = searchParams?.get("href") || "";
    const novelHref = getNovelHrefFromChapterHref(chapterHref);
    const currentChapter = getCurrentChapterFromHref(chapterHref);

    const { data: totalChapters } = useQuery({
        queryKey: ["totalChapters", novelHref],
        queryFn: () => fetchTotalChapters(novelHref),
        placeholderData: keepPreviousData,
    });
    const { data, isPending } = useQuery({
        queryKey: ["chapter", chapterHref],
        queryFn: () => fetchChapterDetail(chapterHref),
        // placeholderData: keepPreviousData,
    });

    const [backgroundColor, setBackgroundColor] = useState<string>(
        () => localStorage.getItem("backgroundColor") || ""
    ); // Default background color
    const [fontSize, setFontSize] = useState<number>(() =>
        parseInt(localStorage.getItem("fontSize") || "16")
    ); // Default font size
    const [fontFamily, setFontFamily] = useState<string>(
        () => localStorage.getItem("fontFamily") || "Arial"
    ); // Default font family
    const [lineHeight, setLineHeight] = useState<number>(() =>
        parseFloat(localStorage.getItem("lineHeight") || "1.5")
    ); // Default line height
    const [textAlign, setTextAlign] = useState<string>(
        () => localStorage.getItem("textAlign") || "left"
    ); // Default text alignment

    useEffect(() => {
        localStorage.setItem("backgroundColor", backgroundColor);
    }, [backgroundColor]);

    useEffect(() => {
        localStorage.setItem("fontSize", fontSize.toString());
    }, [fontSize]);

    useEffect(() => {
        localStorage.setItem("fontFamily", fontFamily);
    }, [fontFamily]);

    useEffect(() => {
        localStorage.setItem("lineHeight", lineHeight.toString());
    }, [lineHeight]);

    useEffect(() => {
        localStorage.setItem("textAlign", textAlign);
    }, [textAlign]);

    useEffect(() => {
        const handleScroll = () => {
            if (data) {
                const {
                    href,
                    title: chapterTitle,
                    titleNovel: novelTitle,
                } = data;
                const scrollTop = window.scrollY;
                const docHeight =
                    document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                if (href && chapterTitle && novelTitle && scrollPercent) {
                    saveReadingState({
                        href,
                        chapterTitle,
                        novelTitle,
                        position: scrollPercent,
                    });
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });
    useEffect(() => {
        if (data) {
            const { href, title: chapterTitle, titleNovel: novelTitle } = data;
            const state = getReadingState({
                href,
                novelTitle,
                chapterTitle,
            });
            if (state) {
                const docHeight =
                    document.documentElement.scrollHeight - window.innerHeight;
                const scrollPosition = (state.position / 100) * docHeight;
                window.scrollTo({ top: scrollPosition, behavior: "smooth" });
            }
        }
    }, [data]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowLeft":
                    const urlPrev = nextChapter(
                        chapterHref,
                        currentChapter - 1
                    );
                    router.push(pathname + "?" + `href=${urlPrev}`);
                    break;
                case "ArrowRight":
                    const urlNext = nextChapter(
                        chapterHref,
                        currentChapter + 1
                    );
                    router.push(pathname + "?" + `href=${urlNext}`);
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [router, pathname, chapterHref, currentChapter]);

    const handleBackgroundColorChange = (color: string) => {
        setBackgroundColor(color);
    };

    const handleFontSizeChange = (size: number) => {
        setFontSize(size);
    };

    const handleFontFamilyChange = (family: string) => {
        setFontFamily(family);
    };

    const handleChapterChange = (chapter: number) => {
        const url = nextChapter(chapterHref, chapter);
        router.push(pathname + "?" + `href=${url}`);
    };

    const handlePreviousChapter = () => {
        const url = nextChapter(chapterHref, currentChapter - 1);
        router.push(pathname + "?" + `href=${url}`);
    };

    const handleNextChapter = () => {
        const url = nextChapter(chapterHref, currentChapter + 1);
        router.push(pathname + "?" + `href=${url}`);
    };

    const handleLineHeightChange = (height: number) => {
        setLineHeight(height);
    };

    const handleTextAlignChange = (align: string) => {
        setTextAlign(align);
    };

    return isPending ? (
        <ContentChapterSkeleton />
    ) : (
        <div className={`container mx-auto py-8 px-4 dark:text-white`}>
            <SettingsDialog
                onChangeBackgroundColor={handleBackgroundColorChange}
                onChangeFontSize={handleFontSizeChange}
                onChangeFontFamily={handleFontFamilyChange}
                onChangeLineHeight={handleLineHeightChange}
                onChangeTextAlign={handleTextAlignChange}
            />
            <div className="flex justify-between items-end mb-6">
                <Button
                    variant="default"
                    onClick={handlePreviousChapter}
                    disabled={currentChapter === 1}
                >
                    <ChevronLeft size={24} />
                    <p>Chương trước</p>
                </Button>
                <div>
                    <div className="text-center mb-2">
                        <h2 className="text-2xl font-bold mb-2">Đọc truyện</h2>
                        <p>{data?.title}</p>
                    </div>
                    <Select
                        onValueChange={(value) =>
                            handleChapterChange(Number(value))
                        }
                    >
                        <SelectTrigger>Chương {currentChapter}</SelectTrigger>
                        <SelectContent>
                            {Array.from(
                                { length: totalChapters || 100 },
                                (_, i) => i + 1
                            ).map((chapter) => (
                                <SelectItem
                                    key={chapter}
                                    value={chapter.toString()}
                                >
                                    Chương {chapter}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button
                    variant="default"
                    onClick={handleNextChapter}
                    disabled={currentChapter === totalChapters}
                >
                    <p>Chương sau</p>
                    <ChevronRight size={24} />
                </Button>
            </div>
            <div
                className={`p-6 rounded-lg shadow-md ${backgroundColor}`}
                style={{
                    fontSize: `${fontSize}px`,
                    fontFamily: fontFamily,
                    lineHeight: `${lineHeight}`,
                    textAlign: `${textAlign}`,
                }}
            >
                <div className={`text-gray-800 dark:text-gray-200`}>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: data?.content || "",
                        }}
                    />
                </div>
            </div>

            <div className="flex justify-between items-end mt-6">
                <Button
                    variant="default"
                    onClick={handlePreviousChapter}
                    disabled={currentChapter === 1}
                >
                    <ChevronLeft size={24} />
                    <p>Chương trước</p>
                </Button>
                <div>
                    <Select
                        onValueChange={(value) =>
                            handleChapterChange(Number(value))
                        }
                    >
                        <SelectTrigger>Chương {currentChapter}</SelectTrigger>
                        <SelectContent>
                            {Array.from(
                                { length: totalChapters || 100 },
                                (_, i) => i + 1
                            ).map((chapter) => (
                                <SelectItem
                                    key={chapter}
                                    value={chapter.toString()}
                                >
                                    Chương {chapter}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button
                    variant="default"
                    onClick={handleNextChapter}
                    disabled={currentChapter === totalChapters}
                >
                    <p>Chương sau</p>
                    <ChevronRight size={24} />
                </Button>
            </div>
        </div>
    );
};

export default StoryRead;

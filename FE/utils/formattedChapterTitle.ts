export const formattedChapterTitle = (name: string) => {
    const chapterTitle = name?.split(" - ")[1];
    return chapterTitle
};

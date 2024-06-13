export const getCurrentChapterFromHref = (href: string) => {
    const regex = /chuong-\d+/g;
    return Number(href.match(regex)?.[0]?.split("-")[1]) || 1;
};

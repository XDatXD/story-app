export const getNovelHrefFromChapterHref = (url: string) => {
    const regex = /chuong-\d+\/?/g;
    if (url?.match(regex)) {
        return url.replace(regex, "");
    }
    return url;
};

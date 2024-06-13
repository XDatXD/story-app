export const nextChapter = (url: string, chapter: number) => {
    const regex = /chuong-\d+/g;
    if (url?.match(regex)) {
        return url.replace(regex, `chuong-${chapter}`);
    }
    return url;
};

export const availableFormats = ["pdf", "epub", "txt", "doc"];

export const getFormats = () => {
    const formats: string[] = JSON.parse(
        localStorage.getItem("formats") || "[]"
    );
    return formats;
};

export const setFormat = (format: string) => {
    const formatStorage: string[] = JSON.parse(
        localStorage.getItem("formats") || "[]"
    );
    if(!formatStorage.includes(format)) {
        formatStorage.push(format);
        localStorage.setItem("formats", JSON.stringify(formatStorage));
    }
};

export const removeFormat = (format: string) => {
    let formatStorage: string[] = JSON.parse(
        localStorage.getItem("formats") || "[]"
    );
    formatStorage = formatStorage.filter((item) => item !== format);
    localStorage.setItem("formats", JSON.stringify(formatStorage));
};

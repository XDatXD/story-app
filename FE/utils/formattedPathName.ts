export const formattedPathName = (name: string) => {
    return name
        ?.replace(/[^a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]/g, "")
        ?.replace(/ /g, "-")
        ?.toLowerCase();
};

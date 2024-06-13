export const getCurrentPageFromHref = (href: string) => {
    const regex = /trang-\d+/g;
    return Number(href.match(regex)?.[0]?.split("-")[1]) || 1;
};

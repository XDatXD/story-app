export const nextPage = (url: string, page: number) => {
    const regex = /trang-\d+/g;
    if(url?.match(regex)) {
        return url.replace(regex, `trang-${page}`);
    }
    return url?.concat(`trang-${page}`)
}
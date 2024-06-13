import { Author } from "./Author";
import { ContentChapter } from "./ContentChapter";
import { Genre } from "./Genre";
import { Novel } from "./Novel";

export interface NovelDetail extends Novel {
    briefDescription: string;
    author: Author;
    listGenre: Genre[];
    status: string;
    rating: string;
    src: string;
    contentChapterList: ContentChapter[];
    pages: string[];
}

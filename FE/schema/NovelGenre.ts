import { Author } from "./Author";
import { Novel } from "./Novel";

export interface NovelGenre extends Novel {
    author: Author;
}

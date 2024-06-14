import { ChapterDetail } from "@/schema/ChapterDetail";

export interface Exporter {
    export: (novel: ChapterDetail[]) => Promise<void>;
}

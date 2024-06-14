import { saveAs } from "file-saver";
import { ChapterDetail } from "@/schema/ChapterDetail";
import { Exporter } from "./Exporter";

export class TextExporter implements Exporter {
    async export(novel: ChapterDetail[]) {
        const content = novel
            .map((chapter) => `# ${chapter.title}\n\n${chapter.content}`)
            .join("\n\n");
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `${novel[0].titleNovel}.txt`);
    }
}

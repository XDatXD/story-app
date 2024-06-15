import { saveAs } from "file-saver";
import { ChapterDetail } from "@/schema/ChapterDetail";
import { Exporter } from "./Exporter";
import { htmlToText } from "html-to-text";

export class TextExporter implements Exporter {
    async export(novel: ChapterDetail[]) {
        const content = novel
            .map((chapter) => {
                if (chapter.title && chapter.content) {
                    return `# ${chapter.title}\n\n${htmlToText(
                        chapter.content
                    )}`;
                }
                return "";
            })
            .join("\n\n");
        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `${novel[0]?.titleNovel || "Truyện full"}.txt`);
    }
}

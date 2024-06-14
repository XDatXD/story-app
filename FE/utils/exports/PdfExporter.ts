import jsPDF from "jspdf";
import { ChapterDetail } from "@/schema/ChapterDetail";
import { Exporter } from "./Exporter";

export class PdfExporter implements Exporter {
    async export(novel: ChapterDetail[]) {
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text(novel[0].titleNovel, 10, 20);

        doc.setFontSize(12);
        let yOffset = 30;
        novel.forEach((chapter) => {
            const lines = doc.splitTextToSize(chapter.content, 180);
            doc.text(chapter.title, 10, yOffset);
            yOffset += 10;
            doc.text(lines, 10, yOffset);
            yOffset += lines.length * 10 + 10; // Adjust yOffset for next chapter
        });

        doc.save(`${novel[0].titleNovel}.pdf`);
    }
}

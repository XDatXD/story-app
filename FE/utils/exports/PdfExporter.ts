import jsPDF from "jspdf";
import { ChapterDetail } from "@/schema/ChapterDetail";
import { Exporter } from "./Exporter";
import { htmlToText } from "html-to-text";
import { robotoNormal } from "@/public/fonts/roboto";

export class PdfExporter implements Exporter {
    async export(novel: ChapterDetail[]) {
        const doc = new jsPDF();
        const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
        const margin = 10;
        let yOffset = 30;

        doc.addFileToVFS("Roboto-Regular.ttf", robotoNormal);
        doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
        doc.setFont("Roboto");

        doc.setFontSize(20);
        doc.text(novel[0]?.titleNovel || "Truyện full", margin, yOffset);
        yOffset += 20;

        doc.setFontSize(12);

        novel.forEach((chapter) => {
            if(chapter.content && chapter.title) {
                // Add chapter title
                if (yOffset + 10 > pageHeight) {
                    doc.addPage();
                    yOffset = margin;
                }
                doc.text(chapter.title, margin, yOffset);
                yOffset += 10;
    
                // Add chapter content
                const lines = doc.splitTextToSize(htmlToText(chapter.content), 180);
                lines.forEach((line: string) => {
                    if (yOffset + 10 > pageHeight) {
                        doc.addPage();
                        yOffset = margin;
                    }
                    doc.text(line, margin, yOffset);
                    yOffset += 10;
                });
    
                // Space after each chapter
                yOffset += 10;
            }
        });

        doc.save(`${novel[0]?.titleNovel || "Truyện full"}.pdf`);
    }
}

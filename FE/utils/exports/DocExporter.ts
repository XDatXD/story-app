import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { ChapterDetail } from "@/schema/ChapterDetail";
import { Exporter } from "./Exporter";

export class DocExporter implements Exporter {
    async export(novel: ChapterDetail[]) {
        // Create a new Document
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        // Add title of the novel
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: novel[0].titleNovel,
                                    bold: true,
                                    size: 48,
                                }),
                            ],
                            spacing: {
                                after: 400,
                            },
                        }),
                        // Add each chapter's content
                        ...novel
                            .map((chapter) => [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: chapter.title,
                                            bold: true,
                                            size: 32,
                                        }),
                                    ],
                                    spacing: {
                                        after: 200,
                                    },
                                }),
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: chapter.content,
                                            size: 24,
                                        }),
                                    ],
                                    spacing: {
                                        after: 400,
                                    },
                                }),
                            ])
                            .flat(),
                    ],
                },
            ],
        });

        // Generate the DOCX file
        const buffer = await Packer.toBuffer(doc);

        // Save the file
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        saveAs(blob, `${novel[0].titleNovel}.docx`);
    }
}

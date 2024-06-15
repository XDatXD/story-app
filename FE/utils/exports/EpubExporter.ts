import JSZip from "jszip";
import { saveAs } from "file-saver";
import { ChapterDetail } from "@/schema/ChapterDetail";
import { Exporter } from "./Exporter";
import { htmlToText } from "html-to-text";

export class EpubExporter implements Exporter {
    async export(novel: ChapterDetail[]) {
        const zip = new JSZip();
        const novelTitle = novel[0]?.titleNovel || "Truyện full";

        // Create the mimetype file
        zip.file("mimetype", "application/epub+zip");

        // Create the META-INF/container.xml file
        const containerXml = `<?xml version="1.0"?>
        <container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
            <rootfiles>
                <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
            </rootfiles>
        </container>`;
        zip.folder("META-INF")?.file("container.xml", containerXml);

        // Create the OEBPS/content.opf file
        const contentOpf = `<?xml version="1.0" encoding="UTF-8"?>
        <package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="book-id">
            <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
                <dc:title>${novelTitle}</dc:title>
                <dc:language>en</dc:language>
                <dc:identifier id="book-id">urn:uuid:${UUID()}</dc:identifier>
            </metadata>
            <manifest>
                ${novel
                    .map(
                        (chapter, index) =>
                            `<item id="item${index}" href="chapter${index}.xhtml" media-type="application/xhtml+xml"/>`
                    )
                    .join("\n")}
            </manifest>
            <spine>
                ${novel
                    .map((_, index) => `<itemref idref="item${index}"/>`)
                    .join("\n")}
            </spine>
        </package>`;
        zip.folder("OEBPS")?.file("content.opf", contentOpf);

        // Create the OEBPS/toc.ncx file
        const tocNcx = `<?xml version="1.0" encoding="UTF-8"?>
        <ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
            <head>
                <meta name="dtb:uid" content="urn:uuid:${UUID()}"/>
            </head>
            <docTitle>
                <text>${novelTitle}</text>
            </docTitle>
            <navMap>
                ${novel
                    .map(
                        (
                            chapter,
                            index
                        ) => `<navPoint id="navPoint-${index}" playOrder="${
                            index + 1
                        }">
                    <navLabel><text>${chapter.title}</text></navLabel>
                    <content src="chapter${index}.xhtml"/>
                </navPoint>`
                    )
                    .join("\n")}
            </navMap>
        </ncx>`;
        zip.folder("OEBPS")?.file("toc.ncx", tocNcx);

        // Create each chapter file
        novel.forEach((chapter, index) => {
            if(chapter.title && chapter.content) {
                const chapterContent = `<?xml version="1.0" encoding="UTF-8"?>
                <html xmlns="http://www.w3.org/1999/xhtml">
                    <head>
                        <title>${chapter.title}</title>
                    </head>
                    <body>
                        <h1>${chapter.title}</h1>
                        <p>${htmlToText(chapter.content)}</p>
                    </body>
                </html>`;
                zip.folder("OEBPS")?.file(`chapter${index}.xhtml`, chapterContent);
            }
        });

        // Generate the zip file and save it as an EPUB
        zip.generateAsync({ type: "blob" })
            .then((blob) => {
                saveAs(blob, `${novelTitle}.epub`);
            })
            .catch((err) => {
                console.error("Failed to generate EPUB file:", err);
            });
    }
}

// Helper function to generate a UUID
function UUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            const r = (Math.random() * 16) | 0,
                v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        }
    );
}

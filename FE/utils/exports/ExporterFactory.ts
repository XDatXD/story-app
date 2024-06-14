import { DocExporter } from "./DocExporter";
import { EpubExporter } from "./EpubExporter";
import { Exporter } from "./Exporter";
import { PdfExporter } from "./PdfExporter";
import { TextExporter } from "./TextExporter";

export class ExporterFactory {
    public getExporter(type: string): Exporter {
        switch (type) {
            case "pdf":
                return new PdfExporter();
            case "epub":
                return new EpubExporter();
            case "txt":
                return new TextExporter();
            case "doc":
                return new DocExporter();
            default:
                return new PdfExporter();
        }
    }
}

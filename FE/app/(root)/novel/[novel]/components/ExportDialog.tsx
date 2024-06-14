import React, { useState } from "react";
import { getFormats } from "@/utils/formatExporter";
import { DownloadIcon, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { fetchAllContentChapter } from "@/api/fetchAllContentChapter";
import { ExporterFactory } from "@/utils/exports/ExporterFactory";
import { Exporter } from "@/utils/exports/Exporter";
import { ChapterDetail } from "@/schema/ChapterDetail";

const test: ChapterDetail[] = [
    {
        content: "Lorem Ipsum is Lorem Ipsum is aute iri elementum",
        href: "https://truyenfull.vn",
        title: "Test Novel - Chương 1",
        titleNovel: "Test Novel",
    },
    {
        content:
            "Lorem Ipsum is Lorem Ipsum is aute iri elementum is a Lore mollis",
        href: "https://truyenfull.vn",
        title: "Test Novel - Chương 2",
        titleNovel: "Test Novel",
    },
    {
        content:
            "Lorem Ipsum is Lorem Ipsum is aute iri elementum is a Lore mollis",
        href: "https://truyenfull.vn",
        title: "Test Novel - Chương 3",
        titleNovel: "Test Novel",
    },
    {
        content:
            "Lorem Ipsum is Lorem Ipsum is aute iri elementum is a Lore mollis",
        href: "https://truyenfull.vn",
        title: "Test Novel - Chương 4",
        titleNovel: "Test Novel",
    },
    {
        content:
            "Lorem Ipsum is Lorem Ipsum is aute iri elementum is a Lore mollis",
        href: "https://truyenfull.vn",
        title: "Test Novel - Chương 5",
        titleNovel: "Test Novel",
    },
];

const formats = getFormats();

const ExportDialog: React.FC<{ novelHref?: string }> = ({ novelHref }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFormat, setSelectedFormat] = useState<string>(formats[0]);

    async function handleExport() {
        setIsLoading(true);
        const novelChapterDetail = await fetchAllContentChapter(novelHref || "");
        const exporterFactory = new ExporterFactory();
        const exporter: Exporter = exporterFactory.getExporter(selectedFormat);
        // await exporter.export(test);
        await exporter.export(novelChapterDetail);
        setIsLoading(false);
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="flex items-center space-x-2 text-lg text-muted-foreground hover:text-foreground"
                    variant="outline"
                >
                    <DownloadIcon size={24} />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[80%] md:max-w-[50%]">
                <DialogHeader>
                    <DialogTitle>Chọn định dạng xuất</DialogTitle>
                </DialogHeader>
                <RadioGroup
                    value={selectedFormat}
                    onValueChange={(value) => setSelectedFormat(value)}
                >
                    {formats.map((format) => (
                        <div
                            key={format}
                            className="flex items-center space-x-2"
                        >
                            <RadioGroupItem value={format} id={format} />
                            <Label htmlFor={format}>
                                {format.toUpperCase()}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
                <Button type="button" onClick={handleExport}>
                    Export{" "}
                    {isLoading ? (
                        <Loader2 className="animate-spin ml-2" />
                    ) : null}
                </Button>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ExportDialog;

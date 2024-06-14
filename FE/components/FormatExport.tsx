import {
    availableFormats,
    getFormats,
    setFormat,
    removeFormat,
} from "@/utils/formatExporter";
import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import FormatExportItem from "./FormatExportItem";

const FormatExport = () => {
    const [supportedFormats, setSupportedFormats] = useState(() =>
        getFormats()
    );
    const [selectedFormats, setSelectedFormats] = useState<string[]>([]);

    const handleCheckboxChange = (format: string) => {
        setSelectedFormats((prevSelectedFormats) =>
            prevSelectedFormats.includes(format)
                ? prevSelectedFormats.filter((item) => item !== format)
                : [...prevSelectedFormats, format]
        );
    };
    function handleSaveFormat() {
        for (const format of selectedFormats) {
            setFormat(format);
        }
        setSupportedFormats(getFormats());
        setSelectedFormats([]);
    }
    function handleRemoveFormat(format: string) {
        removeFormat(format);
        setSupportedFormats(getFormats());
    }

    return (
        <div className="p-4">
            <div>
                <p>Các định dạng hệ thống hỗ trợ:</p>
                <table className="p-2 font-semibold">
                    <tbody>
                        {supportedFormats.map((format) => (
                            <FormatExportItem
                                key={format}
                                item={format}
                                onRemoveFormat={handleRemoveFormat}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-2">
                <p>Chọn định dạng:</p>
                <ul className="p-2">
                    {availableFormats.map((format) => (
                        <div
                            key={format}
                            className="flex items-center space-x-2 mb-2"
                        >
                            <Checkbox
                                id={format}
                                checked={selectedFormats.includes(format)}
                                onClick={() => handleCheckboxChange(format)}
                            />
                            <label
                                htmlFor={format}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {format.toUpperCase()}
                            </label>
                        </div>
                    ))}
                    <Button size={"sm"} onClick={handleSaveFormat}>
                        Lưu
                    </Button>
                </ul>
            </div>
        </div>
    );
};

export default FormatExport;

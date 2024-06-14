import React from "react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import FormatExport from "./FormatExport";

const DialogSetting = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <p className="text-blue-900 cursor-pointer dark:text-white hover:underline text-sm font-medium w-fit">
                    Cài đặt
                </p>
            </DialogTrigger>
            <DialogContent className="max-w-[80%] md:max-w-[50%] max-h-[60%] overflow-y-hidden">
                <div className="h-[40vh] overflow-y-scroll">
                    <FormatExport />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogSetting;

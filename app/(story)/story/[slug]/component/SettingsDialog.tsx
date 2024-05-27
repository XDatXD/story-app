"use client"

import { useState } from "react";
import { Settings, ChevronDown, ChevronUp } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";

interface SettingsDialogProps {
    onChangeBackgroundColor: (color: string) => void;
    onChangeTextColor: (color: string) => void;
    onChangeFontSize: (size: number) => void;
    onChangeFontFamily: (family: string) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ onChangeBackgroundColor, onChangeTextColor, onChangeFontSize, onChangeFontFamily }) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [fontSize, setFontSize] = useState<number>(16); // Default font size
    const [fontFamily, setFontFamily] = useState<string>('Arial'); // Default font family

    const handleBackgroundColorChange = (color: string) => {
        onChangeBackgroundColor(color);
        setIsDialogOpen(false); // Close the dialog after selecting a color
    };

    const handleTextColorChange = (color: string) => {
        onChangeTextColor(color);
        setIsDialogOpen(false); // Close the dialog after selecting a color
    };

    const handleFontSizeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const size = parseInt(event.target.value);
        setFontSize(size);
        onChangeFontSize(size);
    };

    // Hàm xử lý tăng giảm cỡ chữ khi nhấn nút chevron
    const handleFontSizeIncrement = () => {
        const newSize = fontSize + 2;
        setFontSize(newSize);
        onChangeFontSize(newSize);
    };

    const handleFontSizeDecrement = () => {
        const newSize = fontSize - 2;
        setFontSize(newSize);
        onChangeFontSize(newSize);
    };

    const handleFontSizeChange = (size: number) => {
        setFontSize(size);
        onChangeFontSize(size);
    };

    const handleFontFamilyChange = (family: string) => {
        setFontFamily(family);
        onChangeFontFamily(family);
    };

    return (
        <div>
            <Button className="fixed top-1/2 left-4 z-10 bg-black text-white hover:bg-[#333333] p-2 shadow-md" variant="default" onClick={() => setIsDialogOpen(true)}>
                <Settings className="w-6 h-6 mr-1" />
                Tùy chỉnh
            </Button>
            {/* Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger />

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tùy chỉnh</DialogTitle>
                        <DialogClose />
                    </DialogHeader>

                    {/* Nội dung tùy chỉnh ở đây */}
                    <DialogDescription>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <h3 className="mb-2">Chọn màu nền:</h3>
                                <div className="flex space-x-2">
                                    <Button onClick={() => handleBackgroundColorChange('bg-white')}>White</Button>
                                    <Button className="bg-gray-400 hover:bg-gray-500" onClick={() => handleBackgroundColorChange('bg-gray-800')}>Gray</Button>
                                    <Button className="bg-blue-400 hover:bg-blue-500" onClick={() => handleBackgroundColorChange('bg-blue-500')}>Blue</Button>
                                    <Button className="bg-green-400 hover:bg-green-500" onClick={() => handleBackgroundColorChange('bg-green-500')}>Green</Button>
                                    <Button className="bg-red-400 hover:bg-red-500" onClick={() => handleBackgroundColorChange('bg-red-500')}>Red</Button>
                                    <Button className="bg-yellow-400 hover:bg-yellow-500" onClick={() => handleBackgroundColorChange('bg-yellow-500')}>Yellow</Button>
                                </div>
                            </div>
                            <div>
                                <h3 className="mb-2">Chọn màu chữ:</h3>
                                <div className="flex space-x-2">
                                    <Button onClick={() => handleTextColorChange('text-white')}>White</Button>
                                    <Button className="bg-gray-400 hover:bg-gray-500" onClick={() => handleTextColorChange('text-gray-800')}>Gray</Button>
                                    <Button className="bg-blue-400 hover:bg-blue-500" onClick={() => handleTextColorChange('text-blue-500')}>Blue</Button>
                                    <Button className="bg-green-400 hover:bg-green-500" onClick={() => handleTextColorChange('text-green-500')}>Green</Button>
                                    <Button className="bg-red-400 hover:bg-red-500" onClick={() => handleTextColorChange('text-red-500')}>Red</Button>
                                    <Button className="bg-yellow-400 hover:bg-yellow-500" onClick={() => handleTextColorChange('text-yellow-500')}>Yellow</Button>
                                </div>
                            </div>
                            <div>
                                <h3 className="mb-2">Chỉnh kích thước phông chữ:</h3>
                                <Slider
                                    value={[fontSize]}
                                    min={10}
                                    max={50}
                                    step={1}
                                    onValueChange={(value) => handleFontSizeChange(value[0])}
                                    className="mb-2"
                                />
                                <p>Font size: {fontSize}px</p>

                                <div className="flex items-center mt-2 gap-2">
                                    <Button onClick={handleFontSizeDecrement}><ChevronDown size={16} /></Button>
                                    {/* Ô input để nhập giá trị */}
                                    <Input
                                        type="text"
                                        value={fontSize}
                                        onChange={handleFontSizeInputChange}
                                        className="w-16 text-center border rounded-md py-1 px-2"
                                        min={10}
                                        max={50}
                                    />
                                    {/* Nút tăng giảm cỡ chữ */}
                                    <Button onClick={handleFontSizeIncrement}><ChevronUp size={16} /></Button>
                                </div>
                            </div>
                            <div>
                                <h3 className="mb-2">Chọn kiểu font chữ:</h3>
                                <Select onValueChange={handleFontFamilyChange} defaultValue={fontFamily}>
                                    <SelectTrigger>{fontFamily}</SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Arial">Arial</SelectItem>
                                        <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                                        <SelectItem value="Roboto">Roboto</SelectItem>
                                        <SelectItem value="Calibri">Calibri</SelectItem>
                                        <SelectItem value="Georgia">Georgia</SelectItem>
                                        <SelectItem value="Verdana">Verdana</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SettingsDialog;

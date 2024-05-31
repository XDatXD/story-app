"use client"

import { useState } from "react";
import { Settings, ChevronDown, ChevronUp, AlignCenter, AlignLeft, AlignRight, AlignJustify } from 'lucide-react';
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
    onChangeFontSize: (size: number) => void;
    onChangeFontFamily: (family: string) => void;
    onChangeLineHeight: (height: number) => void;
    onChangeTextAlign: (textAlign: string) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ onChangeBackgroundColor, onChangeFontSize, onChangeFontFamily, onChangeLineHeight, onChangeTextAlign }) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [fontSize, setFontSize] = useState<number>(16); // Default font size
    const [fontFamily, setFontFamily] = useState<string>('Arial'); // Default font family
    const [tempFontSize, setTempFontSize] = useState<number | string>(16); // Temporary font size for input
    const [lineHeight, setLineHeight] = useState<number>(1.5); // Default line height
    const [tempLineHeight, setTempLineHeight] = useState<number | string>(1.5); // Temporary line height for input
    const [textAlign, setTextAlign] = useState<string>('left'); // Default text alignment
    const [activeBgColor, setActiveBgColor] = useState<string>('bg-white'); // Default background color

    const MIN_FONT_SIZE = 10;
    const MAX_FONT_SIZE = 50;
    const MIN_LINE_HEIGHT = 0.5;
    const MAX_LINE_HEIGHT = 4;

    const handleBackgroundColorChange = (color: string) => {
        setActiveBgColor(color);
        onChangeBackgroundColor(color);
    };

    const handleFontSizeInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTempFontSize(value);
    };

    const handleFontSizeInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            let newSize = parseInt(tempFontSize as string);
            if (isNaN(newSize) || newSize === 0) {
                newSize = MIN_FONT_SIZE;
            }
            if (newSize < MIN_FONT_SIZE) newSize = MIN_FONT_SIZE;
            if (newSize > MAX_FONT_SIZE) newSize = MAX_FONT_SIZE;
            setFontSize(newSize);
            setTempFontSize(newSize);
            onChangeFontSize(newSize);
        }
    };

    const handleFontSizeIncrement = () => {
        if (fontSize < MAX_FONT_SIZE) {
            const newSize = fontSize + 2;
            setFontSize(newSize);
            setTempFontSize(newSize);
            onChangeFontSize(newSize);
        }
    };

    const handleFontSizeDecrement = () => {
        if (fontSize > MIN_FONT_SIZE) {
            const newSize = fontSize - 2;
            setFontSize(newSize);
            setTempFontSize(newSize);
            onChangeFontSize(newSize);
        }
    };

    const handleFontSizeChange = (size: number) => {
        setFontSize(size);
        setTempFontSize(size);
        onChangeFontSize(size);
    };

    const handleFontFamilyChange = (family: string) => {
        setFontFamily(family);
        onChangeFontFamily(family);
    };

    const handleLineHeightChange = (height: number) => {
        setLineHeight(height);
        setTempLineHeight(height);
        onChangeLineHeight(height);
    };

    const handleLineHeightInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTempLineHeight(value);
    };

    const handleLineHeightInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            let newHeight = parseFloat(tempLineHeight as string);
            if (isNaN(newHeight) || newHeight === 0) {
                newHeight = MIN_LINE_HEIGHT;
            }
            if (newHeight < MIN_LINE_HEIGHT) newHeight = MIN_LINE_HEIGHT;
            if (newHeight > MAX_LINE_HEIGHT) newHeight = MAX_LINE_HEIGHT;
            setLineHeight(newHeight);
            setTempLineHeight(newHeight);
            onChangeLineHeight(newHeight);
        }
    };

    const handleLineHeightIncrement = () => {
        if (lineHeight < MAX_LINE_HEIGHT) {
            const newHeight = Math.round((lineHeight + 0.1) * 10) / 10;
            setLineHeight(newHeight);
            setTempLineHeight(newHeight);
            onChangeLineHeight(newHeight);
        }
    };

    const handleLineHeightDecrement = () => {
        if (lineHeight > MIN_LINE_HEIGHT) {
            const newHeight = Math.round((lineHeight - 0.1) * 10) / 10;
            setLineHeight(newHeight);
            setTempLineHeight(newHeight);
            onChangeLineHeight(newHeight);
        }
    };

    const handleTextAlignChange = (align: string) => {
        setTextAlign(align);
        onChangeTextAlign(align);
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
                                    <Button className={`bg-white ${activeBgColor === 'bg-white' ? 'ring-2 ring-blue-500' : ''}`} onClick={() => handleBackgroundColorChange('bg-white')}>White</Button>
                                    <Button className={`bg-gray-400 hover:bg-gray-500 ${activeBgColor === 'bg-gray-800' ? 'ring-2 ring-blue-500' : ''}`} onClick={() => handleBackgroundColorChange('bg-gray-800')}>Gray</Button>
                                    <Button className={`bg-blue-400 hover:bg-blue-500 ${activeBgColor === 'bg-blue-500' ? 'ring-2 ring-blue-500' : ''}`} onClick={() => handleBackgroundColorChange('bg-blue-500')}>Blue</Button>
                                    <Button className={`bg-green-400 hover:bg-green-500 ${activeBgColor === 'bg-green-500' ? 'ring-2 ring-blue-500' : ''}`} onClick={() => handleBackgroundColorChange('bg-green-500')}>Green</Button>
                                    <Button className={`bg-red-400 hover:bg-red-500 ${activeBgColor === 'bg-red-500' ? 'ring-2 ring-blue-500' : ''}`} onClick={() => handleBackgroundColorChange('bg-red-500')}>Red</Button>
                                    <Button className={`bg-yellow-400 hover:bg-yellow-500 ${activeBgColor === 'bg-yellow-500' ? 'ring-2 ring-blue-500' : ''}`} onClick={() => handleBackgroundColorChange('bg-yellow-500')}>Yellow</Button>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="mb-2">Chỉnh cỡ chữ:</h3>
                                <Slider
                                    value={[fontSize]}
                                    min={MIN_FONT_SIZE}
                                    max={MAX_FONT_SIZE}
                                    onValueChange={(value) => handleFontSizeChange(value[0])}
                                    className="mb-2"
                                />
                                <p>Font size: {fontSize}px</p>

                                <div className="flex items-center mt-2 gap-2">
                                    <Button onClick={handleFontSizeDecrement} disabled={fontSize <= MIN_FONT_SIZE}><ChevronDown size={16} /></Button>
                                    <Input
                                        type="number"
                                        value={tempFontSize}
                                        onChange={handleFontSizeInputChange}
                                        onKeyPress={handleFontSizeInputKeyPress}
                                        className="w-16 text-center border rounded-md py-1 px-2"
                                        min={MIN_FONT_SIZE}
                                        max={MAX_FONT_SIZE}
                                    />
                                    <Button onClick={handleFontSizeIncrement} disabled={fontSize >= MAX_FONT_SIZE}><ChevronUp size={16} /></Button>
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

                            <div>
                                <h3 className="mb-2">Chỉnh khoảng cách dòng:</h3>
                                <Slider
                                    className="mb-2"
                                    value={[lineHeight]}
                                    min={MIN_LINE_HEIGHT}
                                    max={MAX_LINE_HEIGHT}
                                    step={0.1}
                                    onValueChange={(value) => handleLineHeightChange(value[0])}
                                />
                                <p className="mb-2">Line height: {lineHeight}</p>
                                <div className="flex items-center space-x-2">
                                    <Button onClick={handleLineHeightDecrement} disabled={lineHeight <= MIN_LINE_HEIGHT}><ChevronDown size={16} /></Button>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        value={tempLineHeight}
                                        onChange={handleLineHeightInputChange}
                                        onKeyPress={handleLineHeightInputKeyPress}
                                        className="w-16 text-center border rounded-md py-1 px-2"
                                        min={MIN_LINE_HEIGHT}
                                        max={MAX_LINE_HEIGHT}
                                    />
                                    <Button onClick={handleLineHeightIncrement} disabled={lineHeight >= MAX_LINE_HEIGHT}><ChevronUp size={16} /></Button>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-2">Chọn căn chỉnh văn bản:</h3>
                                <div className="flex items-center space-x-4">
                                    <Button className={`${textAlign === 'left' ? 'bg-blue-500 text-white' : ''}`} onClick={() => handleTextAlignChange('left')}><AlignLeft size={16} /></Button>
                                    <Button className={`${textAlign === 'center' ? 'bg-blue-500 text-white' : ''}`} onClick={() => handleTextAlignChange('center')}><AlignCenter size={16} /></Button>
                                    <Button className={`${textAlign === 'right' ? 'bg-blue-500 text-white' : ''}`} onClick={() => handleTextAlignChange('right')}><AlignRight size={16} /></Button>
                                    <Button className={`${textAlign === 'justify' ? 'bg-blue-500 text-white' : ''}`} onClick={() => handleTextAlignChange('justify')}><AlignJustify size={16} /></Button>
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default SettingsDialog;

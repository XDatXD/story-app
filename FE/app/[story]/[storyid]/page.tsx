"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import SettingsDialog from '../story/[slug]/component/SettingsDialog';

export const chapters: { [key: string]: string } = {
    "1": "Hẻm nhỏ Ma Cô thuộc Đông thành mặc dù nằm trong một khu vực hỗn tạp, nhưng lại là nơi tam giáo cửu lưu đều có phần kính sợ. Nơi đó là nơi ở của một vị tiên cô nổi tiếng gần xa, nghe nói có thể thông quỷ thần, ngay cả các hộ nhà cao cửa rộng gặp phải chuyện khó giải quyết đều sẽ lặng lẽ mời đến làm phép. Một thiếu niên mặt mày thanh tú tò mò đánh giá mọi thứ quanh mình. Phòng ốc thấp bé cũ nát, góc tường chất đầy đồ lộn xộn, trên mặt đất chảy đầy nước bẩn, còn có khi thỉnh thoảng truyền đến tiếng trẻ con khóc rống vui cười, tất cả mọi thứ đều khiến thiếu niên cảm thấy mới lạ. Phần mới lạ này được che dấu dưới sự cẩn thận. Những tên nhàn tản ngồi dưới chân tường buồn bực ngán ngẩm hướng tầm mắt nhìn về phía thiếu niên, khiến hắn không thể không trở nên cẩn thận. Đây là nơi hắn chưa tới bao giờ, càng là phong cảnh hắn chưa từng thấy qua. Thế nhưng khi đi đến một ngã ba, thiếu niên vẫn phải dừng bước chân. Một người trẻ tuổi tóc cắt ngắn, dưới ánh mắt tràn ngập địch ý của những người quanh mình, chặn đường thiếu niên lại. “Ca ca, tới đây chơi đùa một chút được không?” Thiếu niên giương mắt nhìn người trẻ tuổi, chắp tay nói: “ Vị ca ca này, tại hạ có việc gấp cần phải đi làm, không thể ở lại chơi đùa với ca ca.”",
    "2": "Thế giới Trung Thổ không thiếu cái lạ. Chính giữa trời đất, có một học giả từng dùng một kiếm bổ ra thác nước sông ngân, là chuyện đắc ý nhất trong nhân gian. Bên bờ biển đông, có một đạo nhân vô danh không muốn phi thăng ngồi bất động trên đỉnh núi, chỉ nguyện gió mát thổi vào mặt. Tây Phương cực lạc, có một hòa thượng già thích mời người khác uống canh gà, kể cố sự cho người ta nghe, nuôi dưỡng chín con rồng trời. Nam Cương hoang vu, có một họa sĩ mắt mù điều khiển con rối giáp vàng cao như núi, di chuyển mười vạn núi lớn, trải ra một bức tranh gấm vóc. Một thiếu niên bần hàn lớn lên ở phương bắc, một ngày kia hắn nhìn thấy trên đầu có hàng ngàn hàng vạn tiên nhân ngự kiếm, giống như bầy châu chấu bay qua. Hắn muốn đi tận mắt xem thử vị học giả mà tiên sinh kể chuyện kia đã nói, nước lớn ngập trời ở biển đông, cát vàng vạn dặm ở Tây Phương và núi lớn nguy nga ở Nam Hoang. Thế là cuối cùng có một ngày, thiếu niên xách theo kiếm gỗ bắt đầu xuôi nam. Hãy nhấn like ở mỗi chương để ủng hộ tinh thần các dịch giả bạn nhé!",
    "3": "Nội dung chương 3.",
    "4": "Nội dung chương 4.",
    "5": "Nội dung chương 5.",
    // Thêm các chương khác tại đây
};

const StoryRead: React.FC = () => {
    const [backgroundColor, setBackgroundColor] = useState<string>(() => localStorage.getItem('backgroundColor') || ''); // Default background color
    const [fontSize, setFontSize] = useState<number>(() => parseInt(localStorage.getItem('fontSize') || '16')); // Default font size
    const [fontFamily, setFontFamily] = useState<string>(() => localStorage.getItem('fontFamily') || 'Arial'); // Default font family
    const [currentChapter, setCurrentChapter] = useState<string>(() => localStorage.getItem('currentChapter') || '1'); // Current chapter
    const [lineHeight, setLineHeight] = useState<number>(() => parseFloat(localStorage.getItem('lineHeight') || '1.5')); // Default line height
    const [textAlign, setTextAlign] = useState<string>(() => localStorage.getItem('textAlign') || 'left'); // Default text alignment

    useEffect(() => {
        localStorage.setItem('backgroundColor', backgroundColor);
    }, [backgroundColor]);

    useEffect(() => {
        localStorage.setItem('fontSize', fontSize.toString());
    }, [fontSize]);

    useEffect(() => {
        localStorage.setItem('fontFamily', fontFamily);
    }, [fontFamily]);

    useEffect(() => {
        localStorage.setItem('currentChapter', currentChapter);
    }, [currentChapter]);

    useEffect(() => {
        localStorage.setItem('lineHeight', lineHeight.toString());
    }, [lineHeight]);

    useEffect(() => {
        localStorage.setItem('textAlign', textAlign);
    }, [textAlign]);

    const handleBackgroundColorChange = (color: string) => {
        setBackgroundColor(color);
    };

    const handleFontSizeChange = (size: number) => {
        setFontSize(size);
    };

    const handleFontFamilyChange = (family: string) => {
        setFontFamily(family);
    };

    const handleChapterChange = (chapter: string) => {
        setCurrentChapter(chapter);
    };

    const handlePreviousChapter = () => {
        const previousChapter = (parseInt(currentChapter) - 1).toString();
        setCurrentChapter(previousChapter);
    };

    const handleNextChapter = () => {
        const nextChapter = (parseInt(currentChapter) + 1).toString();
        setCurrentChapter(nextChapter);
    };

    const handleLineHeightChange = (height: number) => {
        setLineHeight(height);
    };

    const handleTextAlignChange = (align: string) => {
        setTextAlign(align);
    };

    const isFirstChapter = currentChapter === "1";
    const isLastChapter = currentChapter === Object.keys(chapters).length.toString();

    return (
        <div className={`container mx-auto py-8 px-4 dark:text-white`}>
            <SettingsDialog
                onChangeBackgroundColor={handleBackgroundColorChange}
                onChangeFontSize={handleFontSizeChange}
                onChangeFontFamily={handleFontFamilyChange}
                onChangeLineHeight={handleLineHeightChange}
                onChangeTextAlign={handleTextAlignChange}
            />
            <div className="flex justify-between items-end mb-6">
                <Button variant="default" onClick={handlePreviousChapter} disabled={isFirstChapter}>
                    <ChevronLeft size={24} />
                    <p>Chương trước</p>
                </Button>
                <div>
                    <div className='text-center mb-2'>
                        <h2 className="text-2xl font-bold">Đọc truyện</h2>
                        <p>Chương {currentChapter}</p>
                    </div>
                    <Select onValueChange={(value) => handleChapterChange(value)}>
                        <SelectTrigger>
                            Chương {currentChapter}
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(chapters).map((chapter) => (
                                <SelectItem key={chapter} value={chapter}>Chương {chapter}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button variant="default" onClick={handleNextChapter} disabled={isLastChapter}>
                    <p>Chương sau</p>
                    <ChevronRight size={24} />
                </Button>
            </div>
            <div className={`p-6 rounded-lg shadow-md ${backgroundColor}`} style={{ fontSize: `${fontSize}px`, fontFamily: fontFamily, lineHeight: `${lineHeight}`, textAlign: `${textAlign}` }}>
                <p className={`text-gray-800 dark:text-gray-200`}>
                    {chapters[currentChapter]}
                </p>
            </div>

            <div className="flex justify-between items-end mt-6">
                <Button variant="default" onClick={handlePreviousChapter} disabled={isFirstChapter}>
                    <ChevronLeft size={24} />
                    <p>Chương trước</p>
                </Button>
                <div>
                    <Select onValueChange={(value) => handleChapterChange(value)}>
                        <SelectTrigger>
                            Chương {currentChapter}
                        </SelectTrigger>
                        <SelectContent>
                            {Object.keys(chapters).map((chapter) => (
                                <SelectItem key={chapter} value={chapter}>Chương {chapter}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button variant="default" onClick={handleNextChapter} disabled={isLastChapter}>
                    <p>Chương sau</p>
                    <ChevronRight size={24} />
                </Button>
            </div>
            
        </div>
    );
};

export default StoryRead;
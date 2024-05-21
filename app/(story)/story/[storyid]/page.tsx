"use client"

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"


const StoryRead: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    return (
        <div className="container mx-auto py-8 px-4 dark:text-white">
            <Button className="fixed top-1/2 left-4 z-10 bg-white p-2 shadow-md" variant="default" onClick={() => setIsDialogOpen(true)}>
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
                        Đây là nội dung tùy chỉnh của bạn.
                    </DialogDescription>
                </DialogContent>
            </Dialog>
            <div className="flex justify-between items-end mb-6">
                <Button variant="default">
                    <ChevronLeft size={24} />
                    <p>Chương trước</p>
                </Button>
                <div>
                    <div className='text-center mb-2'>
                        <h2 className="text-2xl font-bold">Đọc truyện</h2>
                        <p>Chương 1</p>
                    </div>
                    <Select>
                        <SelectTrigger>
                            Chương 1
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='Chương 1'>Chương 1</SelectItem>
                            <SelectItem value='Chương 2'>Chương 2</SelectItem>
                            <SelectItem value='Chương 3'>Chương 3</SelectItem>
                            <SelectItem value='Chương 4'>Chương 4</SelectItem>
                            <SelectItem value='Chương 5'>Chương 5</SelectItem>
                            <SelectItem value='Chương 6'>Chương 6</SelectItem>
                            <SelectItem value='Chương 7'>Chương 7</SelectItem>
                            <SelectItem value='Chương 8'>Chương 8</SelectItem>
                            <SelectItem value='Chương 9'>Chương 9</SelectItem>
                            <SelectItem value='Chương 10'>Chương 10</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button variant="default">
                    <p>Chương sau</p>
                    <ChevronRight size={24} />
                </Button>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <p className="text-gray-800 dark:text-gray-200">
                    Hẻm nhỏ Ma Cô thuộc Đông thành mặc dù nằm trong một khu vực hỗn tạp, nhưng lại là nơi tam giáo cửu lưu đều có phần kính sợ.
                    <br /><br />
                    Nơi đó là nơi ở của một vị tiên cô nổi tiếng gần xa, nghe nói có thể thông quỷ thần, ngay cả các hộ nhà cao cửa rộng gặp phải chuyện khó giải quyết đều sẽ lặng lẽ mời đến làm phép.
                    <br /><br />
                    Một thiếu niên mặt mày thanh tú tò mò đánh giá mọi thứ quanh mình.
                    <br /><br />
                    Phòng ốc thấp bé cũ nát, góc tường chất đầy đồ lộn xộn, trên mặt đất chảy đầy nước bẩn, còn có khi thỉnh thoảng truyền đến tiếng trẻ con khóc rống vui cười, tất cả mọi thứ đều khiến thiếu niên cảm thấy mới lạ.
                    <br /><br />
                    Phần mới lạ này được che dấu dưới sự cẩn thận.
                    <br /><br />
                    Những tên nhàn tản ngồi dưới chân tường buồn bực ngán ngẩm hướng tầm mắt nhìn về phía thiếu niên, khiến hắn không thể không trở nên cẩn thận.
                    <br /><br />
                    Đây là nơi hắn chưa tới bao giờ, càng là phong cảnh hắn chưa từng thấy qua.
                    <br /><br />
                    Thế nhưng khi đi đến một ngã ba, thiếu niên vẫn phải dừng chân, ánh mắt lộ ra mấy phần mờ mịt.
                    <br /><br />
                    Thiếu niên ngừng chân một lát, bất đắc dĩ đi đến ven đường hỏi một phụ nhân đang bưng thau giặt quần áo trở về: “ Đại thẩm, xin hỏi hẻm Ma Cô đi thế nào vậy?”
                    <br /><br />
                    Phụ nhân liếc nhìn thiếu niên một cái, thấy thiếu niên có một khuôn mặt sạch sẽ thanh tú, ăn mặc trên người lại chỉ bình thường, ánh mắt trong nháy mắt trở nên tế nhị, bĩu môi nói: “Đi bên kia là được.”
                    <br /><br />
                    Thiếu niên nói cảm tạ, đi theo phương hướng phụ nhân chỉ.
                    <br /><br />
                    Phụ nhân bưng thau giặt đồ tay nắm chặt, nhìn bóng lưng của thiếu niên muốn nói lại thôi, cuối cùng lắc đầu, bước nhanh về phía nhà mình.
                    <br /><br />
                    Thiếu niên mới đi tới chừng mười trượng, bỗng nhiên có một người trẻ tuổi chừng hai mươi trong miệng ngậm cọng cỏ phun trên mặt đất, chặn ở trước mặt thiếu niên, ngoài cười nhưng trong không cười nói: “ Tiểu huynh đệ đây là đi chỗ nào thế, ở lại bồi ca ca chơi đùa nào.”
                    <br /><br />
                    Thiếu niên trong nháy mắt nhíu mày một cái.
                    <br /><br />
                    Cô nương căn dặn nàng tới chỗ như thế này phải thay nam trang, bằng không sẽ chọc phải phiền toái, người này chẳng lẽ mắt mù, muốn một tên ‘tiểu tử thúi’ như nàng ở lại chơi cái gì?
                    <br /><br />
                    Hóa ra thiếu niên này chính là A Man nữ giả nam trang.
                    <br /><br />
                    A Man vóc dáng cao gầy, chỉ mới mười mấy tuổi, mặc vào một thân nam trang không chút nào bất ngờ.
                    <br /><br />
                    À, cô nương còn nói, nếu như mặc nam trang rồi mà vẫn có người tới tìm phiền toái, vậy thì liền dùng tiền trừ nạn.
                    <br /><br />
                    A Man luôn nhớ kỹ căn dặn của cô nương nhà mình, từ trong túi lấy ra mấy đồng tiền nhét vào trong tay người trẻ tuổi.
                    <br /><br />
                    Người trẻ tuổi sững sờ, sau đó cầm lấy một đồng tiền thổi thổi, cười nói: “ Tiểu huynh đệ còn rất thức thời, có điều ca ca tìm ngươi thật sự không phải là vì tiền.”
                    <br /><br />
                    Vậy thì là không đủ tiền!
                    <br /><br />
                    A Man lại lấy ra một xâu tiền đồng đặt tới trong tay người trẻ tuổi, nhưng trong lòng lại hơi tiếc nuối.
                    <br /><br />
                    Đáng tiếc cô nương dặn đi dặn lại, có thể không gây phiền toái liền không cần gây phiền toái, bằng không chỉ với con gà yếu ớt trước mặt, nàng một tay thôi đã có thể nhấc lên ném tới chân tường rồi.
                    <br /><br />
                    Người trẻ tuổi hiển nhiên không ngờ tới thiếu niên quần áo tầm thường thế mà lại có thể bỏ ra không ít tiền.
                    <br /><br />
                    Đừng nhìn A Man cho đều là tiền đồng, phải biết rằng nơi này là chỗ dân nghèo tụ tập, tuyệt đại đa số người đều trải qua những ngày bụng ăn không đủ no, nhiêu đây tiền đồng đã đủ cho một người ăn thịt ăn màn thầu tới mấy ngày rồi.
                    <br /><br />
                    Ánh mắt của người trẻ tuổi chăm chú vào túi tiền treo ở bên hông A Man, vươn tay không chút khách khí giật xuống.
                    <br /><br />
                    A Man bóp chặt tay, đè xuống lửa giận nói: “ Tất cả tiền đều cho ngươi, ta có thể đi qua rồi chứ?”
                    <br /><br />
                    Người trẻ tuổi lại ha ha cười rộ lên: “ Tiểu huynh đệ đừng nóng vội mà, ca ca thật không phải vì tiền.”
                    <br /><br />
                    Chẳng qua tiền hắn cũng muốn mà thôi.
                    <br /><br />
                    “ Vậy ngươi vì cái gì?” Khóe mắt quét đến mấy tên nhàn rỗi đang nhìn chằm chằm cách đó không xa, A Man hỏi.
                    <br /><br />
                    “ Là vì tiểu huynh đệ ngươi nha, ca ca vừa gặp ngươi đã thấy thích.” Nam tử trẻ tuổi hiển nhiên bởi vì A Man một mực nhượng bộ mà trở nên càng không kiêng nể gì cả.
                    <br /><br />
                    A Man lạnh lùng nhìn người trẻ tuổi, vươn ba ngón tay.
                    <br /><br />
                    “ Có ý tứ gì?”
                    <br /><br />
                    “ Chủ tử ta nói, quá tam ba bận.”  A Man mặt không biểu tình tiến lên một bước, kéo gần khoảng cách giữa hai người.
                    <br /><br />
                    Người trẻ tuổi cảm thấy có vật gì đó đâm vào trong cơ thể mình.
                    <br /><br />
                    Cái loại cảm giác này thực huyền diệu, hắn có thể cảm nhận được rõ ràng lực cản của máu thịt đối với vật kia, nhưng lại không cảm giác được đau đớn.
                    <br /><br />
                    Người trẻ tuổi cúi đầu, nhìn thấy một cây trâm vàng đâm vào bụng của hắn, hơn phân nửa thân trâm còn ở bên ngoài, đầu trâm sinh động như Ngọc Lan Hoa thật tưởng như có thể ngửi được cả mùi thơm.
                    <br /><br />
                    Giờ khắc này, trong đầu người trẻ tuổi bỗng dưng xẹt qua một cái ý niệm: Nếu như hắn co cẳng bỏ chạy ngay bây giờ, thì cây trâm vàng này sẽ thuộc về hắn nhỉ?
                    <br /><br />
                    Thế nhưng chẳng biết tại sao, chân của người trẻ tuổi lại đóng chặt ở trên mặt đất, một bước đều không xê dịch.
                    <br /><br />
                    {/* “ Không đau đi?” A Man ngữ khí lành lạnh, rơi vào trong tai người trẻ tuổi, lại quỷ dị nói không lên lời.
                    <br /><br />
                    Người trẻ tuổi đầu ầm một tiếng, mồ hôi lạnh trong nháy mắt ướt đẫm sống lưng.
                    <br /><br />
                    Không đau, hắn thật sự không có cảm giác đau.
                    <br /><br />
                    Vì sao không đau? Sao có thể không đau?
                    <br /><br />
                    Gần nửa đoạn trâm vàng cắm ở trong bụng cũng không làm người trẻ tuổi cảm thấy đáng sợ, loại người như hắn vốn là lưu manh đầu đường xó chợ, chút tổn thương ấy với hắn mà nói thật không tính là gì, thế nhưng rõ ràng đổ máu lại không cảm thấy đau đớn chút nào, người trẻ tuổi trong lòng phát run.
                    <br /><br />
                    Ban ngày ban mặt, chẳng lẽ hắn gặp quỷ?
                    <br /><br />
                    Nơi này cách hẻm Ma Cô không xa, tiên cô ở trong hẻm Ma Cô có thể thông quỷ thần, cho nên ngẫu nhiên gặp được quỷ cũng không phải không có khả năng?
                    <br /><br />
                    “ Không đau đi?” Giọng nói bình tĩnh không lay động của A Man lần nữa vang lên.
                    <br /><br />
                    “ Không, không đau ——” Người trẻ tuổi đầu lưỡi cũng cứng lại.
                    <br /><br />
                    “ Không đau là được rồi, đợi đến giờ Tý tối nay sẽ hết đau, về sau mỗi ngày cứ đến lúc ấy sẽ càng ngày càng đau đó.” Giọng nói của A Man càng ngày càng thấp, như sợi tơ vô hình quấn chặt yết hầu người trẻ tuổi, khiến hắn có loại cảm giác hô hấp khó khăn.
                    <br /><br />
                    Hóa ra là một tên hèn nhát, thật không biết cô nương dùng người như vậy làm cái gì.
                    <br /><br />
                    Trong mắt A Man lóe lên vẻ xem thường, thanh âm nhỏ như muỗi nói: “ Nếu như không muốn đến cuối cùng đau đớn mà chết, nhớ kỹ buổi trưa ba ngày sau cầm cây trâm vàng này đến lầu hai quán trà Ngũ Phúc, vào nhã gian thứ hai.”
                    <br /><br />
                    Đến khi A Man quẹo vào phía con hẻm phía trước rồi, người trẻ tuổi mới như ở trong mộng tỉnh lại.
                    <br /><br />
                    “ A Phi, ngươi đứng ngốc ở đấy làm gì?” Mấy tên bình thường hay tụ tập với nhau vây lại.
                    <br /><br />
                    “ Không có gì ——”  Người trẻ tuổi nhanh chóng đẩy ra một người vỗ lên trên bả vai hắn, nhanh chân bỏ chạy.
                    <br /><br />
                    Mặc kệ thiếu niên kỳ quái kia nói thật hay giả, cũng tuyệt không thể để cho người khác nhìn thấy cây trâm vàng này được!
                    <br /><br />
                    “ A Phi có phải bị bệnh rồi không?” Người bị đẩy ra hùng hùng hổ hổ hỏi.
                    <br /><br />
                    “ Các ngươi xem!” Một người trong đó chỉ vào mặt đất giọng điệu kích động.
                    <br /><br />
                    Mấy người cúi đầu nhìn thấy trên mặt đất lấm ta lấm tấm vết máu, không khỏi đổi sắc mặt.
                    <br /><br />
                    “ Thảo nào, A Phi đây là đụng vào cọng rơm cứng rồi?”
                    <br /><br />
                    “ Đã sớm cảm thấy cái tình tình  nóng nảy này của A Phi sớm muộn cũng gây hoạ, tất cả giải tán đi, giải tán đi.”
                    <br /><br />
                    Mấy người đi trở về chân tường, khôi phục bộ dáng ăn không ngồi rồi.
                    <br /><br />
                    A Man đi vào hẻm Ma Cô, dừng lại trước một hộ dân cư treo đèn lồng thỏ ngọc.
                    <br /><br />
                    Hộ dân cư đã lâu năm rồi, mặc dù nhìn như hoàn chỉnh, nhưng cửa gỗ lại khắc sâu dấu vết của năm tháng.
                    <br /><br />
                    A Man tiến lên gọi cửa, rất nhanh có một nữ đồng mở cửa ra.
                    <br /><br />
                    “ Ta đến tìm tiên cô.”
                    <br /><br />
                    Nữ đồng đối với điều này hiển nhiên đã tập mãi thành thói quen, giữ cửa rồi kéo ra nói: “ Vào đi.”
                    <br /><br />
                    A Man theo nữ đồng vào phòng.
                    <br /><br />
                    Trong phòng hương khói lượn lờ, một nữ tử trung niên đầu chải sơ đạo kế ngồi xếp bằng, hai mắt hơi khép, rất có vài phần tiên phong đạo cốt.
                    <br /><br />
                    Nghe được động tĩnh, nữ tử mở mắt: “ Sở cầu chuyện gì?”
                    <br /><br />
                    “ Ngươi là Lưu tiên cô sao?” A Man đi đến trước mặt nữ tử, khí định thần nhàn hỏi. */}
                </p>
            </div>
            <div className="flex justify-between items-end mt-6">
                <Button variant="default">
                    <ChevronLeft size={24} />
                    <p>Chương trước</p>
                </Button>
                <div>

                    <Select>
                        <SelectTrigger>
                            Chương 1
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='Chương 1'>Chương 1</SelectItem>
                            <SelectItem value='Chương 2'>Chương 2</SelectItem>
                            <SelectItem value='Chương 3'>Chương 3</SelectItem>
                            <SelectItem value='Chương 4'>Chương 4</SelectItem>
                            <SelectItem value='Chương 5'>Chương 5</SelectItem>
                            <SelectItem value='Chương 6'>Chương 6</SelectItem>
                            <SelectItem value='Chương 7'>Chương 7</SelectItem>
                            <SelectItem value='Chương 8'>Chương 8</SelectItem>
                            <SelectItem value='Chương 9'>Chương 9</SelectItem>
                            <SelectItem value='Chương 10'>Chương 10</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button variant="default">
                    <p>Chương sau</p>
                    <ChevronRight size={24} />
                </Button>
            </div>
        </div>
    );
};

export default StoryRead;

import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';

const StoryDetail = () => {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <Image
            src="/image.png"
            alt="Truyện Xuyên Nhanh: Nam Thần, Bùng Cháy Đi!"
            width={400}
            height={225}
            className="object-cover rounded-t-lg"
          />
        </CardHeader>
        <CardContent>
          <CardTitle>Xuyên Nhanh: Nam Thần, Bùng Cháy Đi!</CardTitle>
          <CardDescription className="text-gray-600 mb-4">
            Đánh giá: 8.8/10 (46 lượt)
          </CardDescription>
          <p className="mb-4">
            Bạn đang đọc truyện Xuyên Nhanh: Nam Thần, Bùng Cháy Đi! full (đã hoàn thành) của tác giả Mặc
            Linh. Truyện kể về câu chuyện thú vị về một nữ chính xuyên qua cổ đại tên là Sơ Tranh. Một ngày nọ,
            trời cố bị kẹt ẩn tỳ hình một cách bất ngờ, mặc dù không rõ lí do tại sao lại như vậy. Tư vô, cuộc sống
            của cô thay đổi hoàn toàn, và mới duy nhất có quan tâm là liệu thân. Cô từ giàu buộc bội mạt hệ rồi
            kỳ lạ, và đương như môi khổ nàng của cô đâu được nâng cao.
          </p>
          <p className="mb-4">
            Thẳm chỉ có việc hi thố cố cũng không chắn lâm một cách thịnh thượng nga. Sự sơ hải và cảng
            tháng đi làm vời vọng phai lẩu luẩn hưởng ngày, Tròng một buổi chới game trên hà thống, có gắp phải
            nối phiên nam hạnh phen nổ chinh ho là Thất giới và ho ran thiền vào quốc chơi của cô. Trong số
            ho, có một người tố ra đặc biệt đáng chú ý. Ho bất đầu vọi mẫu thuần và xung đột, nhưng dần dần
            tình cảm bị mất hay nổi qua ho.
          </p>
          <p className="mb-4">
            Cô và Thế giới phải tiếm môi quan hệ đầy lằng man, và cả hai không thể hoàn khỏi sức hút của
            tình yêu. Liệu cuộc tình của ho sẽ đâu khiến ho đến đâu? Mời bạn đọc theo dõi câu chuyện thú vị này
            sẽ được tiết lộ đến cùng đó, con có những truyện cùng lắc giả cùng, và cùng hay và hiệp đấn mà bản
            dung nên bố lộ như Boss Là Nữ Phụ hay Thực Hiện Nguyễn Vọng Nữ Phụ.
          </p>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Danh Sách Chương</h2>
        <ul className="list-decimal list-inside">
          <li>Chương 1-1: Lời bàn trà đá vĩa hè -</li>
          {/* Danh sách chương tiếp theo */}
        </ul>
      </div>
    </div>
  );
};

export default StoryDetail;
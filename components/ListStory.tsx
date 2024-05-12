import React from 'react';
import StoryCard from './StoryCard';

const novels = [
  { title: "Tư Cẩm", imageUrl: "/image.png", isFull: true },
  { title: "Ngạo Thế Đan Thần", imageUrl: "/image.png", isFull: true },
  { title: "Nàng Không Muốn Làm Hoàng Hậu", imageUrl: "/image.png", isFull: true },
  { title: "Kiều Sủng Vị Thương", imageUrl: "/image.png", isFull: false },
  { title: "Linh Vũ Thiên Hạ", imageUrl: "/image.png", isFull: true },
  { title: "Anh Đào Hồ Phách", imageUrl: "/image.png", isFull: true },
  { title: "Thần Đạo Đan Tôn", imageUrl: "/image.png", isFull: false },
  { title: "Kiều Trước Yêu Sau - Mộng Liễu Nhi", imageUrl: "/image.png", isFull: true },
  { title: "Mê Đắm", imageUrl: "/profile.png", isFull: true },
  { title: "Không Phụ Thê Duyên", imageUrl: "/profile.png", isFull: true },
  { title: "Dịu Dàng Tận Xương", imageUrl: "/profile.png", isFull: false },
  { title: "Vợ Chồng Siêu Sao Hơi Ngọt", imageUrl: "/profile.png", isFull: false },
  { title: "Nhất U? Thật Ư? Phải Là Hồng Phai Xanh Thắm", imageUrl: "/profile.png", isFull: false },
  { title: "Thiếu Tướng, Vợ Ngài Nói Giận Rồi", imageUrl: "/profile.png", isFull: false },
  { title: "Cưng Chiều Vợ Nhỏ Trời Ban", imageUrl: "/profile.png", isFull: false },
  { title: "Thiên Hương Ngự Nữ, Liếc Mắt Đưa Tình", imageUrl: "/profile.png", isFull: false },
];

const ListStory: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Truyện Hot 🔥</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {novels.map((novel, index) => (
          <StoryCard
            key={index}
            title={novel.title}
            imageUrl={novel.imageUrl}
            isFull={novel.isFull}
          />
        ))}
      </div>
    </div>
  );
};

export default ListStory;


import type { Review } from '../types';

export const reviews: { [courseId: string]: Review[] } = {
  "1": [ // Course ID for HTML CSS Pro
    {
      id: "1",
      courseId: "1",
      user: { name: 'Hoàng An', avatarUrl: 'https://i.pravatar.cc/150?img=20' },
      rating: 5,
      title: 'Khóa học tuyệt vời!',
      content: 'Nội dung rất chi tiết và dễ hiểu. Giảng viên giải thích rõ ràng, ví dụ thực tế. Mình đã có thể tự tay code được giao diện web sau khi học xong. Rất đáng tiền!',
      publishedDate: '2 ngày trước',
      helpful: 15,
    },
    {
      id: "2",
      courseId: "1",
      user: { name: 'Thu Trang', avatarUrl: 'https://i.pravatar.cc/150?img=21' },
      rating: 4,
      title: 'Khóa học chất lượng',
      content: 'Khóa học rất hay, tuy nhiên một vài video phần nâng cao hơi nhanh, mình phải xem lại vài lần mới hiểu. Nhưng tổng thể là rất tốt.',
      publishedDate: '1 tuần trước',
      helpful: 8,
    },
    {
      id: "3",
      courseId: "1",
      user: { name: 'Thành Trung', avatarUrl: 'https://i.pravatar.cc/150?img=22' },
      rating: 5,
      title: 'Rất khuyến khích cho người mới',
      content: 'Mình là người mới hoàn toàn, khóa học đã giúp mình xây dựng nền tảng HTML CSS rất vững chắc. Cảm ơn Office Master!',
      publishedDate: '3 tuần trước',
      helpful: 22,
    }
  ],
  "2": [ // Course ID for Lập Trình JavaScript Cơ Bản
    {
      id: "4",
      courseId: "2",
      user: { name: 'Minh Đức', avatarUrl: 'https://i.pravatar.cc/150?img=23' },
      rating: 5,
      title: 'Khóa JS hay nhất mình từng học',
      content: 'Kiến thức được hệ thống một cách bài bản, từ cơ bản đến những khái niệm khó như closure, promise. Giảng viên có tâm và hỗ trợ rất nhiệt tình.',
      publishedDate: '1 tháng trước',
      helpful: 30,
    },
     {
      id: "5",
      courseId: "2",
      user: { name: 'Linh Chi', avatarUrl: 'https://i.pravatar.cc/150?img=24' },
      rating: 3,
      title: 'Nội dung tốt nhưng cần thêm bài tập',
      content: 'Nội dung khóa học rất đầy đủ, nhưng mình nghĩ cần bổ sung thêm nhiều bài tập thực hành hơn nữa để học viên có thể củng cố kiến thức.',
      publishedDate: '2 tháng trước',
      helpful: 5,
    }
  ],
  "7": [ // Course ID for Làm quen với Excel
    {
      id: "6",
      courseId: "7",
      user: { name: 'Bà Nội Trợ', avatarUrl: 'https://i.pravatar.cc/150?img=26' },
      rating: 5,
      title: 'Dễ hiểu cho người không chuyên',
      content: 'Tôi là người làm nội trợ, chỉ muốn học để quản lý chi tiêu gia đình. Khóa học thực sự rất dễ hiểu, tôi đã có thể tự tạo bảng tính theo dõi chi tiêu sau vài buổi học. Cảm ơn!',
      publishedDate: '3 ngày trước',
      helpful: 18,
    }
  ]
};

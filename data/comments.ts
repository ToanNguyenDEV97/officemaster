

import type { Comment } from '../types';

export const comments: { [postId: string]: Comment[] } = {
  "1": [ // Post ID for '10 hàm Excel giúp bạn tăng năng suất x2'
    {
      id: "101",
      postId: "1",
      user: { name: 'Bảo Trân', avatarUrl: 'https://i.pravatar.cc/150?img=25' },
      content: 'Bài viết rất hữu ích! Đặc biệt là hàm XLOOKUP, mình đã dùng VLOOKUP bao năm nay mà không biết có hàm xịn hơn.',
      publishedDate: '1 ngày trước',
      replies: [
        {
          id: "102",
          postId: "1",
          user: { name: 'Anna Lê', avatarUrl: 'https://i.pravatar.cc/150?img=1' }, // Author
          content: 'Cảm ơn bạn nhé! XLOOKUP đúng là một "vị cứu tinh" đó. Rất vui vì bài viết đã giúp ích cho bạn!',
          publishedDate: '1 ngày trước',
        }
      ]
    },
    {
      id: "103",
      postId: "1",
      user: { name: 'Quang Huy', avatarUrl: 'https://i.pravatar.cc/150?img=27' },
      content: 'Hàm LET cũng hay quá, giúp công thức của mình gọn gàng và dễ đọc hơn hẳn. Cảm ơn tác giả đã chia sẻ.',
      publishedDate: '2 ngày trước',
    }
  ],
  "2": [ // Post ID for 'Mẹo thiết kế slide PowerPoint chuyên nghiệp'
    {
      id: "201",
      postId: "2",
      user: { name: 'Hồng Nhung', avatarUrl: 'https://i.pravatar.cc/150?img=28' },
      content: 'Quy tắc 6x6 thực sự hữu ích. Trước đây slide của mình lúc nào cũng đầy chữ, giờ đã biết cách làm cho nó thoáng và chuyên nghiệp hơn.',
      publishedDate: '5 giờ trước',
    },
    {
      id: "202",
      postId: "2",
      user: { name: 'Gia Khiêm', avatarUrl: 'https://i.pravatar.cc/150?img=29' },
      content: 'Cảm ơn về các nguồn ảnh miễn phí, mình đang rất cần.',
      publishedDate: '10 giờ trước',
      replies: [
        {
          id: "203",
          postId: "2",
          user: { name: 'Minh Tuấn', avatarUrl: 'https://i.pravatar.cc/150?img=3' }, // Author
          content: 'Đúng vậy, hình ảnh chất lượng cao sẽ nâng tầm bài thuyết trình của bạn lên rất nhiều đó!',
          publishedDate: '8 giờ trước',
        }
      ]
    }
  ]
};

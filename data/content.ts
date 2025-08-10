

import type { Slide, BlogPost, TeamMember, FooterColumn, ActiveMember, Tag, FaqItem } from '../types';
import { instructors } from './instructors';

export const siteStats = {
  learners: '450,000+',
  courses: '100+',
  satisfactionRate: '98%',
  totalLearnersText: '448,798+ người khác đã học',
};

export const slides: Slide[] = [
    {
        id: '1',
        imageUrl: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        alt: 'Học viên đang học Excel',
        title: 'Làm Chủ Excel, Mở Lối Thành Công',
        description: 'Các khóa học Excel từ cơ bản đến nâng cao, giúp bạn xử lý dữ liệu chuyên nghiệp và hiệu quả.',
        buttonText: 'Khám phá ngay',
        buttonLink: '#',
    },
    {
        id: '2',
        imageUrl: 'https://images.pexels.com/photos/389818/pexels-photo-389818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        alt: 'Bài thuyết trình PowerPoint ấn tượng',
        title: 'Thiết Kế Thuyết Trình Đẳng Cấp',
        description: 'Biến những slide nhàm chán thành những câu chuyện đầy sức thuyết phục với PowerPoint.',
        buttonText: 'Học PowerPoint',
        buttonLink: '#',
    },
    {
        id: '3',
        imageUrl: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        alt: 'Người đang học trực tuyến',
        title: 'Lộ Trình Học Tập Dành Riêng Cho Bạn',
        description: 'Các lộ trình được thiết kế chuyên biệt, giúp bạn nhanh chóng đạt được mục tiêu sự nghiệp.',
        buttonText: 'Xem Lộ trình',
        buttonLink: '#',
    },
];

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: instructors.sonDang.name,
    role: instructors.sonDang.title,
    imageUrl: instructors.sonDang.avatarUrl,
    bio: instructors.sonDang.bio,
  },
  {
    id: '2',
    name: instructors.annaLe.name,
    role: instructors.annaLe.title,
    imageUrl: instructors.annaLe.avatarUrl,
    bio: instructors.annaLe.bio,
  },
  {
    id: '3',
    name: instructors.minhTuan.name,
    role: instructors.minhTuan.title,
    imageUrl: instructors.minhTuan.avatarUrl,
    bio: instructors.minhTuan.bio,
  },
  {
    id: '4',
    name: instructors.quocBao.name,
    role: instructors.quocBao.title,
    imageUrl: instructors.quocBao.avatarUrl,
    bio: instructors.quocBao.bio,
  },
];

export const footerColumns: FooterColumn[] = [
  {
    title: 'Khóa học',
    links: [
      { name: 'Excel', pageId: 'courses' },
      { name: 'Word', pageId: 'courses' },
      { name: 'PowerPoint', pageId: 'courses' },
      { name: 'Kỹ năng văn phòng', pageId: 'courses' },
    ],
  },
  {
    title: 'Về Office Master',
    links: [
      { name: 'Giới thiệu', pageId: 'about' },
      { name: 'Liên hệ', pageId: 'support' },
      { name: 'Điều khoản', pageId: 'terms' },
      { name: 'Bảo mật', pageId: 'privacy' },
    ],
  },
];

export const activeMembers: ActiveMember[] = [
  { id: '1', name: 'Hoàng An', avatarUrl: 'https://i.pravatar.cc/150?img=20', level: 'Pro' },
  { id: '2', name: 'Thu Trang', avatarUrl: 'https://i.pravatar.cc/150?img=21', level: 'Member' },
  { id: '3', name: 'Minh Đức', avatarUrl: 'https://i.pravatar.cc/150?img=23', level: 'Pro' },
  { id: '4', name: 'Bảo Trân', avatarUrl: 'https://i.pravatar.cc/150?img=25', level: 'Member' },
];

export const popularTags: Tag[] = [
  { id: '1', name: 'Excel' },
  { id: '2', name: 'Hàm IF' },
  { id: '3', name: 'PowerPoint' },
  { id: '4', name: 'VLOOKUP' },
  { id: '5', name: 'Pivot Table' },
  { id: '6', name: 'Tips' },
];

export const faqItems: FaqItem[] = [
  {
    id: '1',
    question: 'Tôi có thể học thử được không?',
    answer: 'Tất nhiên! Hầu hết các khóa học của chúng tôi đều có một số bài học miễn phí để bạn trải nghiệm trước khi quyết định đăng ký. Hãy tìm các bài có nhãn "Xem trước".',
  },
  {
    id: '2',
    question: 'Khóa học có giới hạn thời gian truy cập không?',
    answer: 'Không. Một khi bạn đã đăng ký, bạn sẽ được sở hữu khóa học trọn đời. Bạn có thể học bất cứ lúc nào, bất cứ nơi đâu và xem lại bao nhiêu lần tùy thích.',
  },
  {
    id: '3',
    question: 'Tôi có được cấp chứng chỉ sau khi hoàn thành không?',
    answer: 'Có. Sau khi hoàn thành 100% nội dung khóa học, bạn sẽ nhận được chứng chỉ hoàn thành điện tử từ Office Master, có thể thêm vào CV hoặc hồ sơ LinkedIn của bạn.',
  },
   {
    id: '4',
    question: 'Nếu tôi không hài lòng với khóa học thì sao?',
    answer: 'Chúng tôi có chính sách hoàn tiền trong vòng 7 ngày kể từ ngày đăng ký. Nếu bạn cảm thấy khóa học không phù hợp, chỉ cần gửi yêu cầu và chúng tôi sẽ hoàn lại học phí cho bạn.',
  },
];

// BlogPost is now fetched from API
export const blogPosts: BlogPost[] = [];


import React from 'react';
import type { Notification } from '../types';
import { FaCertificate, FaCommentDots, FaRegCreditCard, FaTags } from 'react-icons/fa';

export const notifications: Notification[] = [
    {
        id: '1',
        icon: React.createElement(FaCertificate, { className: "text-green-500" }),
        title: 'Bạn đã hoàn thành khóa học!',
        description: 'Chúc mừng bạn đã hoàn thành khóa "Làm quen với Excel". Hãy nhận chứng chỉ của bạn ngay.',
        time: '5 phút trước',
        isRead: false,
    },
    {
        id: '2',
        icon: React.createElement(FaCommentDots, { className: "text-blue-500" }),
        title: 'Anna Lê đã trả lời bình luận của bạn',
        description: 'Trong bài học "Hàm VLOOKUP cơ bản", giảng viên đã giải đáp thắc mắc của bạn.',
        time: '1 giờ trước',
        isRead: false,
    },
    {
        id: '3',
        icon: React.createElement(FaRegCreditCard, { className: "text-red-500" }),
        title: 'Thanh toán thành công',
        description: 'Bạn đã đăng ký thành công khóa học "HTML CSS Pro". Bắt đầu học ngay thôi!',
        time: 'Hôm qua',
        isRead: true,
    },
    {
        id: '4',
        icon: React.createElement(FaTags, { className: "text-orange-500" }),
        title: 'Khóa học sắp hết hạn ưu đãi',
        description: 'Ưu đãi 50% cho khóa "Lập Trình JavaScript Cơ Bản" sẽ kết thúc sau 24 giờ nữa.',
        time: '2 ngày trước',
        isRead: true,
    },
     {
        id: '5',
        icon: React.createElement(FaCommentDots, { className: "text-blue-500" }),
        title: 'Chào mừng đến với Office Master!',
        description: 'Cảm ơn bạn đã tham gia cộng đồng. Hãy khám phá các khóa học để bắt đầu nhé.',
        time: '1 tuần trước',
        isRead: true,
    }
];

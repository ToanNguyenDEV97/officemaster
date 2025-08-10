

import React from 'react';
import { teamMembers } from '../data/content';
import { FaTrophy, FaLightbulb, FaUsers, FaCheckCircle, FaLinkedin, FaTwitter } from 'react-icons/fa';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    imageUrl: string;
    bio: string;
}

const TeamMemberCard: React.FC<{member: TeamMember}> = ({ member }) => (
    <div className="text-center">
        <img className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg" src={member.imageUrl} alt={member.name} />
        <h3 className="text-lg font-bold text-slate-800">{member.name}</h3>
        <p className="text-indigo-600 font-semibold text-sm">{member.role}</p>
        <p className="text-slate-500 mt-2 text-sm px-2">{member.bio}</p>
        <div className="flex justify-center mt-3 space-x-3">
            <a href="#" className="text-slate-400 hover:text-indigo-500 transition-colors" aria-label={`${member.name} on LinkedIn`}><FaLinkedin /></a>
            <a href="#" className="text-slate-400 hover:text-indigo-500 transition-colors" aria-label={`${member.name} on Twitter`}><FaTwitter /></a>
        </div>
    </div>
);

const ValueCard: React.FC<{icon: React.ReactNode, title: string, description: string}> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg text-center border border-slate-200 h-full">
        <div className="flex justify-center items-center w-16 h-16 bg-indigo-100 rounded-full mx-auto mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm">{description}</p>
    </div>
);


const AboutPage: React.FC<{ onNavigate: (pageId: string) => void }> = ({ onNavigate }) => {
    return (
        <div className="bg-white rounded-xl border border-slate-200">
            {/* Header Section */}
            <div className="relative h-64 md:h-80 rounded-t-xl overflow-hidden">
                <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Office Master Team" className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-slate-900 bg-opacity-60 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Về Office Master</h1>
                        <p className="mt-4 text-lg md:text-xl max-w-3xl">Nâng tầm kỹ năng, kiến tạo tương lai. Chúng tôi đồng hành cùng bạn trên con đường chinh phục đỉnh cao sự nghiệp.</p>
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-10 space-y-16 lg:space-y-20">
                {/* Our Story Section */}
                <section>
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-slate-800 mb-4">Câu Chuyện Của Chúng Tôi</h2>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Office Master ra đời từ niềm tin rằng bất kỳ ai cũng có thể trở thành chuyên gia trong lĩnh vực của mình nếu được trang bị đúng kiến thức và công cụ. Giữa một thế giới số không ngừng biến đổi, kỹ năng tin học văn phòng không còn là một lợi thế, mà là yêu cầu bắt buộc. Chúng tôi tồn tại để thu hẹp khoảng cách kỹ năng, mang đến những khóa học chất lượng, thực tiễn và dễ tiếp cận nhất cho người Việt Nam.
                        </p>
                    </div>
                </section>

                {/* Core Values Section */}
                <section>
                    <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Giá Trị Cốt Lõi</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <ValueCard
                            icon={<FaTrophy className="w-8 h-8 text-indigo-600" />}
                            title="Chất Lượng"
                            description="Nội dung được biên soạn bởi chuyên gia hàng đầu, đảm bảo tính chính xác và cập nhật."
                        />
                        <ValueCard
                            icon={<FaLightbulb className="w-8 h-8 text-indigo-600" />}
                            title="Đổi Mới"
                            description="Luôn áp dụng phương pháp giảng dạy hiện đại và công nghệ tiên tiến vào học tập."
                        />
                        <ValueCard
                            icon={<FaUsers className="w-8 h-8 text-indigo-600" />}
                            title="Cộng Đồng"
                            description="Xây dựng một cộng đồng học tập tích cực, nơi mọi người cùng nhau chia sẻ và phát triển."
                        />
                        <ValueCard
                            icon={<FaCheckCircle className="w-8 h-8 text-indigo-600" />}
                            title="Thực Tiễn"
                            description="Tập trung vào các kỹ năng và kiến thức có thể áp dụng ngay vào công việc thực tế."
                        />
                    </div>
                </section>

                {/* Stats Bar */}
                <section className="bg-indigo-600 text-white rounded-lg p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                        <div>
                            <p className="text-4xl font-extrabold">450,000+</p>
                            <p className="text-indigo-200 font-medium mt-1">Học viên</p>
                        </div>
                        <div>
                            <p className="text-4xl font-extrabold">100+</p>
                            <p className="text-indigo-200 font-medium mt-1">Khóa học chất lượng</p>
                        </div>
                        <div>
                            <p className="text-4xl font-extrabold">98%</p>
                            <p className="text-indigo-200 font-medium mt-1">Tỷ lệ hài lòng</p>
                        </div>
                    </div>
                </section>
                
                {/* Meet the Team Section */}
                <section>
                    <h2 className="text-3xl font-bold text-slate-800 mb-10 text-center">Gặp Gỡ Đội Ngũ Chuyên Gia</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                        {teamMembers.map(member => (
                            <TeamMemberCard key={member.id} member={member} />
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center bg-slate-50 p-10 rounded-lg border border-slate-200">
                    <h2 className="text-3xl font-bold text-slate-800">Sẵn Sàng Nâng Cao Kỹ Năng?</h2>
                    <p className="text-slate-600 mt-2 mb-6 max-w-2xl mx-auto">Khám phá các lộ trình học được thiết kế chuyên biệt để giúp bạn đạt được mục tiêu nhanh hơn.</p>
                    <button
                        onClick={() => onNavigate('learning-paths')}
                        className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
                    >
                        Khám phá Lộ trình
                    </button>
                </section>
            </div>
        </div>
    );
};

export default AboutPage;

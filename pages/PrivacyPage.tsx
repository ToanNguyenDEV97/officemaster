
import React from 'react';

const PrivacyPage: React.FC<{ onNavigate: (pageId: string) => void }> = ({ onNavigate }) => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">Chính sách Bảo mật</h1>
                    <p className="mt-2 text-slate-500 dark:text-slate-400">Cập nhật lần cuối: 25 tháng 07, 2024</p>
                </header>

                <div className="prose prose-slate dark:prose-invert max-w-none prose-h2:font-bold prose-h2:text-2xl prose-h2:text-slate-800 dark:prose-h2:text-slate-100 prose-h2:mb-4 prose-p:leading-relaxed prose-a:text-indigo-600 hover:prose-a:text-indigo-800 dark:prose-a:text-indigo-400 dark:hover:prose-a:text-indigo-300 prose-ul:list-disc prose-ul:pl-6">
                    <section className="mb-8">
                        <h2>1. Giới thiệu</h2>
                        <p>
                            Office Master ("chúng tôi", "của chúng tôi") cam kết bảo vệ quyền riêng tư của bạn. Chính sách Bảo mật này giải thích cách chúng tôi thu thập, sử dụng, tiết lộ và bảo vệ thông tin của bạn khi bạn truy cập nền tảng học tập của chúng tôi. Vui lòng đọc kỹ chính sách này.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2>2. Thông tin chúng tôi thu thập</h2>
                        <p>
                            Chúng tôi có thể thu thập thông tin về bạn theo nhiều cách khác nhau. Thông tin chúng tôi có thể thu thập bao gồm:
                        </p>
                        <ul>
                            <li><strong>Dữ liệu cá nhân:</strong> Thông tin nhận dạng cá nhân, chẳng hạn như tên, địa chỉ email, số điện thoại mà bạn tự nguyện cung cấp cho chúng tôi khi đăng ký tài khoản.</li>
                            <li><strong>Dữ liệu phái sinh:</strong> Thông tin mà máy chủ của chúng tôi tự động thu thập khi bạn truy cập trang web, chẳng hạn như địa chỉ IP, loại trình duyệt, hệ điều hành, thời gian truy cập và các trang bạn đã xem.</li>
                            <li><strong>Dữ liệu tiến độ học tập:</strong> Chúng tôi thu thập dữ liệu liên quan đến quá trình học của bạn, bao gồm các khóa học đã đăng ký, tiến độ bài học, kết quả bài kiểm tra và chứng chỉ đã đạt được.</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2>3. Cách chúng tôi sử dụng thông tin của bạn</h2>
                        <p>
                            Việc có thông tin chính xác về bạn cho phép chúng tôi cung cấp cho bạn trải nghiệm mượt mà, hiệu quả và tùy chỉnh. Cụ thể, chúng tôi có thể sử dụng thông tin thu thập được về bạn để:
                        </p>
                         <ul>
                            <li>Tạo và quản lý tài khoản của bạn.</li>
                            <li>Gửi email cho bạn về tài khoản hoặc các cập nhật của khóa học.</li>
                            <li>Cá nhân hóa và cải thiện trải nghiệm người dùng.</li>
                            <li>Theo dõi và phân tích việc sử dụng và xu hướng để cải thiện nền tảng.</li>
                            <li>Thông báo cho bạn về các khóa học mới, khuyến mãi, và sự kiện.</li>
                        </ul>
                    </section>

                     <section className="mb-8">
                        <h2>4. Chia sẻ thông tin</h2>
                        <p>
                           Chúng tôi không bán, trao đổi hoặc chuyển giao thông tin nhận dạng cá nhân của bạn cho các bên thứ ba cho mục đích tiếp thị. Chúng tôi chỉ có thể chia sẻ thông tin với các đối tác đáng tin cậy giúp chúng tôi vận hành trang web, tiến hành kinh doanh hoặc phục vụ bạn, miễn là các bên đó đồng ý giữ bí mật thông tin này.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2>5. Bảo mật dữ liệu</h2>
                        <p>
                          Chúng tôi sử dụng các biện pháp bảo mật hành chính, kỹ thuật và vật lý để giúp bảo vệ thông tin cá nhân của bạn. Mặc dù chúng tôi đã thực hiện các bước hợp lý để bảo mật thông tin cá nhân bạn cung cấp cho chúng tôi, xin lưu ý rằng không có biện pháp bảo mật nào là hoàn hảo hoặc không thể xuyên thủng.
                        </p>
                    </section>

                    <section>
                        <h2>6. Liên hệ</h2>
                        <p>
                           Nếu bạn có bất kỳ câu hỏi hoặc nhận xét nào về Chính sách Bảo mật này, vui lòng <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('support'); }}>liên hệ với chúng tôi</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;

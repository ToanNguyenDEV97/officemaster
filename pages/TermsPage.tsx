
import React from 'react';

const TermsPage: React.FC<{ onNavigate: (pageId: string) => void }> = ({ onNavigate }) => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">Điều khoản Dịch vụ</h1>
                    <p className="mt-2 text-slate-500 dark:text-slate-400">Cập nhật lần cuối: 25 tháng 07, 2024</p>
                </header>

                <div className="prose prose-slate dark:prose-invert max-w-none prose-h2:font-bold prose-h2:text-2xl prose-h2:text-slate-800 dark:prose-h2:text-slate-100 prose-h2:mb-4 prose-p:leading-relaxed prose-a:text-indigo-600 hover:prose-a:text-indigo-800 dark:prose-a:text-indigo-400 dark:hover:prose-a:text-indigo-300">
                    <section className="mb-8">
                        <h2>1. Chào mừng đến với Office Master</h2>
                        <p>
                            Chào mừng bạn đến với Office Master ("chúng tôi", "của chúng tôi"). Bằng cách truy cập hoặc sử dụng nền tảng của chúng tôi, bạn đồng ý tuân thủ và bị ràng buộc bởi các Điều khoản Dịch vụ này ("Điều khoản"). Vui lòng đọc kỹ các điều khoản này trước khi sử dụng dịch vụ. Nếu bạn không đồng ý với bất kỳ phần nào của điều khoản, bạn không được phép truy cập dịch vụ.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2>2. Tài khoản Người dùng</h2>
                        <p>
                            Để truy cập một số tính năng của nền tảng, bạn có thể được yêu cầu tạo một tài khoản. Bạn có trách nhiệm bảo mật thông tin tài khoản của mình, bao gồm cả mật khẩu. Bạn đồng ý chịu trách nhiệm cho tất cả các hoạt động xảy ra dưới tài khoản của mình. Bạn phải thông báo cho chúng tôi ngay lập tức khi phát hiện bất kỳ hành vi sử dụng trái phép tài khoản nào.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2>3. Nội dung và Quyền sở hữu trí tuệ</h2>
                        <p>
                            Tất cả nội dung trên nền tảng Office Master, bao gồm các khóa học, video, văn bản, đồ họa, logo, và phần mềm ("Nội dung"), là tài sản của Office Master hoặc các nhà cung cấp nội dung của chúng tôi và được bảo vệ bởi luật bản quyền và sở hữu trí tuệ. Bạn được cấp một giấy phép có giới hạn, không độc quyền, không thể chuyển nhượng để truy cập và xem Nội dung chỉ cho mục đích cá nhân, phi thương mại.
                        </p>
                    </section>

                     <section className="mb-8">
                        <h2>4. Thanh toán và Hoàn tiền</h2>
                        <p>
                           Một số khóa học và dịch vụ có thể yêu cầu thanh toán. Bạn đồng ý cung cấp thông tin thanh toán hiện tại, đầy đủ và chính xác. Chúng tôi có chính sách hoàn tiền trong vòng 7 ngày cho các khóa học nếu bạn không hài lòng, với một số điều kiện áp dụng. Vui lòng xem chi tiết chính sách hoàn tiền trên trang hỗ trợ của chúng tôi.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2>5. Giới hạn Trách nhiệm</h2>
                        <p>
                           Trong phạm vi tối đa được pháp luật cho phép, Office Master sẽ không chịu trách nhiệm cho bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, do hậu quả hoặc mang tính trừng phạt nào, hoặc bất kỳ tổn thất nào về lợi nhuận hoặc doanh thu, cho dù phát sinh trực tiếp hay gián tiếp, hoặc bất kỳ mất mát dữ liệu, sử dụng, thiện chí hoặc các tổn thất vô hình khác.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2>6. Thay đổi Điều khoản</h2>
                        <p>
                            Chúng tôi có quyền sửa đổi các Điều khoản này vào bất kỳ lúc nào. Nếu chúng tôi thực hiện các thay đổi, chúng tôi sẽ thông báo cho bạn bằng cách đăng các điều khoản đã sửa đổi trên trang web. Việc bạn tiếp tục sử dụng nền tảng sau khi các thay đổi có hiệu lực sẽ cấu thành sự chấp nhận của bạn đối với các điều khoản mới.
                        </p>
                    </section>
                    
                     <section>
                        <h2>7. Liên hệ</h2>
                        <p>
                           Nếu bạn có bất kỳ câu hỏi nào về các Điều khoản này, vui lòng <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('support'); }}>liên hệ với chúng tôi</a> qua trang hỗ trợ.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;

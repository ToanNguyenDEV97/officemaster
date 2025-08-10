
import React from 'react';
import { faqItems } from '../data/content';
import FaqAccordion from './FaqAccordion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const SupportPage: React.FC = () => {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8">
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Hỗ trợ & Liên hệ</h1>
                <p className="mt-2 text-slate-600 max-w-2xl">Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn. Vui lòng chọn một trong các phương thức dưới đây.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* FAQ Section */}
                <div className="lg:col-span-3">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Câu hỏi thường gặp</h2>
                    <div>
                        {faqItems.map(item => (
                            <FaqAccordion key={item.id} question={item.question} answer={item.answer} />
                        ))}
                    </div>
                </div>

                {/* Contact Form & Info Section */}
                <div className="lg:col-span-2">
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-800 mb-5">Gửi tin nhắn cho chúng tôi</h2>
                        <form action="#" method="POST" className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Họ và tên</label>
                                <input type="text" name="name" id="name" required className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input type="email" name="email" id="email" required className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">Chủ đề</label>
                                <input type="text" name="subject" id="subject" required className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Nội dung</label>
                                <textarea name="message" id="message" rows={4} required className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Gửi tin nhắn
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

             {/* Contact Info & Map Section */}
            <div className="mt-16 pt-10 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                 <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Thông tin liên hệ</h2>
                    <div className="space-y-4 text-slate-600">
                        <div className="flex items-start">
                             <FaMapMarkerAlt className="w-5 h-5 mt-1 mr-4 text-indigo-500 flex-shrink-0" />
                            <span>Tòa nhà Capital, 123 Thái Hà, Phường Trung Liệt, Quận Đống Đa, Hà Nội</span>
                        </div>
                         <div className="flex items-center">
                             <FaPhoneAlt className="w-5 h-5 mr-4 text-indigo-500" />
                            <span>0246.329.1102</span>
                        </div>
                        <div className="flex items-center">
                            <FaEnvelope className="w-5 h-5 mr-4 text-indigo-500" />
                            <span>contact@officemaster.edu.vn</span>
                        </div>
                    </div>
                </div>
                <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden border border-slate-200">
                     <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.588365399587!2d105.81881481534433!3d21.00914949381775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab645cfc1d07%3A0x86134f7d4529f7a9!2zMTIzIMOCIFRow6FpIEjDoCwgVHJ1bmcgTGnhu4d0LCDEkOG7kW5nIMSQYSwgSMOgIE7hu5lpLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1678886456789!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Vị trí văn phòng Office Master"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;

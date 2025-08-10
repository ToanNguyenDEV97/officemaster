
import React from 'react';
import { footerColumns } from '../../data/content';
import { OfficeMasterLogo } from '../ui/OfficeMasterLogo';
import { FaYoutube, FaFacebook, FaTiktok } from 'react-icons/fa';

interface FooterProps {
    onNavigate: (pageId: string, e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="lg:pl-20 xl:pr-80">
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center mb-4">
                <OfficeMasterLogo color1="#94a3b8" color2="#64748b" />
                <span className="ml-3 text-slate-100 font-bold text-lg">Office Master</span>
              </div>
              <p className="text-sm">Điện thoại: 0246.329.1102</p>
              <p className="text-sm">Email: contact@officemaster.edu.vn</p>
              <p className="text-sm">Địa chỉ: Tòa nhà Capital, 123 Thái Hà, Đống Đa, Hà Nội</p>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-slate-100 font-semibold tracking-wider uppercase text-sm mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.href || '#'} 
                        onClick={(e) => {
                           if (link.pageId) {
                               onNavigate(link.pageId, e);
                           }
                        }}
                        className="hover:text-indigo-400 transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
               <h3 className="text-slate-100 font-semibold tracking-wider uppercase text-sm mb-4">CÔNG TY CỔ PHẦN GIÁO DỤC OFFICE MASTER</h3>
               <p className="text-sm">Mã số thuế: 0101234567</p>
               <p className="text-sm">Ngày thành lập: 10/10/2023</p>
               <p className="text-sm">Lĩnh vực: Giáo dục, đào tạo kỹ năng văn phòng.</p>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-center sm:justify-between items-center text-slate-400">
            <p className="text-sm text-center sm:text-left">&copy; 2023 - {new Date().getFullYear()} Office Master. Nền tảng học tin học văn phòng hàng đầu.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="#" className="hover:text-indigo-400"><FaYoutube className="w-6 h-6" /></a>
              <a href="#" className="hover:text-indigo-400"><FaFacebook className="w-6 h-6" /></a>
              <a href="#" className="hover:text-indigo-400"><FaTiktok className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

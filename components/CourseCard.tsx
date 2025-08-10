
import React from 'react';
import type { Course, BlogPost } from '../types';
import { FaCrown, FaPlay, FaClock } from 'react-icons/fa';

interface CourseCardProps {
  item: Course | BlogPost;
  onSelectCourse?: (id: string) => void;
}

const isCourse = (item: Course | BlogPost): item is Course => {
    return 'lessons' in item;
};

const CourseCard: React.FC<CourseCardProps> = ({ item, onSelectCourse }) => {
  const authorName = isCourse(item) ? item.instructorName : item.author;
  const authorAvatar = isCourse(item) ? item.instructorAvatarUrl : item.avatarUrl;

  const isClickableCourse = isCourse(item) && onSelectCourse;

  const Wrapper = isClickableCourse ? 'div' : 'a';
  const props = isClickableCourse 
      ? {
          onClick: () => onSelectCourse(item.id),
          className: "cursor-pointer flex flex-col bg-white rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full border border-slate-200"
        }
      : {
          href: "#",
          className: "flex flex-col bg-white rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full border border-slate-200"
        };

  const cardContent = (
    <>
      <div className="relative">
        <img className="w-full aspect-[4/3] object-cover" src={item.imageUrl} alt={item.title} />
        {isCourse(item) && item.isPro && (
            <div className="absolute top-2.5 left-2.5 bg-yellow-400 text-white p-1 rounded-md flex items-center justify-center shadow">
                <FaCrown className="h-4 w-4" />
            </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div>
          <h3 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors text-base mb-2 h-12 line-clamp-2">
            {item.title}
          </h3>

          {isCourse(item) ? (
              <div className="mb-3 h-6 flex items-center">
                  {item.isPro ? (
                    <div className="flex items-baseline">
                      <span className="text-slate-500 line-through text-sm">{item.oldPrice?.toLocaleString('vi-VN')}đ</span>
                      <span className="text-red-500 font-semibold text-base ml-2">{item.price?.toLocaleString('vi-VN')}đ</span>
                    </div>
                  ) : (
                    <div className="font-semibold text-base text-green-600">Miễn phí</div>
                  )}
              </div>
          ) : (
              <div className="mb-3 h-6"></div>
          )}
        </div>

        <div className="flex-grow"></div>

        <div className="flex items-center text-xs text-slate-500 pt-2">
          <span className="flex items-center whitespace-nowrap mr-4">
             <img src={authorAvatar} alt={authorName} className="w-5 h-5 rounded-full mr-2 object-cover" />
            {authorName}
          </span>
          {isCourse(item) && (
            <>
                <span className="flex items-center whitespace-nowrap mr-4"><FaPlay className="w-4 h-4 mr-1.5 text-slate-400" /> {item.lessons}</span>
                <span className="flex items-center whitespace-nowrap"><FaClock className="w-4 h-4 mr-1.5 text-slate-400" /> {item.duration}</span>
            </>
          )}
        </div>
      </div>
    </>
  );

  return (
    <Wrapper {...props}>
      {cardContent}
    </Wrapper>
  );
};

export default CourseCard;

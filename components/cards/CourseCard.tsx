
import React from 'react';
import type { Course, BlogPost } from '../../types';
import { FaCrown, FaPlay, FaClock } from 'react-icons/fa';

interface CourseCardProps {
  item: Course | BlogPost;
  onSelectCourse?: (id: string) => void;
  onSelectBlogPost?: (id: string) => void;
  size?: 'normal' | 'small';
}

const isCourse = (item: Course | BlogPost): item is Course => {
    return 'lessons' in item;
};

const CourseCard: React.FC<CourseCardProps> = ({ item, onSelectCourse, onSelectBlogPost, size = 'normal' }) => {
  const authorName = isCourse(item) ? item.instructorName : item.author;
  const authorAvatar = isCourse(item) ? item.instructorAvatarUrl : item.avatarUrl;

  const isClickableCourse = isCourse(item) && onSelectCourse;
  const isClickableBlogPost = !isCourse(item) && onSelectBlogPost;
  const isClickable = isClickableCourse || isClickableBlogPost;

  const Wrapper = isClickable ? 'div' : 'a';
  const props = isClickable 
      ? {
          onClick: () => {
            if (isClickableCourse) {
              onSelectCourse(item.id);
            } else if (isClickableBlogPost) {
              onSelectBlogPost(item.id);
            }
          },
          className: "cursor-pointer flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-lg dark:hover:shadow-indigo-500/10 hover:-translate-y-1 h-full border border-slate-200 dark:border-slate-700"
        }
      : {
          href: "#",
          className: "flex flex-col bg-white dark:bg-slate-800 rounded-2xl overflow-hidden group transition-all duration-300 hover:shadow-lg dark:hover:shadow-indigo-500/10 hover:-translate-y-1 h-full border border-slate-200 dark:border-slate-700"
        };

  // Conditional classes based on size
  const paddingClass = size === 'small' ? 'p-3' : 'p-4';
  const titleClass = size === 'small' 
    ? 'font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-sm mb-1 h-10 line-clamp-2'
    : 'font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-base mb-2 h-12 line-clamp-2';
  const priceContainerHeightClass = size === 'small' ? 'mb-2 h-5' : 'mb-3 h-6';

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
      <div className={`${paddingClass} flex flex-col flex-1`}>
        <div>
          <h3 className={titleClass}>
            {item.title}
          </h3>

          {isCourse(item) ? (
              <div className={`${priceContainerHeightClass} flex items-center`}>
                  {item.isPro ? (
                    <div className="flex items-baseline">
                      <span className="text-slate-500 dark:text-slate-400 line-through text-sm">{item.oldPrice?.toLocaleString('vi-VN')}đ</span>
                      <span className="text-red-500 font-semibold text-base ml-2">{item.price?.toLocaleString('vi-VN')}đ</span>
                    </div>
                  ) : (
                    <div className="font-semibold text-base text-green-600 dark:text-green-500">Miễn phí</div>
                  )}
              </div>
          ) : (
              <div className={priceContainerHeightClass}></div>
          )}
        </div>

        <div className="flex-grow"></div>

        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 pt-2">
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
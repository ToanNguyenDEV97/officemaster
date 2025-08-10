

import React from 'react';
import { activeMembers, popularTags } from '../../data/content';
import { ForumTopic } from '../../types';
import TipOfTheDay from '../ui/TipOfTheDay';
import { FaComments } from 'react-icons/fa';

interface InfoSidebarProps {
  onSelectTopic: (topicId: string) => void;
  forumTopics: ForumTopic[];
}

const InfoSidebar: React.FC<InfoSidebarProps> = ({ onSelectTopic, forumTopics }) => {
  const featuredTopics = forumTopics.filter(t => t.isPinned).slice(0, 2); 

  return (
    <aside className="fixed top-16 right-0 h-[calc(100%-4rem)] w-80 bg-transparent z-30 p-6 overflow-y-auto hidden xl:block">
      <div className="space-y-6">

        {/* Tip of the Day - New dynamic component */}
        <TipOfTheDay />

        {/* Community Spotlight Card */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4 text-base">Tâm điểm Cộng đồng</h3>
          
          {/* Featured Topic */}
          <div className="space-y-2">
            {featuredTopics.map(topic => (
              <a
                key={topic.id}
                href="#"
                onClick={(e) => { e.preventDefault(); onSelectTopic(topic.id); }}
                className="block p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <FaComments className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-700 text-sm leading-tight">{topic.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{topic.repliesCount} bình luận</p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Active Members */}
          <div className="mt-4">
            <h4 className="font-semibold text-slate-700 text-sm mb-2">Thành viên tích cực</h4>
            <div className="flex items-center space-x-2">
              {activeMembers.map(member => (
                <a href="#" key={member.id} title={member.name}>
                  <img 
                    src={member.avatarUrl} 
                    alt={member.name} 
                    className="w-9 h-9 rounded-full object-cover border-2 border-white ring-1 ring-slate-200 hover:ring-indigo-400 transition-all" 
                  />
                </a>
              ))}
            </div>
          </div>
          
          <a href="#" className="mt-4 w-full bg-indigo-600 text-white text-center text-sm font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors block">
            Tham gia thảo luận
          </a>
        </div>

        {/* Popular Tags */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-3 text-base">Tags phổ biến</h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map(tag => (
              <a 
                key={tag.id} 
                href="#" 
                className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-md hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
              >
                {tag.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default InfoSidebar;
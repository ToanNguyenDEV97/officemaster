

export interface Course {
  id: string;
  title: string;
  tagline: string;
  imageUrl: string;
  isPro: boolean;
  price?: number;
  oldPrice?: number;
  instructorName: string;
  instructorAvatarUrl: string;
  instructor?: Instructor;
  lessons: number;
  duration: string;
  modules?: Module[];
  longDescription?: string;
  outcomes?: string[];
  requirements?: string[];
  level?: string;
  category?: string;
  introVideoUrl?: string;
}

export interface Resource {
    name: string;
    url: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  questions: Question[];
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  starterFileUrl?: string;
  solutionFileUrl?: string;
  solutionVideoUrl?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isFree: boolean;
  videoUrl?: string;
  description?: string;
  isCompleted?: boolean;
  resources?: Resource[];
  quiz?: Quiz;
  exercise?: Exercise;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  totalDuration: string;
  lessonCount: number;
}

export interface Instructor {
    name: string;
    title: string;
    avatarUrl: string;
    bio: string;
}

export interface LearningPath {
  id: string;
  title:string;
  description: string; // short description for cards
  longDescription: string; // for detail page
  imageUrl: string;
  courseCount: number;
  students: number;
  duration: string; // total duration
  tags: string[];
  outcomes: string[];
  requirements: string[];
  targetAudience: string;
  courses: Course[];
}

export interface BlogPost {
  id: string;
  title: string;
  imageUrl: string;
  author: string;
  avatarUrl: string;
  category: string;
  publishedDate: string;
  content: string;
}

export interface FooterLink {
    name: string;
    href?: string;
    pageId?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface Slide {
    id: string;
    imageUrl:string;
    alt: string;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
}

export interface ActiveMember {
  id: string;
  name: string;
  avatarUrl: string;
  level: string;
}

export interface Tag {
    id: string;
    name: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
}

export interface Heading {
    id: string;
    text: string;
    level: number;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
  role: 'student' | 'admin' | 'instructor';
  joinDate: string;
}

export interface EnrolledCourse {
    courseId: string;
    progress: number; // Percentage from 0 to 100
    completed: boolean;
    lastLearned?: string;
}

export interface Notification {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

export interface Review {
  id: string;
  courseId: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  rating: number;
  title: string;
  content: string;
  publishedDate: string;
  helpful: number;
}

export interface Comment {
  id: string;
  postId: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  content: string;
  publishedDate: string;
  replies?: Comment[];
}

export interface TimestampedNote {
  id: string;
  time: number; // in seconds
  content: string;
}

// ====== NEW FORUM TYPES ======
export interface ForumCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  topicCount: number;
}

export interface ForumTopic {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  authorId: string;
  createdAt: string; // ISO 8601 date string
  repliesCount: number;
  viewsCount: number;
  isPinned?: boolean;
  isLocked?: boolean;
  lastReplyAt?: string;
  lastReplyAuthorId?: string;
}

export interface ForumReply {
  id: string;
  topicId: string;
  authorId: string;
  content: string;
  createdAt: string; // ISO 8601 date string
  parentId?: string | null; // For nested replies
  upvotes: number;
}
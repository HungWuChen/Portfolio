
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string; // New field for filtering (e.g., 'FEM', 'CAD', 'CFD')
  description: string;
  tags: string[];
  imageUrl: string;
  gallery?: string[]; // Additional images (max 2 recommended)
  highlights?: { label: string; value: string }[]; // Renamed from metrics to highlights
  details: string; // Detailed description for the modal
  methodology?: string; // Additional engineering context
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export enum ChatSender {
  USER = 'user',
  BOT = 'bot'
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: ChatSender;
  timestamp: Date;
}

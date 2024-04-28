interface Channel {
  id: number;
  name: string;
  members: number;
  description: string;
}

export type Channels = Channel[];

interface User {
  name: string;
  role: 'CEO' | 'Sales Manager' | 'Frontend Developer' | 'UX/UI Designer' | 'Customer Success Specialist' | 'Marketing Manager' | 'Lead Developer' | 'Backend Developer';
  avatarFilename: string;
}

interface ThreadMessage {
  id: number;
  parentId: number;
  user: User;
  time: string;
  content: string;
}

export type ThreadMessages = ThreadMessage[];

interface Message {
  id: number;
  channelId: number;
  user: User;
  time: string;
  content: string;
  threadMessages: number;
}

export type Messages = Message[];
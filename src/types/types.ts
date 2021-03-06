import { STATUSES } from './enums';

export type ProductRequest = {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: Comment[];
};

export type Comment = {
  id: number;
  content: string;
  user: User;
  replies?: Reply[];
};

export type User = {
  image: string;
  name: string;
  username: string;
};

export type Reply = {
  content: string;
  replyingTo: string;
  user: User;
};

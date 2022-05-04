import React from 'react';
import '../index.scss';
import data from 'data.json';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CommentIcon from '@mui/icons-material/Comment';
import { indigo } from '@mui/material/colors';
//types
import { STATUSES } from 'types';

interface ProductRequestProp {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: {
    id: number;
    content: string;
    user: {
      image: string;
      name: string;
      username: string;
    };
    replies?: {
      content: string;
      replyingTo: string;
      user: {
        image: string;
        name: string;
        username: string;
      };
    }[];
  }[];
}

export const RequestCard = ({
  id,
  title,
  category,
  upvotes,
  status,
  description,
  comments,
}: ProductRequestProp) => {
  return (
    <div className="request-card">
      <button>
        <KeyboardArrowUpIcon sx={{ color: indigo[500] }} />
        {upvotes}
      </button>
      <section className="request-card-text">
        <div className="request-card-title">{title}</div>
        <div className="request-card-description">{description}</div>
        <div className="request-card-category">{category}</div>
      </section>
      <div className="request-card-comments">
        <CommentIcon sx={{ color: indigo[100] }} />
        <span>{comments?.length}</span>
      </div>
    </div>
  );
};

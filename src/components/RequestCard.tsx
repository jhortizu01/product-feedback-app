import React from 'react';
import '../index.scss';
import { data } from 'data';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CommentIcon from '@mui/icons-material/Comment';
import { indigo } from '@mui/material/colors';
//types
import { STATUSES, ProductRequest } from 'types';

export const RequestCard = ({
  id,
  title,
  category,
  upvotes,
  status,
  description,
  comments,
}: ProductRequest) => {
  let userComments = comments?.length === undefined ? 0 : comments?.length;

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
        <span>{userComments}</span>
      </div>
    </div>
  );
};

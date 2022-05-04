import React from 'react';
import '../index.scss';
import data from 'data.json';
import { RequestCard } from './RequestCard';

//types
import { STATUSES } from 'types';

interface AllProductRequestProps {
  productRequests: {
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
  }[];
}

export const RequestCards = ({ productRequests }: AllProductRequestProps) => {
  let card = productRequests.map((request) => {
    return (
      <div>
        <RequestCard
          id={request.id}
          title={request.title}
          category={request.category}
          upvotes={request.upvotes}
          status={request.status}
          description={request.description}
          comments={request.comments}
        />
      </div>
    );
  });

  return <div className="request-cards">{card}</div>;
};

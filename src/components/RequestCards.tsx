import React from 'react';
import '../index.scss';
import { data } from 'data';
import { RequestCard } from './RequestCard';
import { ProductRequest } from 'types';

interface IProps {
  showData: ProductRequest[];
}

export const RequestCards = (props: IProps) => {
  const { showData } = props;

  let card = showData.map((request) => {
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

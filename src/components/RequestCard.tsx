import { useState } from 'react';
import '../index.scss';

//types
import { ProductRequest } from 'types';

export const RequestCard = ({
  id,
  title,
  category,
  upvotes,
  status,
  description,
  comments,
}: ProductRequest) => {
  const userComments = comments?.length === undefined ? 0 : comments?.length;

  const [upvoteState, setUpvoteState] = useState(upvotes);
  const [disabled, setDisabled] = useState(false);

  const addUpvote = () => {
    let increment = upvoteState + 1;
    setUpvoteState(increment);
    setDisabled(true);
  };

  return (
    <div className="request-card">
      <button onClick={addUpvote} disabled={disabled}>
        <i className="fa-solid fa-chevron-up"></i>
        {upvoteState}
      </button>
      <section className="request-card-text">
        <div className="request-card-title">{title}</div>
        <div className="request-card-description">{description}</div>
        <div className="request-card-category">{category}</div>
      </section>
      <div className="request-card-comments">
        <i className="fa-solid fa-comment"></i>
        <span>{userComments}</span>
      </div>
    </div>
  );
};

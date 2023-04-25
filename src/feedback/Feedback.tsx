import React, { useState, useEffect, Fragment } from 'react';
import { ProductRequest } from '../types';
import { Link, useParams } from 'react-router-dom';
import leftArrow from '../assets/shared/icon-arrow-left.svg';
import { ariaHidden } from '@mui/base';
import reactSelect from 'react-select';

// Types
interface IProps {
  productRequests: ProductRequest[];
  currentFeedback: any;
  addUpVote: any;
  disabledUpVotes: any;
  currentUser: any;
}

export const Feedback = (props: IProps) => {
  const [inputText, setInputText] = useState<string>();
  const [error, setErrorState] = useState('hidden');
  const [selectedReplies, setSelectedReplies] = useState<number[]>([]);
  const {
    productRequests,
    currentFeedback,
    addUpVote,
    disabledUpVotes,
    currentUser,
  } = props;
  const { id } = useParams();

  const find = productRequests.find((request) => {
    return request.id === currentFeedback;
  });

  const { category, comments, description, status, title, upvotes } = find!;

  const onClick = (event: any): void => {
    console.log(event.target.id);
    addUpVote(event);

    if (event.target.id === title) {
      disabledUpVotes.push(find);
    }
  };

  const findDisabled = disabledUpVotes.find((upvote: ProductRequest) => {
    return upvote.title === title;
  });

  const onInput = (event: any) => {
    setInputText(event.target.value);
  };

  const addComment = (event: any) => {
    if (inputText === undefined) {
      setErrorState('disable');
    } else {
      setErrorState('hidden');

      if (find !== undefined) {
        find?.comments?.push({
          id: 100,
          content: inputText,
          user: currentUser,
        });
      }

      setInputText('');
    }
  };

  const openReplyTextbox = (comment: number) => {
    setSelectedReplies((selectedReplies) => [...selectedReplies, comment]);
  };

  return (
    <div className="feedback">
      <div></div>
      <nav>
        <button className="go-back">
          <img src={leftArrow} alt="left arrow" />
          <Link to="/">Go Back</Link>
        </button>
        <button className="add-feedback">Edit Feedback</button>
      </nav>

      <div className="request-card" data-testid="request-card">
        <button
          onClick={onClick}
          id={title}
          disabled={!!findDisabled}
          className={`fa-solid fa-chevron-up request-card-upvotes`}
          data-testid="upvotes"
        >
          <span>{upvotes}</span>
        </button>
        <section className="request-card-text">
          <h3 className="request-card-title">{title}</h3>
          <p className="request-card-description" data-testid="description">
            {description}
          </p>
          <div className="request-card-category" data-testid="category">
            {category}
          </div>
        </section>
        <div className="request-card-container">
          <button data-testid="comments">
            <i className="fa-solid fa-comment"></i>
            <span>{comments?.length}</span>
          </button>
        </div>
      </div>

      <section className="feedback__container" data-testid="feedback-container">
        <h4>{comments?.length} Comments</h4>

        {comments?.length &&
          comments.map((comment) => {
            const { image, name, username } = comment.user;
            const hidden = selectedReplies.includes(comment.id) ? '' : 'hidden';

            return (
              <>
                <article className="feedback__comments" data-component={id}>
                  <div className="feedback__user-info">
                    {' '}
                    <div>
                      <img src={image} alt="user" />
                      <div>
                        <span data-testid="fullname">{name}</span>
                        <span data-testid="username">{username}</span>
                      </div>
                      <button
                        className="reply"
                        onClick={() => openReplyTextbox(comment?.id)}
                      >
                        Reply
                      </button>
                    </div>
                    <p data-testid="user-comment">{comment?.content}</p>
                    <div
                      data-textid="reply-textbox"
                      className={`reply-input__container ${hidden}`}
                    >
                      <textarea></textarea>
                      <button>Post Reply</button>
                    </div>
                  </div>
                </article>
                {comment.replies?.length &&
                  comment.replies?.map((reply: any) => {
                    const { image, name, username } = reply.user;
                    return (
                      <article className="feedback__reply">
                        <div className="feedback__user-info">
                          <img src={image} alt="user" />
                          <div>
                            <span data-testid="fullname">{name}</span>
                            <span data-testid="username">@{username}</span>
                          </div>
                          <button className="reply">Reply</button>
                        </div>
                        <div>
                          <span>@{reply?.replyingTo}</span>
                          <span>{reply?.content}</span>
                        </div>
                      </article>
                    );
                  })}
              </>
            );
          })}
      </section>

      <form data-testid="add-comment">
        <fieldset>
          <legend>Add Comment</legend>
          <span className={error}>Please add comment</span>
          <textarea
            id="comment"
            name="comment"
            value={inputText}
            rows={5}
            cols={32}
            maxLength={250}
            placeholder="Your text here"
            onChange={(event) => onInput(event)}
            data-testid="comment-box"
          />
        </fieldset>

        <section>
          <span data-testid="characters-left">
            {inputText !== undefined ? 250 - inputText.length : 250} Characters
            Left
          </span>
          <Link to="">
            <button className="add-feedback" id={id} onClick={addComment}>
              Post Comment
            </button>
          </Link>
        </section>
      </form>
    </div>
  );
};

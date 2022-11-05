import React, { useState, useEffect, Fragment } from 'react';
import { ProductRequest } from '../types';
import { Link, useParams } from 'react-router-dom';
import leftArrow from '../assets/shared/icon-arrow-left.svg';

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
    console.log(inputText);
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

  return (
    <div className="feedback">
      <nav>
        <div>
          <img src={leftArrow} alt="left arrow" />
          <Link to="/">Go Back</Link>
        </div>
        <button className="add-feedback">Edit Feedback</button>
      </nav>

      <div className="request-card">
        <button
          onClick={onClick}
          id={title}
          disabled={!!findDisabled}
          className={`fa-solid fa-chevron-up`}
        >
          <span>{upvotes}</span>
        </button>
        <section className="request-card-text">
          <div className="request-card-title">{title}</div>
          <div className="request-card-description">{description}</div>
          <div className="request-card-category">{category}</div>
        </section>

        <button className="request-card-comments">
          <i className="fa-solid fa-comment"></i>
          <span>{comments?.length}</span>
        </button>
      </div>

      <section className="feedback__container">
        <h2>{comments?.length} Comments</h2>

        {comments?.length &&
          comments.map((comment) => {
            const { image, name, username } = comment.user;

            return (
              <>
                <article className="feedback__comments" data-component={id}>
                  <div className="feedback__user-info">
                    {' '}
                    <img src={image} alt="user" />
                    <div>
                      <span>{name}</span>
                      <span>{username}</span>
                    </div>
                    <a href="#" className="reply">
                      Reply
                    </a>
                  </div>
                  <div>
                    <span>{comment?.content}</span>
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
                            <span>{name}</span>
                            <span>@{username}</span>
                          </div>
                          <a href="#" className="reply">
                            Reply
                          </a>
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

        {/* {comments?.map((comment) => {
          if (comment?.replies !== undefined) {
            return comment?.replies?.map((reply) => {
              return (
                <article className="feedback__reply">
                  <div className="feedback__user-info">
                    <img src={reply?.user.image} alt="user" />
                    <div>
                      <span>{reply?.user.name}</span>
                      <span>@{reply?.user.username}</span>
                    </div>
                    <a href="#" className="reply">
                      Reply
                    </a>
                  </div>

                  <div>
                    <span>@{reply?.replyingTo}</span>
                    <span>{reply?.content}</span>
                  </div>
                </article>
              );
            });
          }
        })} */}
      </section>

      <form>
        <fieldset>
          <label htmlFor="comment">Add Comment</label>
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
          />
        </fieldset>

        <section>
          <span>
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

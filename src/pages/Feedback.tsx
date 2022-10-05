import { ProductRequest } from '../types';
import { Link, useParams } from 'react-router-dom';
import leftArrow from '../assets/shared/icon-arrow-left.svg';

// Types
interface IProps {
  productRequests: ProductRequest[];
  currentFeedback: any;
  addUpVote: any;
  disabledUpVotes: any;
}

export const Feedback = (props: IProps) => {
  const { productRequests, currentFeedback, addUpVote, disabledUpVotes } =
    props;
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

  return (
    <div className="feedback">
      <nav>
        <div>
          <img src={leftArrow} alt="left arrow" />
          <Link to="/">Go Back</Link>
        </div>
        <button className="add-feedback">Edit Feedback</button>
      </nav>

      <section className="feedback__content">
        <h2>{title}</h2>
        <p>{description}</p>
        <span className="request-card-category">{category}</span>
        <div className="feedback__buttons">
          <button
            onClick={onClick}
            id={title}
            disabled={!!findDisabled}
            className="fa-solid fa-chevron-up"
          >
            <span>{upvotes}</span>
          </button>
          <button className="request-card-comments">
            <i className="fa-solid fa-comment"></i>
            <span>{comments!.length}</span>
          </button>
        </div>
      </section>

      <section className="feedback__container">
        <h2>{comments?.length} Comments</h2>
        {comments?.map((comment) => {
          console.log(`.${comment?.user.image}`);
          return (
            <article className="feedback__comments">
              <div className="feedback__user-info">
                <img src={comment?.user.image} alt="user" />
                <div>
                  <span>{comment?.user.name}</span>
                  <span>@{comment?.user.username}</span>
                </div>
                <a href="#" className="reply">
                  Reply
                </a>
              </div>
              <div>
                <span>{comment?.content}</span>
              </div>
            </article>
          );
        })}

        {comments?.map((comment) => {
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
        })}
      </section>

      <form action="/action_page.php">
        <label htmlFor="comment">Add Comment</label>
        <textarea
          id="comment"
          name="comment"
          value="butts"
          rows={5}
          cols={32}
        />
      </form>
    </div>
  );
};

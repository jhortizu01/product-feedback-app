import { Link } from 'react-router-dom';
import '../index.scss';
import { ProductRequest } from '../types';

// Types
interface IProps {
  productRequests: ProductRequest[];
  addUpVote(e: any): void;
  disabledUpVotes: ProductRequest[];
  setCurrentFeedback(id: number): void;
}

export const RequestCards = (props: IProps) => {
  const { productRequests, addUpVote, disabledUpVotes, setCurrentFeedback } =
    props;

  return (
    <>
      {productRequests?.map((item: ProductRequest) => {
        const { category, comments, description, id, title, upvotes } = item;
        const userComments: number = !comments ? 0 : comments?.length;
        const onClick = (event: any): void => {
          addUpVote(event);

          if (event.target.id === title) {
            disabledUpVotes?.push(item);
          }
          console.log('butst');
        };

        const findDisabled = disabledUpVotes?.find((upvote: ProductRequest) => {
          return upvote.title === title;
        });

        console.log(findDisabled);

        return (
          <div className="request-card" key={id}>
            <button
              onClick={onClick}
              id={title}
              disabled={!!findDisabled}
              className={`fa-solid fa-chevron-up`}
              data-testid="upvotes"
            >
              {upvotes}
            </button>
            <article className="request-card-text">
              <h3 className="request-card-title">{title}</h3>
              <p className="request-card-description" data-testid="description">
                {description}
              </p>
              <div className="request-card-category" data-testid="category">
                {category}
              </div>
            </article>
            <Link to={`/feedback/${id}`}>
              <button
                className="request-card-comments"
                onClick={() => setCurrentFeedback(id)}
                data-testid="comments"
              >
                <i className="fa-solid fa-comment"></i>
                {userComments}
              </button>
            </Link>
          </div>
        );
      })}
    </>
  );
};

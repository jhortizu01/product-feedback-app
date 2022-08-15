import '../index.scss';
import { ProductRequest } from '../types';

// Types
interface IProps {
  productRequests: ProductRequest[];
  addUpVote(e: any): void;
  disabledUpVotes: ProductRequest[];
}

export const RequestCards = (props: IProps) => {
  const { productRequests, addUpVote, disabledUpVotes } = props;

  return (
    <>
      {productRequests.map((item: ProductRequest) => {
        const { category, comments, description, id, title, upvotes } = item;
        const userComments: number = !comments ? 0 : comments?.length;

        const onClick = (event: any): void => {
          addUpVote(event);

          if (event.target.id === title) {
            disabledUpVotes.push(item);
          }
        };

        const findDisabled = disabledUpVotes.find((upvote: ProductRequest) => {
          return upvote.title === title;
        });

        return (
          <div className="request-card" key={id}>
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
            <div className="request-card-comments">
              <i className="fa-solid fa-comment"></i>
              <span>{userComments}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

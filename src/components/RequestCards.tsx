import { CurrencyYenTwoTone, DisabledByDefault } from '@mui/icons-material';
import { useState } from 'react';
import '../index.scss';

export const RequestCards = (props: any) => {
  const { showData, addUpVote } = props;
  const [disabledUpVotes, setDisableUpVote] = useState<any>([]);
  const [justClicked, setJustClicked] = useState<any>();

  return showData.map((item: any) => {
    const userComments =
      item.comments?.length === undefined ? 0 : item.comments?.length;

    const onClick = (event: any) => {
      addUpVote(event);

      if (event.target.id === item.title) {
        disabledUpVotes.push(item);
      }
    };

    const findDisabled = disabledUpVotes.find((upvote: any) => {
      return upvote.title === item.title;
    });

    const test = findDisabled ? true : false;

    return (
      <div className="request-card">
        <button
          onClick={onClick}
          id={item.title}
          disabled={test}
          className={`fa-solid fa-chevron-up`}
        >
          <span>{item.upvotes}</span>
        </button>
        <section className="request-card-text">
          <div className="request-card-title">{item.title}</div>
          <div className="request-card-description">{item.description}</div>
          <div className="request-card-category">{item.category}</div>
        </section>
        <div className="request-card-comments">
          <i className="fa-solid fa-comment"></i>
          <span>{userComments}</span>
        </div>
      </div>
    );
  });
};

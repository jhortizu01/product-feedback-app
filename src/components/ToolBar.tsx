import React, { useState } from 'react';
import '../index.scss';
import gear from '../assets/icon-gear.svg';
import plus from '../assets/shared/icon-plus.svg';
import { Link, useParams } from 'react-router-dom';

interface IProps {
  callback(id: string): void;
  sortOption: string;
  check: any;
  mobileOverlay: string;
}

export const ToolBar = (props: IProps) => {
  const { callback, sortOption, mobileOverlay } = props;
  const [hiddenState, setHiddenState] = useState<string>('hidden');

  const toggleSort = (): void => {
    if (hiddenState === 'hidden') {
      setHiddenState('');
    } else {
      setHiddenState('hidden');
    }
  };

  return (
    <div className={`toolbar ${mobileOverlay}`}>
      <aside className="toolbar-left">
        <div>
          <img src={gear} alt="gear icon" />
          <span>6 Suggestions</span>
        </div>
        <div className={`toolbar-left__sort`} onClick={toggleSort} id="sort">
          <span>Sort By: {sortOption}</span>
          <div className={`${hiddenState}`}>
            <button
              onClick={() => callback('most-upvotes')}
              id="most-upvotes"
              className={sortOption === 'Most Up Votes' ? 'check' : ''}
            >
              Most Upvotes
            </button>
            <button
              onClick={() => callback('least-upvotes')}
              id="least-upvotes"
              className={sortOption === 'Least Up Votes' ? 'check' : ''}
            >
              Least Upvotes
            </button>
            <button
              onClick={() => callback('most-comments')}
              id="most-comments"
              className={sortOption === 'Most Comments' ? 'check' : ''}
            >
              Most Comments
            </button>
            <button
              onClick={() => callback('least-comments')}
              id="least-comments"
              className={sortOption === 'Least Comments' ? 'check' : ''}
            >
              Least Comments
            </button>
          </div>
        </div>
      </aside>
      <aside className="toolbar-right">
        <Link to="/create-feedback" className="add-feedback">
          <img src={plus} alt="plus" />
          Add Feedback
        </Link>
      </aside>
    </div>
  );
};

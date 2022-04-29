import React from 'react';
import '../index.scss';
import gear from '../assets/icon-gear.svg';
import plus from '../assets/shared/icon-plus.svg';

export const ToolBar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <div>
          <img src={gear} alt="gear icon" />
          <span>6 Suggestions</span>
        </div>
        <div className="toolbar-left-sort">
          <span>Sort By :</span>
          <select name="sortBy">
            <option value="1">Most Up Votes</option>
            <option value="1">1</option>
            <option value="1">1</option>
            <option value="1">1</option>
          </select>
        </div>
      </div>
      <div className="toolbar-right">
        <button>
          <img src={plus} alt="plus" />
          Add Feedback
        </button>
      </div>
    </div>
  );
};

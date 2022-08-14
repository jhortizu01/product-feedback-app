import React, { useState } from 'react';
import '../index.scss';
import gear from '../assets/icon-gear.svg';
import plus from '../assets/shared/icon-plus.svg';

interface IProps {
  callback(event: any): void;
  sortOption: string;
}

export const ToolBar = (props: IProps) => {
  const { callback, sortOption } = props;

  return (
    <div className="toolbar">
      <aside className="toolbar-left">
        <div>
          <img src={gear} alt="gear icon" />
          <span>6 Suggestions</span>
        </div>
        <div className="toolbar-left-sort">
          <span>Sort By:</span>
          <select defaultValue={sortOption} onChange={callback}>
            <option value="Most Up Votes">Most Up Votes</option>
            <option value="Least Up Votes">Least Up Votes</option>
            <option value="Most Comments">Most Comments</option>
            <option value="Least Comments">Least Comments</option>
          </select>
        </div>
      </aside>
      <aside className="toolbar-right">
        <button className="add-feedback">
          <img src={plus} alt="plus" />
          Add Feedback
        </button>
      </aside>
    </div>
  );
};

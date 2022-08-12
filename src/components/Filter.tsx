import React from 'react';
import { ProductRequest } from 'types';
import '../index.scss';

interface IProps {
  filter: any;
  showAll: any;
}

export const Filter = (props: IProps) => {
  const { filter, showAll } = props;

  return (
    <section className="filter">
      <div>
        <button onClick={showAll}>All</button>
        <button onClick={() => filter('ui')}>UI</button>
        <button onClick={() => filter('ux')}>UX</button>
        <button onClick={() => filter('enhancement')}>Enhancement</button>
        <button onClick={() => filter('bug')}>Bug</button>
        <button onClick={() => filter('feature')}>Feature</button>
      </div>
    </section>
  );
};

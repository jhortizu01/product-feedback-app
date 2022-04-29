import React from 'react';
import '../index.scss';

export const Filter = () => {
  return (
    <section className="filter">
      <div>
        <button>All</button>
        <button>UI</button>
        <button>UX</button>
        <button>Enhancement</button>
        <button>Bug</button>
        <button>Feature</button>
      </div>
    </section>
  );
};

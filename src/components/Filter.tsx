import React from 'react';
import { ProductRequest } from 'types';
import '../index.scss';

interface IProps {
  productRequests: ProductRequest[];
  showData: ProductRequest[];
  setShowData: any;
}

export const Filter = (props: IProps) => {
  const { productRequests } = props;
  const { showData } = props;
  const { setShowData } = props;

  const showAll = () => {
    setShowData(productRequests);
  };

  const filter = (productCategory: string) => {
    let filteredItems = productRequests.filter((request) => {
      return request.category === productCategory;
    });
    setShowData(filteredItems);
  };

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

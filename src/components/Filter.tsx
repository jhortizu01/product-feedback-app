import { ProductRequest } from 'types';
import '../index.scss';

interface IProps {
  productRequests: ProductRequest[];
  showData: ProductRequest[];
  setShowData: any;
}

export const Filter = (props: IProps) => {
  const { productRequests } = props;
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
        <input
          type="radio"
          id="all"
          name="filter"
          value="all"
          onClick={showAll}
        ></input>
        <label htmlFor="all">All</label>
        <input
          type="radio"
          id="ui"
          name="filter"
          value="ui"
          onClick={() => filter('ui')}
        ></input>
        <label htmlFor="ui">UI</label>
        <input
          type="radio"
          id="ux"
          name="filter"
          value="ux"
          onClick={() => filter('ux')}
        ></input>
        <label htmlFor="ux">UX</label>
        <input
          type="radio"
          id="enhancement"
          name="filter"
          value="enhancement"
          onClick={() => filter('enhancement')}
        ></input>
        <label htmlFor="enhancement">Enhancement</label>
        <input
          type="radio"
          id="bug"
          name="filter"
          value="bug"
          onClick={() => filter('bug')}
        ></input>
        <label htmlFor="bug">Bug</label>
        <input
          type="radio"
          id="feature"
          name="filter"
          value="feature"
          onClick={() => filter('feature')}
        ></input>
        <label htmlFor="feature">Feature</label>
      </div>
    </section>
  );
};

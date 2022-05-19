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

  const filterCategories = ['ui', 'ux', 'enhancement', 'bug', 'feature'];

  let category = filterCategories.map((category) => {
    return (
      <>
        <input
          type="radio"
          id={category}
          name="filter"
          value={category}
          onClick={() => filter(category)}
        ></input>
        <label htmlFor={category}> {category}</label>
      </>
    );
  });

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
        {category}
      </div>
    </section>
  );
};

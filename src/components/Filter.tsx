import { ProductRequest } from 'types';
import '../index.scss';

interface IProps {
  productRequests: ProductRequest[];
  showData: ProductRequest[];
  setShowData: any;
}

const filterCategories = ['ui', 'ux', 'enhancement', 'bug', 'feature'];

export const Filter = (props: IProps) => {
  const { productRequests, setShowData } = props;

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
        {filterCategories.map((category) => {
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
        })}
      </div>
    </section>
  );
};

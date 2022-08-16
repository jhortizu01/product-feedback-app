import { useState, useEffect } from 'react';
import { FrontEndMentorHeader } from '../components/FrontEndMentor';
import { Filter } from '../components/Filter';
import { Roadmap } from '../components/Roadmap';
import { ToolBar } from '../components/ToolBar';
import { RequestCards } from '../components/RequestCards';
import { data } from 'data';
import { AllData, ProductRequest } from 'types';
import { NoFeedback } from 'components/NoFeedback';
import '../styles/App.scss';

const App = () => {
  const [productRequests, setProductRequests] = useState<ProductRequest[]>(
    data.productRequests,
  );
  const [initialData, setInitialData] = useState<ProductRequest[]>([]);
  const [disabledUpVotes, setDisableUpVote] = useState<ProductRequest[]>([]);
  const [noData, setNoData] = useState('');
  const [sortOption, setSortOption] = useState<string>('Most Up Votes');
  const [check, setCheck] = useState('');

  const showAll = () => {
    setNoData('');
    setProductRequests(initialData);
  };

  //not sure why but this works?
  useEffect(() => {
    let mostUpVotes = productRequests.sort((a: any, b: any) => {
      setSortOption('Most Up Votes');
      return b.upvotes - a.upvotes;
    });
    setInitialData(mostUpVotes);
  }, []);

  const filter = (productCategory: string): void => {
    const filteredItems: ProductRequest[] = initialData.filter(
      (request: ProductRequest) => {
        return request.category === productCategory;
      },
    );

    if (filteredItems.length === 0) {
      setNoData('none');
    } else {
      setNoData('');
      setProductRequests(filteredItems);
    }
  };

  const handleChangeSort = (id: string) => {
    if (id === 'most-upvotes') {
      let mostUpVotes = productRequests.sort((a: any, b: any) => {
        setSortOption('Most Up Votes');
        return b.upvotes - a.upvotes;
      });
      setProductRequests(mostUpVotes);
    } else if (id === 'least-upvotes') {
      let leastUpVotes = productRequests.sort((a: any, b: any) => {
        setSortOption('Least Up Votes');
        return a.upvotes - b.upvotes;
      });
      setProductRequests(leastUpVotes);
    } else if (id === 'most-comments') {
      let mostComments = productRequests
        .map((data) => {
          if (data.comments === undefined) {
            data.comments = [];

            return data;
          } else {
            return data;
          }
        })
        .sort((a: any, b: any) => {
          setSortOption('Most Comments');

          return b.comments.length - a.comments.length;
        });
      setProductRequests(mostComments);
    } else {
      let leastComments = productRequests
        .map((data) => {
          if (data.comments === undefined) {
            data.comments = [];
            return data;
          } else {
            return data;
          }
        })
        .sort((a: any, b: any) => {
          setSortOption('Least Comments');

          return a.comments.length - b.comments.length;
        });
      setProductRequests(leastComments);
    }
  };

  const addUpVote = (event: any) => {
    const addVotes = productRequests.map((data) => {
      if (event.target.id === data.title) {
        data.upvotes += 1;
        return data;
      } else {
        return data;
      }
    });
    setProductRequests(addVotes);
  };

  return (
    <div className="App">
      <div className="App-col one">
        <FrontEndMentorHeader />
        <Filter filter={filter} showAll={showAll} />
        <Roadmap />
      </div>
      <div className="App-col">
        <ToolBar
          callback={handleChangeSort}
          sortOption={sortOption}
          check={check}
        />
        {noData === 'none' || productRequests?.length === 0 ? (
          <NoFeedback />
        ) : (
          <RequestCards
            productRequests={productRequests}
            addUpVote={addUpVote}
            disabledUpVotes={disabledUpVotes}
          />
        )}
      </div>
    </div>
  );
};

export default App;

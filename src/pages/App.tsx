import { useState } from 'react';

import '../styles/App.scss';
import { FrontEndMentorHeader } from '../components/FrontEndMentor';
import { Filter } from '../components/Filter';
import { Roadmap } from '../components/Roadmap';
import { ToolBar } from '../components/ToolBar';
import { RequestCards } from '../components/RequestCards';
import { data } from 'data';
import { ProductRequest } from 'types';
import { NoFeedback } from 'components/NoFeedback';

const App = () => {
  const [allData, setAllData] = useState(data);
  const [showData, setShowData] = useState<ProductRequest[]>(
    allData.productRequests,
  );

  const [sortOption, setSortOption] = useState<string>('Most Up Votes');

  const showAll = () => {
    setShowData(productRequests);
  };

  const filter = (productCategory: string) => {
    let filteredItems = productRequests.filter((request) => {
      return request.category === productCategory;
    });
    setShowData(filteredItems);
  };

  const handleChangeSort = (event: any) => {
    const newSortOption = event.target.value;

    if (newSortOption === 'Most Up Votes') {
      let mostUpVotes = showData.sort((a: any, b: any) => {
        return b.upvotes - a.upvotes;
      });
      setShowData(mostUpVotes);
    } else if (newSortOption === 'Least Up Votes') {
      let leastUpVotes = showData.sort((a: any, b: any) => {
        return a.upvotes - b.upvotes;
      });
      setShowData(leastUpVotes);
      console.log('least', leastUpVotes);
      console.log('show', showData);
    } else if (newSortOption === 'Most Comments') {
      let mostComments = showData.sort((a: any, b: any) => {
        return b.comments - a.comments;
      });
      setShowData(mostComments);
    } else {
      let leastComments = showData.sort((a: any, b: any) => {
        return a.comments - b.comments;
      });
      setShowData(leastComments);
    }

    setSortOption(newSortOption);
  };

  const addUpVote = (event: any) => {
    const addVotes = showData.map((data) => {
      if (event.target.id === data.title) {
        data.upvotes += 1;
        return data;
      } else {
        return data;
      }
    });

    setShowData(addVotes);
  };

  const showCards =
    showData.length === 0 ? (
      <NoFeedback />
    ) : (
      <RequestCards showData={showData} addUpVote={addUpVote} />
    );

  const { productRequests } = allData;

  return (
    <div className="App">
      <div className="App-col one">
        <FrontEndMentorHeader />
        <Filter filter={filter} showAll={showAll} />
        <Roadmap />
      </div>
      <div className="App-col">
        <ToolBar callback={handleChangeSort} sortOption={sortOption} />
        {showCards}
      </div>
    </div>
  );
};

export default App;

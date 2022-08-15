import { useState } from 'react';
import { FrontEndMentorHeader } from '../components/FrontEndMentor';
import { Filter } from '../components/Filter';
import { Roadmap } from '../components/Roadmap';
import { ToolBar } from '../components/ToolBar';
import { RequestCards } from '../components/RequestCards';
import { data } from 'data';
import { ProductRequest } from 'types';
import { NoFeedback } from 'components/NoFeedback';
import '../styles/App.scss';
import { EventBusyTwoTone, SafetyCheckRounded } from '@mui/icons-material';
import { isTemplateTail } from 'typescript';

const App = () => {
  const [allData, setAllData] = useState(data);
  const [showData, setShowData] = useState<ProductRequest[]>(
    allData.productRequests,
  );
  const [disabledUpVotes, setDisableUpVote] = useState<any>([]);
  const [noData, setNoData] = useState('');
  const [sortOption, setSortOption] = useState<string>('Most Up Votes');
  const [check, setCheck] = useState('');
  const showAll = () => {
    setNoData('');
    setShowData(productRequests);
  };

  const filter = (productCategory: string) => {
    let filteredItems = productRequests.filter((request) => {
      return request.category === productCategory;
    });

    if (filteredItems.length === 0) {
      setNoData('none');
    } else {
      setNoData('');
      setShowData(filteredItems);
    }
  };

  const handleChangeSort = (event: any) => {
    const newSortOption = event.target.id;

    if (newSortOption === 'most-upvotes') {
      let mostUpVotes = showData.sort((a: any, b: any) => {
        setSortOption('Most Up Votes');
        return b.upvotes - a.upvotes;
      });
      setShowData(mostUpVotes);
    } else if (newSortOption === 'least-upvotes') {
      let leastUpVotes = showData.sort((a: any, b: any) => {
        setSortOption('Least Up Votes');
        return a.upvotes - b.upvotes;
      });
      setShowData(leastUpVotes);
    } else if (newSortOption === 'most-comments') {
      let mostComments = showData
        .map((data) => {
          if (data.comments === undefined) {
            data.comments = [];
            return data;
          } else {
            return data;
          }
        })
        .sort((a: any, b: any) => {
          return b.comments.length - a.comments.length;
        });
      setShowData(mostComments);
      setSortOption('Most Comments');
    } else {
      let leastComments = showData
        .map((data) => {
          if (data.comments === undefined) {
            data.comments = [];
            return data;
          } else {
            return data;
          }
        })
        .sort((a: any, b: any) => {
          return a.comments.length - b.comments.length;
        });
      setSortOption('Least Comments');
      setShowData(leastComments);
    }
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
    noData === 'none' ? (
      <NoFeedback />
    ) : (
      <RequestCards
        showData={showData}
        addUpVote={addUpVote}
        disabledUpVotes={disabledUpVotes}
      />
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
        <ToolBar
          callback={handleChangeSort}
          sortOption={sortOption}
          check={check}
        />
        {showCards}
      </div>
    </div>
  );
};

export default App;

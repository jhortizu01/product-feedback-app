import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
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

  const filter = (productCategory: string) => {
    let filteredItems = productRequests.filter((request) => {
      return request.category === productCategory;
    });
    setShowData(filteredItems);
  };

  const showCards =
    showData.length === 0 ? (
      <NoFeedback />
    ) : (
      <RequestCards showData={showData} />
    );

  const { productRequests } = allData;
  console.log(showData);
  return (
    <div className="App">
      <div className="App-col one">
        <FrontEndMentorHeader />
        <Filter
          productRequests={productRequests}
          showData={showData}
          setShowData={setShowData}
        />
        <Roadmap />
      </div>
      <div className="App-col">
        <ToolBar />
        {showCards}
      </div>
    </div>
  );
};

export default App;

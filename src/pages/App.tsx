import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import '../styles/App.scss';
import { FrontEndMentorHeader } from '../components/FrontEndMentor';
import { Filter } from '../components/Filter';
import { Roadmap } from '../components/Roadmap';
import { ToolBar } from '../components/ToolBar';
import { RequestCards } from '../components/RequestCards';
import data from 'data.json';

const App = () => {
  const [allData, setAllData] = useState(data);

  useEffect(() => {
    setAllData(allData);
  });

  return (
    <div className="App">
      <div className="App-col one">
        <FrontEndMentorHeader />
        <Filter />
        <Roadmap />
      </div>
      <div className="App-col">
        <ToolBar />
        <RequestCards productRequests={allData.productRequests} />
      </div>
    </div>
  );
};

export default App;

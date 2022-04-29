import React, { useState } from 'react';
import logo from './logo.svg';
import '../styles/App.scss';
import { FrontEndMentorHeader } from '../components/FrontEndMentor';
import { Filter } from '../components/Filter';
import { Roadmap } from '../components/Roadmap';
import { ToolBar } from '../components/ToolBar';

function App() {
  return (
    <div className="App">
      <div className="App-col one">
        <FrontEndMentorHeader />
        <Filter />
        <Roadmap />
      </div>
      <div className="App-col">
        <ToolBar />
      </div>
    </div>
  );
}

export default App;

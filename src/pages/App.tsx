import React from 'react';
import logo from './logo.svg';
import '../styles/App.scss';
import { FrontEndMentorHeader } from '../components/FrontEndMentor';
import { Filter } from '../components/Filter';
import { Roadmap } from '../components/Roadmap'


function App() {
  return (
    <div className="App">
      <FrontEndMentorHeader />
      <Filter />
      <Roadmap />
    </div>
  );
}

export default App;

import { useState } from 'react';
import '../styles/App.scss';
import { FrontEndMentorHeader } from '../components/FrontEndMentor';
import { Filter } from '../components/Filter';
import { Roadmap } from '../components/Roadmap';
import { ToolBar } from '../components/ToolBar';
import { RequestCards } from '../components/RequestCards';
import { data } from 'data';
import { ProductRequest } from 'types';

const App = () => {
  const [allData, setAllData] = useState(data);
  const [showData, setShowData] = useState<ProductRequest[]>(
    allData.productRequests,
  );

  const { productRequests } = allData;

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
        <RequestCards showData={showData} />
      </div>
    </div>
  );
};

export default App;

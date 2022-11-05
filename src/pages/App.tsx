import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { Feedback } from './Feedback';

const App = () => {
  const [productRequests, setProductRequests] = useState<ProductRequest[]>(
    data.productRequests,
  );
  const [currentUser, setUser] = useState<object>(data.currentUser);
  const [initialData, setInitialData] = useState<ProductRequest[]>([]);
  const [disabledUpVotes, setDisableUpVote] = useState<ProductRequest[]>([]);
  const [noData, setNoData] = useState('');
  const [sortOption, setSortOption] = useState<string>('Most Up Votes');
  const [check, setCheck] = useState('');
  const [hamburger, setHamburgerState] = useState<string>('close');
  const [modalMobile, setModalMobile] = useState<string>('');
  const [mobileOverlay, setMobileOverlay] = useState<string>('');
  const [ontablet, setIsTablet] = useState('not-tablet');
  const [screenSize, setScreenSize] = useState('mobile');
  const [currentFeedback, setCurrentFeedback] = useState<number>(0);

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
    detectScreenSize();
    window.addEventListener('resize', detectScreenSize);
  }, []);

  const mobileToggleHamburger = (): void => {
    if (hamburger === 'close') {
      setHamburgerState('open');
      setModalMobile('');
      setMobileOverlay('show-overlay');
    } else {
      setHamburgerState('close');
      setModalMobile('hidden');
      setMobileOverlay('');
    }
  };

  const detectScreenSize = () => {
    if (window.innerWidth <= 768) {
      setModalMobile('hidden');
      setScreenSize('mobile');
      setHamburgerState('close');
    } else {
      setModalMobile('');
    }

    if (window.innerWidth >= 768) {
      setScreenSize('tablet');
      setModalMobile('');
      setHamburgerState('hidden');
    }

    if (window.innerWidth >= 1200) {
      setScreenSize('desktop');
    }

    console.log(window.innerWidth);
  };

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
    <Routes>
      <Route
        path="/"
        element={
          <div className="App">
            <div className={`App-col one ${screenSize}`}>
              <FrontEndMentorHeader
                hamburger={hamburger}
                mobileToggleHamburger={mobileToggleHamburger}
              />
              <div className={`${modalMobile} filters`}>
                <Filter filter={filter} showAll={showAll} />
                <Roadmap />
              </div>
            </div>
            <div className={`App-col ${mobileOverlay}`}>
              <ToolBar
                callback={handleChangeSort}
                sortOption={sortOption}
                check={check}
                mobileOverlay={mobileOverlay}
              />
              {noData === 'none' || productRequests?.length === 0 ? (
                <NoFeedback />
              ) : (
                <RequestCards
                  productRequests={productRequests}
                  addUpVote={addUpVote}
                  disabledUpVotes={disabledUpVotes}
                  setCurrentFeedback={setCurrentFeedback}
                />
              )}
            </div>
          </div>
        }
      />
      <Route
        path="/feedback/:id"
        element={
          <Feedback
            productRequests={productRequests}
            currentFeedback={currentFeedback}
            addUpVote={addUpVote}
            disabledUpVotes={disabledUpVotes}
            currentUser={currentUser}
          />
        }
      />
    </Routes>
  );
};

export default App;

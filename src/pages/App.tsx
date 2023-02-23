import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FrontEndMentor } from '../front-end-mentor/FrontEndMentor';
import { Filter } from '../filter/Filter';
import { Roadmap } from '../components/Roadmap';
import { Toolbar } from '../toolbar/Toolbar';
import { RequestCards } from '../components/RequestCards';
import { data } from 'data';
import { AllData, ProductRequest } from 'types';
import { NoFeedback } from 'nofeedback/NoFeedback';
import '../styles/App.scss';
import { Feedback } from './Feedback';
import { CreateFeedback } from '../createfeedback/CreateFeedback';

const App = () => {
  const [productRequests, setProductRequests] = useState<ProductRequest[]>([]);
  const [currentUser, setUser] = useState<object>({});
  const [initialData, setInitialData] =
    useState<ProductRequest[]>(productRequests);
  const [disabledUpVotes, setDisableUpVote] = useState<ProductRequest[]>([]);
  const [noData, setNoData] = useState('');
  const [sortOption, setSortOption] = useState<string>('most-upvotes');
  const [hamburger, setHamburgerState] = useState<string>('close');
  const [modalMobile, setModalMobile] = useState<string>('');
  const [mobileOverlay, setMobileOverlay] = useState<string>('');
  const [ontablet, setIsTablet] = useState('not-tablet');
  const [screenSize, setScreenSize] = useState('mobile');
  const [currentFeedback, setCurrentFeedback] = useState<number>(0);

  const fetchProductRequests = () =>
    fetch('/api/productrequests')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProductRequests(data);
        setUser(data.currentUser);
        setInitialData(data);
      })
      .catch((error: any) => console.log(error));

  const fetchUser = () =>
    fetch('/api/user')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error: any) => console.log(error));

  useEffect(() => {
    Promise.all([fetchProductRequests(), fetchUser()]);
  }, []);

  const showAll = () => {
    setNoData('');
    fetchProductRequests();
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
        setSortOption('most-upvotes');
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
              <FrontEndMentor
                hamburger={hamburger}
                mobileToggleHamburger={mobileToggleHamburger}
              />
              <div className={`${modalMobile} filters`}>
                <Filter filter={filter} showAll={showAll} />
                <Roadmap />
              </div>
            </div>
            <div className={`App-col ${mobileOverlay}`}>
              <Toolbar
                callback={handleChangeSort}
                sortOption={sortOption}
                mobileOverlay={mobileOverlay}
                numberOfRequests={productRequests?.length}
                setSortOption={setSortOption}
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
      <Route
        path="/create-feedback/"
        element={<CreateFeedback productRequests={productRequests} />}
      />
    </Routes>
  );
};

export default App;

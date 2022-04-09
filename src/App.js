import React from 'react';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';
import { useState } from 'react';
import './css/style.min.css';

export default function App() {
  const [isOnStartPage, setIsOnStartPage] = useState(true);
  const [categories, setCategories] = useState([]);
  const [inputData, setInputData] = useState({});
  const [showModal, setShowModal] = useState(false);

  function clickHandler() {
    !inputData.numberOfQuestions || !inputData.category
      ? setShowModal(true)
      : setIsOnStartPage(!isOnStartPage);
  }

  function PlayAgain() {
    setIsOnStartPage(true);
    setInputData({});
  }

  return (
    <div className="App">
      <main className="AppMain">
        <div className="bgYellow"></div>
        <div className="bgBlue"></div>
        {isOnStartPage ? (
          <StartPage
            categories={categories}
            clickHandler={clickHandler}
            inputData={inputData}
            setCategories={setCategories}
            setInputData={setInputData}
            setShowModal={setShowModal}
            showModal={showModal}
          />
        ) : (
          <QuizPage inputData={inputData} PlayAgain={PlayAgain} />
        )}
      </main>
    </div>
  );
}

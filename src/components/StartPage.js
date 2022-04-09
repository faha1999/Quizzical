import { useEffect } from 'react';

export default function StartPage({
  categories,
  clickHandler,
  inputData,
  setCategories,
  setInputData,
  showModal,
  setShowModal,
}) {
  function handleOnChange(e) {
    const { name, value } = e.target;
    setInputData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    fetch('https://opentdb.com/api_category.php')
      .then((response) => response.json())
      .then((data) => setCategories(data.trivia_categories));
  }, []);

  return (
    <main>
      {showModal && (
        <div className="modal">
          <div className="content">
            <p>Select All Options</p>
            <button
              onClick={() => setShowModal(false)}
              className="button close"
            >
              x
            </button>
          </div>
        </div>
      )}

      <h1 className="quizTitle">Quizzical</h1>
      <form>
        <label htmlFor="numberofQuestions"> Select Number of Questions</label>
        <br />
        <select
          name="numberOfQuestions"
          id="numberOfQuestions"
          value={inputData.numberOfQuestions}
          onChange={handleOnChange}
        >
          <option value="">Select Number of Questions</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>

        <br />

        <label htmlFor="">Select Category</label>
        <br />
        <select
          name="category"
          id="category"
          value={inputData.category}
          onChange={handleOnChange}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => {
            return (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            );
          })}
        </select>
      </form>
      <button onClick={clickHandler} className="button btnStart">
        Start Quiz
      </button>
    </main>
  );
}

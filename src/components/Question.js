import { useEffect, useState } from 'react';

export default function Question({
  answers,
  onClickAnswer,
  question,
  selectedAnswer,
  showAnswer
}) {
  const [answersSorted, setAnswersSorted] = useState(answers);

  useEffect(() => {
    setAnswersSorted((prev) => {
      return prev
        .map((answer) => ({ ...answer, order: Math.random() - 0.5 }))
        .sort(({ order }) => order);
    });
  }, []);

  function generateAnswer({ answer, isCorrect }) {
    const currentSelected = selectedAnswer === answer;
    const className = ['answerBtn'];

    if (currentSelected) {
      className.push('selected');
    }

    if (isCorrect && showAnswer) {
      className.push('correct');
    } else if (!isCorrect && currentSelected && showAnswer) {
      className.push('wrong');
    } else if (showAnswer) {
      className.push('show');
    }

    return (
      <button
        onClick={() => onClickAnswer(answer)}
        key={answer}
        className={`${className.join(' ')}`}
      >
        {answer.replaceAll('&#039;', "'").replaceAll('&quot;', '"')}
      </button>
    );
  }

  return (
    <div className="quizQuestion" key={question}>
      <h3>{question.replaceAll('&#039;', "'").replaceAll('&quot;', '"')}</h3>
      <div className="answersList">{answersSorted.map(generateAnswer)}</div>
      <hr />
    </div>
  );
}

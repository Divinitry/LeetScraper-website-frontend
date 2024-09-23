import { useState, useEffect } from "react";

const Feedback = ({ codeQuestion, feedback }) => {
  const [storedFeedback, setStoredFeedback] = useState(null);

  useEffect(() => {
    if (feedback) {
      localStorage.setItem(codeQuestion, JSON.stringify(feedback));
    }
  }, [codeQuestion, feedback]);

  useEffect(() => {
    const savedFeedback = localStorage.getItem(codeQuestion);
    if (savedFeedback) {
      setStoredFeedback(JSON.parse(savedFeedback));
    }
  }, [codeQuestion]);

  return (
    <div>
      <p>{feedback ? feedback.feedback : storedFeedback ? storedFeedback.feedback : 'No feedback yet'}</p>
      <p>
        {feedback
          ? `Rating: ${feedback.rating}`
          : storedFeedback
          ? `Rating: ${storedFeedback.rating}`
          : 'Rating goes here'}
      </p>
    </div>
  );
};

export default Feedback;

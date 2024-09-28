import { useState, useEffect } from "react";

const Feedback = ({ codeQuestion, feedback }) => {
  const [storedFeedback, setStoredFeedback] = useState(null);

  useEffect(() => {
    if (feedback) {
      setStoredFeedback(feedback);
    }
  }, [codeQuestion, feedback]);

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

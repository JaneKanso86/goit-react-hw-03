import { useState, useEffect } from 'react';
import React from 'react';
import Description from '../Description/Description';
import Feedback from '../Feedback/Feedback';
import Options from '../Options/Options';
import Notification from '../Notification/Notification';

export default function App() {
  const [values, setFeedback] = useState(() => {
    const savedValues = window.localStorage.getItem('saved-values');

    if (savedValues !== null) {
      return JSON.parse(savedValues);
    }

    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });
  const updateFeedback = (feedbackType) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };
  useEffect(() => {
    window.localStorage.setItem('saved-values', JSON.stringify(values));
  }, [values]);

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  const totalFeedback = values.good + values.neutral + values.bad;

  const positiveFeedback = Math.round((values.good / totalFeedback) * 100);

  return (
    <div>
      <Description
        title="Sip Happens Café"
        content="Please leave your feedback about our service by selecting one of the
        options below."
      ></Description>
      <Options
        onLeaveFeedback={updateFeedback}
        totalFeedBack={totalFeedback}
        onResetFeedback={resetFeedback}
      ></Options>

      {totalFeedback > 0 ? (
        <Feedback
          values={values}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        ></Feedback>
      ) : (
        <Notification></Notification>
      )}
    </div>
  );
}

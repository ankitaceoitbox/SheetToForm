import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MCQDataState from './context/mcq.state';
import LoginQuestionState from './context/loginquestion.state';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <LoginQuestionState>
    <MCQDataState>
      <App />
    </MCQDataState>
  </LoginQuestionState>
);

reportWebVitals();

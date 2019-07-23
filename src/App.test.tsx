import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import sessions from "./sessions.json";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App sessions={sessions}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

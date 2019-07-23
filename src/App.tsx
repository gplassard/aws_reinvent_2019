import React from 'react';
import './App.css';
import { Session } from './model';
import Sessions from './components/Sessions';

interface Props {
  sessions: Session[]
}

const App: React.FC<Props> = (props: Props) => {
  return (
    <React.Fragment>
      <Sessions sessions={props.sessions}></Sessions>

    </React.Fragment>
  );
}

export default App;

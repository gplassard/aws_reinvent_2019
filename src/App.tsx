import React, { useState } from 'react';
import './App.css';
import { Session, Filters } from './model';
import Sessions from './components/Sessions';
import SessionFilters from './components/SessionFilters';

interface Props {
  sessions: Session[]
}

interface State {
  favorites:  {[id: string]: boolean}
  deleted: {[id: string]: boolean}
  filteredSessions: Session[]
}

const filterSession = (session: Session, state: State, filters: Filters) => {
  if (filters.days && filters.days.length && filters.days.indexOf(session.day) < 0) {
    return false;
  }
  if (filters.types && filters.hotels.length && filters.hotels.indexOf(session.hotel) < 0) {
    return false;
  }
  if (filters.types && filters.types.length && filters.types.indexOf(session.type) < 0) {
    return false;
  }
  if (filters.levels && filters.levels.length && filters.levels.indexOf(session.level) < 0) {
    return false;
  }
  if (filters.title && filters.title.length && !session.title.toLowerCase().includes(filters.title)) {
    return false;
  }
  if (filters.favorites && state.favorites[session.id]) {
    return false;
  }
  if (!filters.deletes && state.deleted[session.id]) {
    return false;
  }
  return true;
}

const App: React.FC<Props> = (props: Props) => {
  const [state, setState] = useState({
    filteredSessions: props.sessions, 
    deleted: {},
    favorites: {}
  });

  const onFiltersChange = (filters: Filters) => {
    const filteredSessions = props.sessions.filter(session => filterSession(session, state, filters));
    setState({...state, filteredSessions});
    console.table("new filters", filters)
  }

  return (
    <React.Fragment>
      <SessionFilters sessions={props.sessions} onFiltersChange={onFiltersChange} sessionsCount={state.filteredSessions.length}></SessionFilters>
      <Sessions sessions={state.filteredSessions}></Sessions>
    </React.Fragment>
  );
}

export default App;

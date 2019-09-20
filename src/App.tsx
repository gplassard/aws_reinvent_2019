import React, { useState } from 'react';
import './App.css';
import { Session, Filters, DEFAULT_FILTERS } from './model';
import Sessions from './components/Sessions';
import SessionFilters from './components/SessionFilters';
import Navigation from './components/Navigation';
import {auth} from "./services/FirebaseService";

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
  if (filters.favorites && !state.favorites[session.id]) {
    return false;
  }
  if (!filters.deletes && state.deleted[session.id]) {
    return false;
  }
  if (filters.deletes && !state.deleted[session.id]) {
    return false;
  }
  return true;
};

const App: React.FC<Props> = (props: Props) => {
  const [state, setState] = useState({
    filteredSessions: props.sessions, 
    deleted: {},
    favorites: {}
  } as State);

  const [loggedUser, setLoggedUser]= React.useState(auth.currentUser);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  React.useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setLoggedUser(user);
    })
  }, []);

  const updateFiltered = () => {
    const filteredSessions = props.sessions.filter(session => filterSession(session, state, filters));
    setState({...state, filteredSessions});
  }

  const onFiltersChange = async (filters: Filters) => {
    setFilters(filters);
    if (loggedUser) {
      console.log("logged in");
    }
    else {
      console.log("not logged in")
    }
    console.table("new filters", filters)
    updateFiltered();
  };

  const onDelete = (id: string, isDelete: boolean) => {
    state.deleted[id] = isDelete;
    setState({...state});
    updateFiltered();
  }

  const onFavorite = (id: string, isFavorite: boolean) => {
    state.favorites[id] = isFavorite;
    setState({...state});
    updateFiltered();
  }

  return (
    <React.Fragment>
      <Navigation loggedUser={loggedUser}></Navigation>
      <SessionFilters sessions={props.sessions} filters={filters} onFiltersChange={onFiltersChange} sessionsCount={state.filteredSessions.length}></SessionFilters>
      <Sessions sessions={state.filteredSessions} favorites={state.favorites} deleted={state.deleted} 
        onDelete={onDelete} onFavorite={onFavorite}></Sessions>
    </React.Fragment>
  );
};

export default App;

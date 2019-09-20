import React, { useState } from 'react';
import './App.css';
import { Session, Filters, DEFAULT_FILTERS, Deleted, Favorites } from './model';
import Sessions from './components/Sessions';
import SessionFilters from './components/SessionFilters';
import Navigation from './components/Navigation';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import { User } from 'firebase';

interface Props {
  sessions: Session[]
  loggedUser: User | null
  favorites: Favorites
  deleted: Deleted
  onFavorite: (id: string, isFavorite: boolean) => any
  onDelete: (id: string, isDelete: boolean) => any
}

const filterSession = (session: Session, favorites: Favorites, deleted: Deleted, filters: Filters) => {
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
  if (filters.favorites && !favorites[session.id]) {
    return false;
  }
  if (!filters.deletes && deleted[session.id]) {
    return false;
  }
  if (filters.deletes && !deleted[session.id]) {
    return false;
  }
  return true;
};

const App: React.FC<Props> = (props) => {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  
  const onFiltersChange = (filters: Filters) => {
    setFilters({...filters});
  };

  const filteredSessions = props.sessions.filter(session => filterSession(session, props.favorites, props.deleted, filters));

  function Index() {
    return <Redirect to={{pathname: '/listing'}} />
  }

  function Listing() {
    return (<Sessions sessions={filteredSessions} favorites={props.favorites} deleted={props.deleted}
        onDelete={props.onDelete} onFavorite={props.onFavorite}></Sessions>)
  }

  function Agenda() {
    return <h2>Agenda</h2>
  }

  return (
    <Router>
      <Navigation loggedUser={props.loggedUser}></Navigation>
      <SessionFilters sessions={props.sessions} filters={filters} onFiltersChange={onFiltersChange} sessionsCount={filteredSessions.length}></SessionFilters>
      <Route path="/" exact component={Index} />
      <Route path="/listing" component={Listing} />
      <Route path="/agenda" component={Agenda} />
    </Router>
  );
};

export default App;

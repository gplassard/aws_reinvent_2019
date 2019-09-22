import React, { useState } from 'react';
import './App.css';
import { Session, Filters, DEFAULT_FILTERS, Deleted, Favorites } from './model';
import Sessions from './components/Sessions';
import SessionFilters from './components/SessionFilters';
import Navigation from './components/Navigation';
import {auth, firestore} from "./services/FirebaseService";

interface Props {
  sessions: Session[]
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

const App: React.FC<Props> = (props: Props) => {
  const [filteredSessions, setFilteredSessions] = useState(props.sessions);
  const [deleted, setDeleted] = useState({} as Deleted);
  const [favorites, setFavorites] = useState({} as Favorites);
  const [loggedUser, setLoggedUser]= React.useState(auth.currentUser);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  React.useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setLoggedUser(user);
    })
  }, []);

  React.useEffect(() => {
    if (loggedUser && loggedUser.uid) {
      return firestore.collection('deleted').doc(loggedUser.uid).onSnapshot((snapshot) =>{
        console.log("new deleted", snapshot.data())
        setDeleted(snapshot.data() || {});
        updateFiltered();
      });
    }
    else {
      const deleted = localStorage.getItem("deleted");
      setDeleted(deleted ? JSON.parse(deleted) : {});
      updateFiltered();
    }
  }, [loggedUser]);

  React.useEffect(() => {
    if (loggedUser && loggedUser.uid) {
      return firestore.collection('favorites').doc(loggedUser.uid).onSnapshot((snapshot) =>{
        console.log("new favorites", snapshot.data())
        setFavorites(snapshot.data() || {});
        updateFiltered();
      });
    }
    else {
      const favorites = localStorage.getItem("favorites");
      setFavorites(favorites ? JSON.parse(favorites) : {});
      updateFiltered();
    }
  }, [loggedUser]);

  const updateFiltered = () => {
    console.table("filter", loggedUser && loggedUser.uid, favorites, deleted)
    const filteredSessions = props.sessions.filter(session => filterSession(session, favorites, deleted, filters));
    setFilteredSessions(filteredSessions);
  }

  const onFiltersChange = async (filters: Filters) => {
    setFilters(filters);
    updateFiltered();
  };

  const onDelete = async (id: string, isDelete: boolean) => {
    if (isDelete) {
      deleted[id] = isDelete;  
    }
    else {
      delete deleted[id];
    }
    setDeleted({...deleted});
    if (loggedUser && loggedUser.uid) {
      await firestore.collection('deleted').doc(loggedUser.uid).set(deleted);
    }
    else {
      localStorage.setItem("deleted", JSON.stringify(deleted));
    }
    updateFiltered();
  }

  const onFavorite = async (id: string, isFavorite: boolean) => {
    if (isFavorite) {
      favorites[id] = isFavorite;  
    }
    else {
      delete favorites[id];
    }
    setFavorites({...favorites});
    if (loggedUser && loggedUser.uid) {
      await firestore.collection('favorites').doc(loggedUser.uid).set(favorites);
    }
    else {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    updateFiltered();
  }

  return (
    <React.Fragment>
      <Navigation loggedUser={loggedUser}></Navigation>
      <SessionFilters sessions={props.sessions} filters={filters} onFiltersChange={onFiltersChange} sessionsCount={filteredSessions.length}></SessionFilters>
      <Sessions sessions={filteredSessions} favorites={favorites} deleted={deleted} 
        onDelete={onDelete} onFavorite={onFavorite}></Sessions>
    </React.Fragment>
  );
};

export default App;

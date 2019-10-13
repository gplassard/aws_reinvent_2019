import { Session, Deleted, Favorites, Preferences, DEFAULT_PREFERENCES } from "./model";
import React, { useState, useEffect } from "react";
import { auth, firestore } from "./services/FirebaseService";
import App from "./App";

interface Props {
  sessions: Session[];
}

const AppWithFirebase: React.FC<Props> = (props: Props) => {
  const [deleted, setDeleted] = useState({} as Deleted);
  const [favorites, setFavorites] = useState({} as Favorites);
  const [loggedUser, setLoggedUser] = useState(auth.currentUser);
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

  const onDelete = async (session: Session, isDelete: boolean) => {
    const toDelete = preferences.applyToRepeats ? session.repeats : [session.id];
    
    for (const d of toDelete) {
      if (isDelete) {
        deleted[d] = isDelete;
      }
      else {
        delete deleted[session.id];
      }
    } 
    setDeleted({ ...deleted });
    if (loggedUser && loggedUser.uid) {
      await firestore
        .collection("deleted")
        .doc(loggedUser.uid)
        .set(deleted);
    } else {
      localStorage.setItem("deleted", JSON.stringify(deleted));
    }
  };

  const onFavorite = async (session: Session, isFavorite: boolean) => {
    const toFavorite = preferences.applyToRepeats ? session.repeats : [session.id];
    
    for (const f of toFavorite) {
      if (isFavorite) {
        favorites[f] = isFavorite;
      }
      else {
        delete favorites[f];
      }
    } 
    setFavorites({ ...favorites });
    if (loggedUser && loggedUser.uid) {
      await firestore
        .collection("favorites")
        .doc(loggedUser.uid)
        .set(favorites);
    } else {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setLoggedUser(user);
    });
  }, []);

  useEffect(() => {
    if (loggedUser && loggedUser.uid) {
      return firestore
        .collection("deleted")
        .doc(loggedUser.uid)
        .onSnapshot(snapshot => {
          setDeleted(snapshot.data() || {});
        });
    } else {
      const deleted = localStorage.getItem("deleted");
      setDeleted(deleted ? JSON.parse(deleted) : {});
    }
  }, [loggedUser]);

  useEffect(() => {
    if (loggedUser && loggedUser.uid) {
      return firestore
        .collection("favorites")
        .doc(loggedUser.uid)
        .onSnapshot(snapshot => {
          setFavorites(snapshot.data() || {});
        });
    } else {
      const favorites = localStorage.getItem("favorites");
      setFavorites(favorites ? JSON.parse(favorites) : {});
    }
  }, [loggedUser]);

  const onPreferences = async(p: Preferences) => {
    setPreferences({...p});
    if (loggedUser && loggedUser.uid) {
      await firestore
        .collection("preferences")
        .doc(loggedUser.uid)
        .set(preferences);
    } else {
      localStorage.setItem("preferences", JSON.stringify(preferences));
    }
  }
  
  useEffect(() => {
    if (loggedUser && loggedUser.uid) {
      return firestore
        .collection("preferences")
        .doc(loggedUser.uid)
        .onSnapshot(snapshot => {
          setPreferences(snapshot.data() as Preferences || DEFAULT_PREFERENCES);
        });
    } else {
      const preferences = localStorage.getItem("preferences");
      setPreferences(preferences ? JSON.parse(preferences) : DEFAULT_PREFERENCES);
    }
  }, [loggedUser]);

  return (
    <App sessions={props.sessions} favorites={favorites} deleted={deleted} 
    updatePreferences={onPreferences} preferences={preferences}
    onDelete={onDelete} onFavorite={onFavorite} loggedUser={loggedUser}></App>
  );
};

export default AppWithFirebase;

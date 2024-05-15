import './App.css'

import Landing from './component/Landing/Landing';
import Topbar from './component/Topbar/Topbar';
import Home from './component/Home/Home';
import GenreViewCard from './component/GenreViewCard/GenreViewCard';
import BookView from './component/BookView/BookView';
import SearchBook from './component/SearchBook/SearchBook';
import AddBook from './component/AddBook/AddBook';
import Auth from './component/Auth/Auth';
import Community from './component/Community/Community';
import ViewAuthor from './component/ViewAuthor/ViewAuthor';

import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/firebase';

import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

import loadingImage from '../public/mybooklist_logo.svg'

const showTopbar = window.location.pathname !== "/" && 
                   window.location.pathname !== "/auth";


const App = () => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect (() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          if(user){
              setUser(user);
              setIsFetching(false);
              return;
          }
          setUser(null);
          setIsFetching(false)
      });
      return () => unsubscribe();
  }, []);

  if(isFetching){
      return(
          <div className='loading'>
            <div>
                <img src={loadingImage}/>
            </div>
                <p>Loading...</p>
          </div>
      )
  }
  return(
    <>
        <Router>
            {showTopbar && <Topbar user={user}/>}
            
            <Routes>
                <Route path="/" element={<Landing user={user}/>} />
                <Route path="/auth" element={<Auth user={user} />} />
                <Route path="/home" element={
                    <ProtectedRoute user={user}>
                        <Home></Home>
                    </ProtectedRoute>}/>
                <Route path="/view/genre/:subject" element={
                    <ProtectedRoute user={user}>
                        <GenreViewCardRoute/>
                    </ProtectedRoute>}/>
                <Route path="/view/book/:subject" element={
                    <ProtectedRoute user={user}>
                        <BookViewRoute/>
                    </ProtectedRoute>}/>
                <Route path="/view/author/:subject" element={
                    <ProtectedRoute user={user}>
                        <AuthorViewRoute/>
                    </ProtectedRoute>}/>
                <Route path="/search/:subject" element={
                    <ProtectedRoute user={user}>
                        <SearchRoute/>
                    </ProtectedRoute>}/>
                <Route path="/addbook/:subject" element={
                    <ProtectedRoute user={user}>
                        <AddBookRoute user={user}/>
                    </ProtectedRoute>}/>
                <Route path="/community" element={
                    <ProtectedRoute user={user}>
                        <Community/>
                    </ProtectedRoute>}/>
                <Route path="*" element={<Navigate to="/home" />} />

            </Routes>
        </Router>
    </>
  )
}

const GenreViewCardRoute = () => {
  const { subject } = useParams();
  return <GenreViewCard genre={subject} />;
}

const BookViewRoute = () => {
  const { subject } = useParams();
  return <BookView title={subject} />;
}

const AuthorViewRoute = () => {
    const { subject } = useParams();
    return <ViewAuthor author={subject} />;
  }

const SearchRoute = () => {
  const { subject } = useParams();
  return <SearchBook book={subject} />;
}

const AddBookRoute = ({ user }) => {
  const { subject } = useParams();
  return <AddBook title={subject} user={user} />;
}


export default App;
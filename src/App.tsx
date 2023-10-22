import { useEffect } from 'react';
import './App.css';
import { getPosts /* getPostsController */ } from './api/requests';

export const App = () => {
  useEffect(() => {
    getPosts();
    // getPostsController.abort();
  }, []);

  return <div className='App'>App</div>;
};

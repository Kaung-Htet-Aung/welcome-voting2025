import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Choose Category</h1>
      <button onClick={() => navigate('/category/king')}>King</button>
      <button onClick={() => navigate('/category/queen')}>Queen</button>
    </div>
  );
};

export default HomePage;

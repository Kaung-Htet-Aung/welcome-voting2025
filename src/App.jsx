// src/App.jsx
import React from 'react';
import Boy from './Boy';
import Girl from './Girl';
import LoginPage from './pages/Login';
import CandidateList from './pages/CandidateList';
import InsertPage from './pages/InsertPage';
import { BrowserRouter,Routes,Route} from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Boy/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;

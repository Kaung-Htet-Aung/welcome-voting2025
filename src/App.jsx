// src/App.jsx
import React from 'react';
import Boy from './Boy';
import Girl from './Girl';
import LoginPage from './pages/Login';
import Votes from './pages/Votes';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter,Routes,Route} from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route
              path="/login"
              element={
                 <LoginPage/>
               }
           />
          <Route
              path="/"
              element={
            
                 <Boy/>
              
               }
           />
           <Route
              path="/girl"
              element={
            
                 <Girl/>
              
               }
           />
              <Route
              path="/girl"
              element={
              
                 <Girl/>
             
               }
           />
            <Route
              path="/votes"
              element={
              
                 <Votes/>
               
               }
           />
        </Routes>
    </BrowserRouter>
  );
};

export default App;

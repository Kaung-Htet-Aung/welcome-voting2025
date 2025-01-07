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
              <ProtectedRoute>
                 <Boy/>
              </ProtectedRoute>
               }
           />
           <Route
              path="/girl"
              element={
              <ProtectedRoute>
                 <Girl/>
               </ProtectedRoute>
               }
           />
              <Route
              path="/girl"
              element={
              <ProtectedRoute>
                 <Girl/>
               </ProtectedRoute>
               }
           />
            <Route
              path="/votes"
              element={
              <ProtectedRoute>
                 <Votes/>
               </ProtectedRoute>
               }
           />
        </Routes>
    </BrowserRouter>
  );
};

export default App;

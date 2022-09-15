import React from 'react';
// import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login';
import AboutPage from './AboutPage';

function App() {
  const token = localStorage.getItem('accessToken');

  if(!token) {
    return <Login />
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route path="/aboutpage">
            <AboutPage />
          </Route>
          <Route path="/">
            <AboutPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
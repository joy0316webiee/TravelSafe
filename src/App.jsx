import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar, Footer } from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Forum from './pages/Forum';
import Lecture from './pages/Lecture';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

import './App.scss';

const App = () => (
  <Router>
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Forum} />
        <Route exact path="/about" component={About} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/forum" component={Forum} />
        <Route exact path="/lecture" component={Lecture} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default App;

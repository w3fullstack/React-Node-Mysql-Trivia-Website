import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AddQuestions from './AddQuestions';
import Exam from './Exam';
import Question from './Question';
import UpdateAnswer from './UpdateAnswer';
import logo from './logo.svg';
import Excel from './Exceljs'

import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {

  }

  callApi = async () => {
    const response = await fetch('/api/questions');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <Router>
        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to visit my Trivia!</h1>
        </header>
        <ul>
            <li className="App-menu-item"><Link to={'/'}>Exam</Link></li>
            <li className="App-menu-item"><Link to={'/AddQuestions'}>AddQuestions</Link></li>
            <li className="App-menu-item"><Link to={'/UpdateAnswer'}>UpdateAnswer</Link></li>
        </ul>
        <hr />
        
        <Switch>
            <Route exact path='/' component={Exam} />
            <Route exact path='/AddQuestions' component={AddQuestions} />
            <Route exact path='/UpdateAnswer' component={UpdateAnswer} />
            <Route exact path='/Question/:questionid' component={Question} />
            <Route exact path='/Excel' component={Excel} />
        </Switch>
      </div>

      </Router>
    );
  }
}

export default App;

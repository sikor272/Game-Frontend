import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Menu from './Menu';
import { UserContext } from './Auth';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import GameList from './Pages/GameList';
import NewGame from './Pages/NewGame';
import Game from './Pages/Game';
import EditGame from './Pages/EditGame';

function App() {
  return (
    <Router>
      <Menu/>
      <UserContext.Consumer>
      {user => (
          <Switch>
            <Route exact path='/register' render={() => !user.logged ? <Register /> : <Redirect to='/profile' />} />
            <Route exact path='/login' render={() => !user.logged ? <Login /> : <Redirect to='/profile' /> } />
            <Route exact path='/logout' render={() => user.logged ? <Logout /> : <Redirect to='/' />} />
            <Route exact path='/profile' render={() => user.logged ? <Profile /> : <Redirect to='/' />} />

            <Route exact path={['/', '/games']} render={() => <GameList/>  } />
            <Route exact path={'/admin/games/add'} render={props => user.admin ? <NewGame /> : <Redirect to='/' />} />
            <Route exact path={'/admin/games/edit/:id'} render={props => user.admin ? <EditGame id={props.match.params.id} /> : <Redirect to='/' />} />
            <Route exact path={'/games/:id'} render={props => <Game id={props.match.params.id} />} />

            <Route render={() => <Redirect to='/' />} />
            
          </Switch>
        )}
      </UserContext.Consumer>
    </Router>
    
  );
}

export default App;

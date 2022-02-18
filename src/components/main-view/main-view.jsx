import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { Row, Container, Col } from 'react-bootstrap';
// import Menu from '../NavBar/NavBar';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies, setUser } from '../../actions/actions';
import { MoviesList } from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from './../userProfile-view/userProfile-view';
import './main-view.scss';


class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  };

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  getMovies(token) {
    axios.get('https://quiet-ridge-54627.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {

        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let { movies, user } = this.props;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    return (
      <Router>

        <Route exact path="/register" render={() => {
          if (user) return <Redirect to="/" />
          return <RegistrationView />
        }} />

        <Row className='main-view justify-content-md-center'>
          <Route exact path='/' render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className='main-view' />;
            return <MoviesList movies={movies} />;
          }} />
        </Row>

        <Route exact path="/users/:username" render={({ match, history }) => {
          console.log('This is a user')

          if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
          if (movies.length === 0) return <div className="main-view" />;
          return <Col lg={9}>

            <NavBarView user={user} />
            <br />
            <UserView
              getUser={this.getUser}
              onBackClick={() => history.goBack()}
              removeMovie={(_id) => this.onRemoveFavorite(_id)}
            />
          </Col>

        }
        } />
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);






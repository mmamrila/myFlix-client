import React from 'react';
import axios from 'axios';
import { Row, Container, Col } from 'react-bootstrap';
import Menu from '../NavBar/NavBar';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import './main-view.scss';


export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
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
    axios.get('https://dashboard.heroku.com/apps/quiet-ridge-54627/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <Menu user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">

            <Route exact path="/" render={() => {
              /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
              if (!user) return <Col>
                <LoginView movies={movies} onLoggedIn={user => this.onLoggedIn(user)} />;
              </Col>

              // Before the movies have been loaded
              if (movies.length === 0) {
                return <div className="main-view" />,

                  movies.map(m => (
                    <Col md={3} key={m._id}>
                      <MovieCard movie={m} />
                    </Col>
                  ))
              }
            }} />
            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col lg={8} md={8}>
                <RegistrationView />
              </Col>
            }} />
            <Route path="/movies/:Id" render={({ match, history }) => {
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.Id)} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path={'/users/${user}'} render={({ match, history }) => {
              if (!user) return <Redirect to="/" />
              return <Col>
                <ProfileView movies={movies}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />
            <Route path={'/user-update/${user}'} render={({ match, history }) => {
              if (!user) return <Redirect to="/" />
              return <Col>
                <UserUpdate user={user}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />
          </Row>
        </Container>
      </Router>
    );
  }
}






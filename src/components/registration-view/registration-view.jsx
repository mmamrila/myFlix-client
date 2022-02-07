import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Button, Container, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '.src/registration-view.scss';

export function RegistrationView(props) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [values, setValues] = useState({
    nameErr: '',
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });


  const validate = () => {
    let isReq = true;
    if (name) {
      setValues({ ...values, nameErr: 'Name is required');
      isReq = false;
    }
    if (!username) {
      setValues({ ...values, userNameErr: 'Username Required' });
      isReq = false;
    } else if {
      setValues({ ...values, usernameErr: 'Username must be 5 characters long'})
        isReq = false;
    }
    if (!password) {
        setValues({ ...values, passwordErr: 'Password Required' })
        isReq = false;
      } else if (password.length < 6) {
        setValues({ ...values, passwordErr: 'Password must be 6 characters long' })
        isReq = false;
      }
    if (!email) {
      setValues({ ...values, emailErr: 'Email Required' });
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues({ ...values, emailErr: 'Email is invalid' });
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the server for authentication
    is(isReq){
      axios.post('https://dashboard.heroku.com/apps/quiet-ridge-54627/login', {
        Name: name,
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Registration successful, please login!');
          window.open('/', '_self'); // the second arguement '_self' is necessary  so that the page will open in the current tab
        })
        .catch(response => {
          console.error(response);
          alert('unable to register');
        });
    }
  };
  /* Send a request to the server for authentication */
  /* then call props.onLoggedIn(username) */
  // props.onLoggedIn(username);
};

return (
  <Row className="mt-5">
    <Col md={12}>
      <Form>
        <h3>SignUp</h3>
        <p></p>
        <Form.Group controlId="formUsername" className="reg-form-inputs">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
          {values.usernameErr && <p>{values.usernameErr}</p>}
        </Form.Group>

        <Form.Group controlId="formName" className="reg-form-inputs">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
          {values.nameErr && <p>{values.nameErr}</p>}
        </Form.Group>

        <Form.Group controlId="formPassword" className="reg-form-inputs">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
          {values.passwordErr && <p>{values.passwordErr}</p>}
        </Form.Group>
        <Form.Group controlId="Email" className="reg-form-inputs">
          <Form.Label>Email:</Form.Label>
          <From.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
          {values.emailErr && <p>{values.emailErr}</p>}
        </Form.Group>
        <Form.Group controlId="updateBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control type="date" name="birthday" onChange={(e) =>
            setBirthday(e.target.value)}></Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        <p></p>
        <p>Already registered <Link to={'/'}>login</Link> here</p>
      </Form>
    </Col>
  </Row>

);
}

RegistrationView.propTypes = {
  register: propTypes.shape({
    Name: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired
  }),
};
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  //   return (
  //     <Form>
  //       <Form.Group controlId="formUsername">
  //         <Form.Label>Username:</Form.Label>
  //         <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
  //       </Form.Group>

  //       <Form.Group controlId="formPassword">
  //         <Form.Label>Password:</Form.Label>
  //         <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
  //       </Form.Group>
  //       <Button variant="primary" type="submit" onClick={handleSubmit}>
  //         Submit
  //       </Button>
  //     </Form>
  //   );
  // }

  return (
    <Container>
      <Row>
        <Col>
          <form>
            <label>
              Username:
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label>
              Password:
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
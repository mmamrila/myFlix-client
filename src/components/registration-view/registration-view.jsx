import React, { useState } from 'react';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    // props.onLoggedIn(username);
  };

  return (
    <Container>
      <Row>
        <Col>
          <form>
            <label>
              Full Name:
              <input type="text" value={fullname} onChange={e => setName(e.target.value)} />
            </label>
            <label>
              Email:
              <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
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
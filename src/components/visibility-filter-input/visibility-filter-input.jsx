import React from 'React';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return <Form.Control
    onChange={e => props.setFilter(e.target.value)}
    value={props.setFilter(e.target.value)}
    placeholder='filter'
  />;
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);
import React, { Component } from "react";
import PropTypes from "prop-types";

import { Col, FormGroup, Label, Input } from "reactstrap";

import "./InputRow.scss";

const INITIAL_STATE = {
  value: ""
};

class InputRow extends Component {
  constructor (props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  _onChange (e) {
    let { onChange } = this.props;

    this.setState({ value: e.target.value });
    onChange(e.target.value);
  }

  render () {
    let { reference, type, label, placeholder, required } = this.props;
    let { value } = this.state;

    return (
      <FormGroup row>
        <Label for={ reference }
          sm={ 2 }
        >{ label }</Label>
        <Col sm={ 10 }>
          <Input onChange={ (e) => this._onChange(e) }
            placeholder={ placeholder }
            required={ required }
            type={ type }
            value={ value }
          />
        </Col>
      </FormGroup>
    );
  }
}

InputRow.propTypes = {
  onChange: PropTypes.func.isRequired,
  reference: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string
};

InputRow.defaultProps = {
  required: false,
  placeholder: "",
  type: ""
};

export default InputRow;

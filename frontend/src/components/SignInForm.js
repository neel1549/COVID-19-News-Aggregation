import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import FacebookAuth from "./FacebookAuth";

export default class SignInForm extends React.Component {
  render() {
    return (
      <div className="Form" style={{ boxShadow: "10px" }}>
        <Form action="#home">
          <h2 style={{ textAlign: "center", fontFamily: "Helvetica" }}>
            {" "}
            Log-In
          </h2>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <br />
          <br />
          <FacebookAuth />

          <br />
        </Form>
      </div>
    );
  }
}

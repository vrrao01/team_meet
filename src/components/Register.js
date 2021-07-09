import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import logo from "../Logo.svg";
import "firebase/app";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setDisabled(true);
    if (password2 !== password) {
      setError("Passwords don't match");
    } else {
      try {
        await auth.createUserWithEmailAndPassword(email, password);
        setDisabled(false);
      } catch (err) {
        console.log(err);
        if (err.code === "auth/invalid-email") {
          setError("Enter a valid email");
        } else if (err.code === "auth/email-already-in-use") {
          setError("Email is already in use");
        } else if (err.code === "auth/weak-password") {
          setError(err.message);
        } else {
          setError("Could not create user. Try again");
        }
        setDisabled(false);
      }
    }
  };
  return (
    <Container style={{ display: "flex", height: "100vh" }}>
      <div className="animated-body" />
      <div className="animated-body animated-body2" />
      <div className="animated-body animated-body3" />
      <Card
        className="text-center p-3"
        style={{ margin: "auto", width: "100%", maxWidth: "400px" }}
      >
        <Card.Body>
          <img
            src={logo}
            className="mb-3"
            style={{ maxWidth: "250px" }}
            alt="Team meeT"
          />
          <Card.Title>
            <h3>Sign Up</h3>
          </Card.Title>
          {error && (
            <Alert className="mt-3" variant="danger">
              {error}
            </Alert>
          )}
          <Form>
            <Form.Group className="my-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter password"
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Form.Group>
            <Button
              style={{ backgroundColor: "#464EB8" }}
              type="submit"
              onClick={handleSubmit}
              disabled={disabled}
            >
              Submit
            </Button>
          </Form>
          <hr />
          Already have an Account? <Link to="/">Log In</Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

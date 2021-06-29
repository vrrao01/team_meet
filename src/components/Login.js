import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../Logo.svg'

function Login() {
    return (
        <Container style={{display:'flex',height:'100vh'}}>
            <div className="animated-body" />
            <div className="animated-body animated-body2"/>
            <div className="animated-body animated-body3"/>
            <Card className="text-center p-3" style={{margin:'auto',width:'100%',maxWidth:'400px'}}>
                <Card.Body>
                    <img src={logo} className="mb-3" style={{maxWidth:'250px'}}/>
                    <Card.Title>
                        <h3>
                            Sign In
                        </h3>
                    </Card.Title>
                    <Form>
                    <Form.Group className="my-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button style={{backgroundColor:'#464EB8'}} type="submit">
                        Submit
                    </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Login;
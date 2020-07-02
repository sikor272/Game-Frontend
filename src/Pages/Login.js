import React, { useState, useContext } from 'react';
import { login } from "../ApiCall";
import './Login.css';
import { UserContext } from '../Auth';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Error from './Error';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { addUser } = useContext(UserContext);
    const [modal, setModal]=useState(false);
    function handleSubmit(e) {
        e.preventDefault();
        login(email, password).then(res => {
            addUser(res);
        }).catch(err => {
            setModal(true);
            console.log(err.message);
        })
    }

    return (
        <Form className="Login" onSubmit={handleSubmit}>
            <Error isVisible={modal} setVisible={setModal}/>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Adres email</Form.Label>
                <Form.Control type="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} value={email} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control type="password" placeholder="Hasło" required onChange={e => setPassword(e.target.value)} value={password} />
            </Form.Group>

            <Form.Text id="helpBlock" muted>
                Nie masz konta? <Link to="/register">Zarejestruj się już dziś!</Link> 
            </Form.Text>
            <Button variant="primary" type="submit">
                Zaloguj
            </Button>
        </Form>
    )
}


export default Login;



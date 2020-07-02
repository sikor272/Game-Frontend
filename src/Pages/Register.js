import React, { useState, useContext } from 'react';
import { UserContext } from "./../Auth";
import { Form, Button } from 'react-bootstrap';
import { register } from "../ApiCall";
import './Register.css';
import Error from './Error';

function Register() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [modal, setModal]=useState(false);

    const { addUser } = useContext(UserContext);

    function handleSubmit(e) {
        e.preventDefault();
        register(email, password, firstName, lastName).then(res => {
            addUser(res);
        }).catch(err => {
            console.log(err.message);
        })
    }

    return (
        <Form className="Register" onSubmit={handleSubmit}>
            <Error isVisible={modal} setVisible={setModal}/>
            <Form.Group controlId="formBasicFirstName">
                <Form.Label>Imie</Form.Label>
                <Form.Control type="text" placeholder="Imie" required onChange={e => setFirstName(e.target.value)} value={firstName} />
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
                <Form.Label>Nazwisko</Form.Label>
                <Form.Control type="text" placeholder="Nazwisko" required onChange={e => setLastName(e.target.value)} value={lastName} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Adres email</Form.Label>
                <Form.Control type="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} value={email} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control type="password" placeholder="Hasło" required onChange={e => setPassword(e.target.value)} value={password} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Zarejestruj
            </Button>
        </Form>
    )
}

export default Register;
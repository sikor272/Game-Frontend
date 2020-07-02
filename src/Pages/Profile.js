import React, { useState, useEffect } from 'react';
import './Profile.css';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { getSelfInfo, editUser, getImage, changePhoto, deletePhoto } from '../ApiCall';
import Error from './Error';

function Profile() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [modal, setModal]=useState(false);

    useEffect(() => {
        getSelfInfo().then(res => {
            setEmail(res.email);
            setFirstName(res.firstName);
            setLastName(res.lastName);
            setAvatar(res.avatar);
            getImage(res.avatar).then().catch(err => {
                console.log(err.message);
            })
        }).catch(err => {
            console.log(err.message);
        })

    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        editUser(firstName, lastName).then(res => {
            setFirstName(res.firstName);
            setLastName(res.lastName);
        }).catch(err => {
            console.log(err.message);
        })
    }

    const [file, setFile] = useState(null);

    function handleSubmitImage(e) {
        e.preventDefault();
        setFile(file);
        if (file !== null)
            changePhoto(file).then(res => {
                setAvatar(res.avatar);
                getImage(res.avatar).then().catch(err => {
                    console.log(err.message);
                })
            }).catch(err => {
                console.log(err.message);
            })
    }

    return (
        <Container className="Profile">
            <Error isVisible={modal} setVisible={setModal}/>
            <Row>
                <Col sm={6}>
                    <Image src={"http://localhost:8080/resources/" + avatar} thumbnail />
                    <Form onSubmit={handleSubmitImage}>
                        <Form.Group controlId="formBasicImage">
                            <Form.File
                                id="custom-file"
                                label="Wybierz zdjęcie"
                                data-browse="Wybierz"
                                custom
                                type='file' accept='.jpg, .jpeg, .png' name='fileToUpload' onChange={e => setFile(e.target.files[0])}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Zmień avatar
                        </Button>{' '}
                        <Button variant="danger" type="submit" onClick={() => deletePhoto().then(res => {
                            setAvatar(res.avatar);
                            getImage(res.avatar).then().catch(err => {
                                console.log(err.message);
                            })
                        }).catch(err => {
                            console.log(err.message);
                        })}>
                            Ustaw domyślny
                        </Button>
                    </Form>
                </Col>
                <Col sm={6}>
                    <Form className="ProfileForm" onSubmit={handleSubmit}>
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
                            <Form.Control plaintext readOnly defaultValue={email} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Zmień dane
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}


export default Profile;



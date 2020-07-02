import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner, Image } from 'react-bootstrap';
import './NewGame.css';
import { editGame, editGamePhoto, getImage, getGameById } from '../ApiCall';
import Error from './Error';

function EditGame({ id }) {
    const [title, setTitle] = useState('');
    const [info, setInfo] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [file, setFile] = useState(null);
    const [type, setType] = useState('INNE');
    const [modal, setModal]=useState(false);

    useEffect(() => {
        getGameById(id).then(res => {
            getImage(res.image).then().catch(err => {
                console.log(err.message)
            })
            setFile(res.image);
            setInfo(res.info);
            setDescription(res.description);
            setType(res.type);
            setImage(res.image);
            setTitle(res.title);
        }).catch(err => {
            setModal(true);
            console.log(err.message)
        })
    }, [id])

    function handleSubmit(e) {
        e.preventDefault();
        editGame(id, title, info, description, type).then(res => {
            alert("Pomyślnie zmieniono")
        }).catch(err => {
            setModal(true);
            console.log(err.message);
        })
    }

    function handleSubmitImage(e) {
        e.preventDefault();
        setFile(file);
        if (file !== null)
            editGamePhoto(id, file).then(res => {
                setImage(res.image);
                getImage(res.image).then().catch(err => {
                    console.log(err.message);
                })
            }).catch(err => {
                console.log(err.message);
                setModal(true);
            })
    }

    return (
        <>
            <Error isVisible={modal} setVisible={setModal}/>
            {title === '' ? <>
                <div className="GameCenter">
                    <Spinner variant="secondary" animation="border" role="status" style={{ margin: 'auto' }}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            </> :
                <div className="NewGame">
                    <Image src={"http://localhost:8080/resources/" + image} thumbnail />
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
                            Zmień zdjęcie
                        </Button>
                    </Form>
                    <Form  onSubmit={handleSubmit}>

                        <Form.Group controlId="formBasicTitle">
                            <Form.Label>Tytuł</Form.Label>
                            <Form.Control type="text" placeholder="Tytuł" required onChange={e => setTitle(e.target.value)} value={title} />
                        </Form.Group>

                        <Form.Group controlId="formBasicInfo">
                            <Form.Label>Krótka informacja</Form.Label>
                            <Form.Control type="text" placeholder="Krótka informacja" required onChange={e => setInfo(e.target.value)} value={info} />
                        </Form.Group>

                        <Form.Group controlId="formBasicType">
                            <Form.Label>Typ</Form.Label>
                            <Form.Control as="select" required onChange={e => setType(e.target.value)} value={type}>
                                {types.map(type => <option key={type}>{type}</option>)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>Pełny opis</Form.Label>
                            <Form.Control as="textarea" rows="3" placeholder="Pełny opis" required onChange={e => setDescription(e.target.value)} value={description} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Zmień
        </Button>
                    </Form>
                </div>
            }
        </>
    )
}

export default EditGame;

const types = ['INNE', 'AKCJI', 'RPG', 'SPORTOWA', 'LOGICZNA', 'ZRECZNOSCIOWA', 'STRATEGICZNA', 'WYSCIGOWA', 'TOWARZYSKA', 'BIJATYKA', 'PRZYGODOWA', 'SYMULACJA', 'MMO'];
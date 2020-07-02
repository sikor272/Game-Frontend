import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './NewGame.css';
import { addGame } from '../ApiCall';
import Error from './Error';

function NewGame() {
    const [title, setTitle] = useState('');
    const [info, setInfo] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [type, setType] = useState('INNE');
    const [modal, setModal]=useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if(file !== null)
            addGame(file, title, info, description, type).then(res => {
                alert("Pomyślnie dodano");
            }).catch(err => {
                setModal(true);
                console.log(err.message);
            })
    }

    return (
        <Form className="NewGame" onSubmit={handleSubmit}>
            <Error isVisible={modal} setVisible={setModal}/>
            <Form.Group controlId="formBasicImage">
                <Form.Label>Zdjęcie</Form.Label>
                <Form.File
                    id="custom-file"
                    label="Wybierz zdjęcie"
                    data-browse="Wybierz"
                    custom
                    type='file' accept='.jpg, .jpeg, .png' name='fileToUpload' onChange={e => setFile(e.target.files[0])}
                />
            </Form.Group>

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
                Dodaj
            </Button>
        </Form>
    )
}

export default NewGame;

const types = ['INNE', 'AKCJI', 'RPG', 'SPORTOWA', 'LOGICZNA', 'ZRECZNOSCIOWA', 'STRATEGICZNA', 'WYSCIGOWA', 'TOWARZYSKA', 'BIJATYKA', 'PRZYGODOWA', 'SYMULACJA', 'MMO'];
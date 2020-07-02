import React, { useState, useEffect } from 'react';
import { Button, Badge, Jumbotron, Spinner, Container, Row, Col, Image, Form } from 'react-bootstrap';
import './Game.css';
import { getImage, getGameById, addComment } from '../ApiCall';
import { UserContext } from './../Auth';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import Error from './Error';

function Game({ id }) {
    const [game, setGame] = useState(null)
    const [description, setDescription] = useState('');
    const [modal, setModal]=useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        addComment(id, description).then(res => {
            getGameById(id).then(res => {
                setGame(res);
                getImage(res.image).then().catch(err => {
                    console.log(err.message)
                })
    
            }).catch(err => {
                console.log(err.message)
                setModal(true);
            })
        }).catch(err => {
            console.log(err.message);
            setModal(true);
        })
    }

    useEffect(() => {
        getGameById(id).then(res => {
            setGame(res);
            getImage(res.image).then().catch(err => {
                console.log(err.message)
            })

        }).catch(err => {
            console.log(err.message)
            setModal(true);
        })
    }, [id])
    return (
        <>
        <Error isVisible={modal} setVisible={setModal}/>
            {game === null && <>
                <div className="GameCenter">
                    <Spinner variant="secondary" animation="border" role="status" style={{ margin: 'auto' }}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            </>}
            {game !== null && <>
                <Container className="Game">
                    <Row>
                        <Col sm={6}>
                            <Image src={"http://localhost:8080/resources/" + game.image} thumbnail />
                        </Col>
                        <Col sm={6}>
                            <Jumbotron className="GameDesc">
                                <Badge pill variant="light" style={{ width: '80%' }}><h1>{game.title}</h1></Badge><br />
                                <Badge variant="light" style={{ margin: '10px' }}><h5>{game.type}</h5></Badge>
                                <p justify>
                                    {game.description}
                                </p>
                            </Jumbotron>
                        </Col>
                    </Row>
                </Container>
            </>
            }
            <UserContext.Consumer>
                {user => (
                    game !== null && user.admin && <><Container className="GameCenterButton">
                        <Link to={'/admin/games/edit/' + id} >
                            <Button variant="primary" style={{ width: '80%' }}>Edytuj</Button>
                        </Link>
                    </Container>
                    </>
                )}
            </UserContext.Consumer>
            {game !== null && game.comments !== null && game.comments.map(comment => <Comment key={comment.id}
                firstName={comment.user.firstName}
                lastName={comment.user.lastName}
                avatar={comment.user.avatar}
                description={comment.description}
            />
            )}
            <UserContext.Consumer>
                {user => (
                    game !== null && user.logged ? <><Container>
                        <Form className="NewComment" onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicDescription">
                                <Form.Control as="textarea" rows="3" placeholder="Treść komentarza" required onChange={e => setDescription(e.target.value)} value={description} />
                            </Form.Group>
                            <Button variant="primary" style={{ width: '80%' }} type="submit">Dodaj komentarz</Button>
                        </Form>
                    </Container>
                    </> : game !== null && <>
                            <Container className="NewComment">
                                <Link to={'/login'} >
                                    <Button variant="primary" style={{ width: '80%' }}>Zaloguj się aby dodać komentarz</Button>
                                </Link>
                            </Container>
                        </>
                )}
            </UserContext.Consumer>
        </>
    )
}

export default Game;
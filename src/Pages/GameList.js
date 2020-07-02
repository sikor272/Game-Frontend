import React, { useState, useEffect } from 'react';
import { Button, Card, CardColumns, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Game.css';
import { getGameList, getImage } from '../ApiCall';
import Error from './Error';

function Game({ id, title, image, info }) {
    return (
        <Card className="GameList" border="primary">
            <Card.Header>{title}</Card.Header>
            <Card.Img variant="top" src={"http://localhost:8080/resources/" + image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {info}
                </Card.Text>
                <Link to={'/games/' + id} >
                    <Button variant="secondary">Zobacz więcej!</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}

function GameList() {
    const [modal, setModal]=useState(false);
    const [games, setGames] = useState([])
    useEffect(() => {
        getGameList().then(res => {
            setGames(res);
            res.map(image => getImage(image.image).then().catch(err => {
                console.log(err.message)
            }))

        }).catch(err => {
            setModal(true);
            console.log(err.message)
        })
    }, [])
    return (
        <>
        <Error isVisible={modal} setVisible={setModal}/>
            {games.length === 0 && <>
                <div className="GameCenter">
                    <Spinner variant="secondary" animation="border" role="status" style = {{margin : 'auto'}}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            </>}
            <CardColumns style={{ padding: '25px' }}>
            {games.map(game => <Game key={game.id}
                id={game.id}
                title={game.title}
                image={game.image}
                info={game.info}
            />

            )}
        </CardColumns>
        </>
    )
}

export default GameList;
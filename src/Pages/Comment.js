
import React, {  useEffect } from 'react';
import { Badge, Container, Row, Col, Image } from 'react-bootstrap';
import './Comment.css';
import { getImage } from '../ApiCall';

function Comment({firstName, lastName, avatar, description}) {
    useEffect(() => {
        getImage(avatar).then().catch(err => {
             console.log(err.message)
        })
    }, [avatar])
    return (
        <>
            <Container className="Comment">
                <Row>
                    <Col sm={2}>
                        <Image src={"http://localhost:8080/resources/" + avatar} thumbnail />
                    </Col>
                    <Col sm={10}>
                            <Badge variant="light" style={{ margin: '10px' }}>{firstName}{' '}{lastName}</Badge>
                            <p justify>
                                {description}
                                </p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Comment;
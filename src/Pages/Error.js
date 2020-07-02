import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function Error({ isVisible, setVisible }) {
    const handleClose = () => setVisible(false);

    return (
        <>
            <Modal show={isVisible} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Coś poszło nie tak.</p>
                    <p>Sprawdź czy wszystkie dane są wprowadzone poprawnie, lub spróbuj ponownie za chwilę.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Zamknij
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Error;
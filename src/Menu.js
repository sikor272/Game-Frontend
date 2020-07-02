import React from 'react';
import './Menu.css';
import { Nav } from 'react-bootstrap';
import { UserContext } from './Auth';


function Menu() {
    return (
        <Nav className="Menu" justify variant="tabs" defaultActiveKey="/" activeKey={window.location.pathname}>
            <Nav.Item> <Nav.Link href="/">Gry</Nav.Link> </Nav.Item>
            <UserContext.Consumer>
                {user => (
                    <>
                        {user.admin && <Nav.Item> <Nav.Link href="/admin/games/add">Dodaj grę</Nav.Link> </Nav.Item>}
                        {user.logged && <Nav.Item> <Nav.Link href="/profile">Profil</Nav.Link> </Nav.Item>}
                        {user.logged && <Nav.Item> <Nav.Link href="/logout">Wyloguj</Nav.Link> </Nav.Item>}
                        {!user.logged && <Nav.Item> <Nav.Link href="/login">Zaloguj</Nav.Link> </Nav.Item>}
                    </>
                )}
            </UserContext.Consumer>
        </Nav>
    );
}

export default Menu;

import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';
import { UserContext } from '../Auth';

function Logout() {
    const { deleteUser } = useContext(UserContext);
    useEffect(() => {
        deleteUser();
    }, [deleteUser]);
    return <Redirect to="/" />
}

export default Logout;
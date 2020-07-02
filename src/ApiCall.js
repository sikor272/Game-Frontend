import { getToken } from "./Auth";

function validate(response) {
    if (response.ok) {
        return response.text().then(res => {
            if (res) {
                return JSON.parse(res);
            }
            return {}
        })
    } else {
        return response.json().then(async err => {
            throw err;
        })
    }
}

/* Auth Controller */
export const register = async (email, password, firstName, lastName) => {
    return fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            firstName,
            lastName
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(validate)
}

export const login = async (email, password) => {
    return fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(validate)
}

/* User controller */
export const getUser = async (id) => {
    return fetch('http://localhost:8080/users/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Token': getToken()
        }
    }).then(validate)
}

export const getSelfInfo = async => {
    return fetch('http://localhost:8080/users/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Token': getToken()
        }
    }).then(validate)
}

export const editUser = async (firstName, lastName) => {
    return fetch('http://localhost:8080/users/', {
        method: 'PUT',
        body: JSON.stringify({
            firstName,
            lastName
        }),
        headers: {
            'Content-Type': 'application/json',
            'Token': getToken()
        }
    }).then(validate)
}

export const changePhoto = async (file) => {
    const data = new FormData();
    data.append('file', file);
    return fetch('http://localhost:8080/users/avatar', {
        method: 'PATCH',
        body: data,
        headers: {
            'Token': getToken()
        }
    }).then(validate)
}

export const deletePhoto = async => {
    return fetch('http://localhost:8080/users/avatar', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Token': getToken()
        }
    }).then(validate)
}

/* Game controller */

export const getGameList = async () => {
    return fetch('http://localhost:8080/games/', {
        method: 'GET',
    }).then(validate)
}

export const getGameById = async (id) => {
    return fetch('http://localhost:8080/games/' + id, {
        method: 'GET',
    }).then(validate)
}

export const addGame = async (file, title, info, description, type) => {
    const data = new FormData();
    data.append('file', file);
    data.append('title', title);
    data.append('info', info);
    data.append('description', description);
    data.append('type', type);
    return fetch('http://localhost:8080/games/', {
        method: 'PATCH',
        body: data,
        headers: {
            'Token': getToken()
        }
    }).then(validate)
}

export const editGame = async (id, title, info, description, type) => {
    return fetch('http://localhost:8080/games/' + id, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            info,
            description,
            type
        }),
        headers: {
            'Content-Type': 'application/json',
            'Token': getToken()
        }
    }).then(validate)
}

export const editGamePhoto = async (id, file) => {
    const data = new FormData();
    data.append('file', file);
    return fetch('http://localhost:8080/games/' + id + '/image', {
        method: 'PATCH',
        body: data,
        headers: {
            'Token': getToken()
        }
    }).then(validate)
}

/* Comment Controller */

export const addComment = async (gameId,  description) => {
    return fetch('http://localhost:8080/comments/', {
        method: 'POST',
        body: JSON.stringify({
            gameId,
            description
        }),
        headers: {
            'Content-Type': 'application/json',
            'Token': getToken()
        }
    }).then(validate)
}


/* Resource Controller */
export const getImage = async (imageName) => {
    return fetch('http://localhost:8080/resources/' + imageName, {
        method: 'GET',
    }).then(validate)
}
import React from 'react';

const Login = "Login";
const Logout = "Logout";

export const getToken = ()=> {
    return JSON.parse(localStorage.getItem('user')).token;
}

const initialState = {
    user: getUserFromStorage(),
    logged: getUserFromStorage() != null,
    admin: getUserFromStorage() && getUserFromStorage().role === 'ADMIN'
}

function saveToStorage(user) {
    localStorage.setItem('user', JSON.stringify({
        firstName: user.firstName,
        lastName: user.lastName,
        token: user.token,
        role: user.role
    }));
}
function deleteFromStorage() {
    localStorage.removeItem('user');
}

function getUserFromStorage() {
    return JSON.parse(localStorage.getItem('user'));
}

const reduce = (state, action) => {
    switch (action.type) {
        case Login:
            saveToStorage(action.payload);
            return {
                user: action.payload,
                logged: true,
                admin: action.payload.role === 'ADMIN'
            }
        case Logout:
            deleteFromStorage();
            return {
                user: null,
                logged: false,
                admin: false
            }
        default:
            return state;
    }
}

export const UserContext = React.createContext(initialState);

export function UserContextProvider({ ...props }) {
    const [state, dispatch] = React.useReducer(reduce, initialState);
    return (
        <UserContext.Provider value={{
            ...state,
            addUser: ({ firstName, lastName, role, token }) => {
                dispatch({
                    type: Login,
                    payload: {
                        firstName,
                        lastName,
                        role,
                        token
                    }
                });
            },
            deleteUser: () => {
                dispatch({ type: Logout })
            }
        }}>
            {props.children}
        </UserContext.Provider >
    );
}
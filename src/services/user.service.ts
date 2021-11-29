import {config} from './config';

export const userService = {
    login,
    logout,
    get,
};

function login(username:string, password:string) {
    if (!username || !password) throw 'Username and Password must be set to login!';
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify({ username, password })
    };

    
    //return Promise.resolve({id:1, name:username, password, roles :["ITS4U","Role1"], token:"azertyuiopqsdfghjklmwxcbn"}) //local mock
    return fetch(`${config.apiUrl}/auth-mock.json`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.token) {
                sessionStorage.setItem('nabil-user', JSON.stringify(user));
            }
            return user;
        });
}

function logout() {
    sessionStorage.removeItem('nabil-user');
}

function get() {
    sessionStorage.get('nabil-user');
}


function handleResponse(response:any) {
    return response.text().then((text:string) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export function authHeader() {
    // return authorization header with jwt token
    let user:any = JSON.parse( sessionStorage.getItem("nabil-user") || '' );

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}
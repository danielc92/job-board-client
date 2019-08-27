export function loginUser() {
    return {
        type: 'LOGIN',
        payload: {
            value: true
        }
    }
}

export function logoutUser() {
    return {
        type: 'LOGOUT',
        payload: {
            value: false
        }
    }
}
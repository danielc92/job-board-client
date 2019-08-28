export const loginUser = () => async (dispatch, getState) => {
    const response = await return {
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
export const menuReducer = (state={ item: 'home' }, action) => {
    const { type, payload } = action;

    switch(type) {
        case 'SET_MENU_ITEM':
            return payload
        default:
            return state
    }
}
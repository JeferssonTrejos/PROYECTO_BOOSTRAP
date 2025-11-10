// modules/store.js

export const getUserFileName = () => {
    return localStorage.getItem('userFileName');
}

export const setUserFileName = (opt) => {
    let fileName = '';
    switch (opt) {
        case 1:
            fileName = 'jefersson';
            break;
        case 2:
            fileName = 'michelle';
            break;
        case 3:
            fileName = 'adonay';
            break;
        case 4:
            fileName = 'ernesto';
            break;
        default:
            fileName = '';
            break;
    }
    localStorage.setItem('userFileName', fileName);
}
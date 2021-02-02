import { createGlobalState } from 'react-hooks-global-state';

const started = localStorage.getItem('started');
let theme = localStorage.getItem('theme');
if (!theme) theme = 'light';
if (theme) {
    switch (theme) {
        case 'dark':
            document.querySelector('meta[name=theme-color]').content =
                '#212121';
            break;

        case 'light':
            document.querySelector('meta[name=theme-color]').content =
                '#F1F3F4';
            break;

        default:
            break;
    }
}
const token = localStorage.getItem('token');
if (!token) {
    localStorage.removeItem('my-hash');
}
const hash = localStorage.getItem('my-hash');

const { useGlobalState } = createGlobalState({
    started: started,
    menuIsOpen: false,
    theme: theme,
    token: token,
    hash: hash,
    commentSending: false,
});

export default useGlobalState;

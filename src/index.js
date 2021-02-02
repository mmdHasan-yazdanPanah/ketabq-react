import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

export let deferredPromptFunc;
let deferredPrompt;
const waitMiliSeconds = 1 * 24 * 60 * 60 * 1000;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    console.log('Propmp', e);
    deferredPrompt = e;

    deferredPromptFunc = function () {
        const A2HSTime = localStorage.getItem('A2HS-time');
        let allow = false;

        if (!A2HSTime) {
            allow = true;
        } else if (
            new Date().getTime() >
            parseFloat(A2HSTime) + waitMiliSeconds
        ) {
            allow = true;
        }

        console.log('deffered prompt');

        if (deferredPrompt && allow) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                localStorage.setItem('A2HS-time', new Date().getTime());
                deferredPrompt = null;
            });
        }
    };
});

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

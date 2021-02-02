import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const DelayedLink = ({ to, delay, onClick, ...props }) => {
    const history = useHistory();

    const clickHandler = (e) => {
        e.preventDefault();

        if (onClick) {
            setTimeout(() => {
                onClick();
                setTimeout(() => {
                    history.push(to);
                }, delay);
            }, 300);
        } else {
            setTimeout(() => {
                history.push(to);
            }, delay);
        }
    };
    return <Link to={to} {...props} onClick={clickHandler} />;
};

export default DelayedLink;

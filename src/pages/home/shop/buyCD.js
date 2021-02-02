import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { store } from 'react-notifications-component';

let res = <Redirect to="/" />;

const BuyChangeDirection = () => {
    const location = useLocation();

    const parsed = queryString.parse(location.search);
    console.log(parsed);

    useEffect(() => {
        if (parsed.success === 'false') {
            store.addNotification({
                container: 'bottom-right',
                animationIn: ['animate__animated', 'animate__flipInX'],
                animationOut: ['animate__animated', 'animate__fadeOut'],
                type: 'danger',
                dismiss: {
                    duration: 5000,
                    pauseOnHover: true,
                },
                title: 'خرید ناموفق',
                message: 'خرید انجام نشد',
            });
        } else if (parsed.success === 'true') {
            store.addNotification({
                container: 'bottom-right',
                animationIn: ['animate__animated', 'animate__flipInX'],
                animationOut: ['animate__animated', 'animate__fadeOut'],
                type: 'success',
                dismiss: {
                    duration: 5000,
                    pauseOnHover: true,
                },
                title: 'خرید موفق',
                message: 'خرید با موفقیت انجام شد',
            });
        }

        if (parsed?.message?.search('wallet') >= 0) {
            res = <Redirect to="/credit-history" />;
        } else {
            res = <Redirect to="/library" />;
        }
    }, [parsed.message, parsed.success]);

    return res;
};

export default BuyChangeDirection;

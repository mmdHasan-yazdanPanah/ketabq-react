import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CountDown = ({ countDown }) => {
    const [hour, setHour] = useState('00');
    const [minute, setMinute] = useState('00');
    const [second, setSecond] = useState('00');

    useEffect(() => {
        let full = countDown;

        const func = () => {
            const now = new Date();
            const left = full - now.getTime();

            let hourLeft = Math.floor(left / (1000 * 60 * 60));
            if (hourLeft.toString().length < 2) {
                hourLeft = ('0' + hourLeft).slice(-2);
            }
            setHour(hourLeft);

            setMinute(
                (
                    '0' + Math.floor((left % (1000 * 60 * 60)) / (1000 * 60))
                ).slice(-2)
            );

            setSecond(
                ('0' + Math.floor((left % (1000 * 60)) / 1000)).slice(-2)
            );
        };

        func();

        let interval = setInterval(() => func(), 1000);

        return () => {
            clearInterval(interval);
        };
    }, [countDown]);

    return (
        <section className="countdown">
            <div className="countdown_item">
                <span className="countdown_name">ساعت</span>
                <span className="countdown_box countdown_box--fill has-background-primary has-text-white">
                    {hour}
                </span>
            </div>
            <span className="countdown_seperator">:</span>
            <div className="countdown_item">
                <span className="countdown_name">دقیقه</span>
                <span className="countdown_box countdown_box--fill has-background-primary has-text-white">
                    {minute}
                </span>
            </div>
            <span className="countdown_seperator">:</span>
            <div className="countdown_item">
                <span className="countdown_name">ثانیه</span>
                <span className="countdown_box countdown_box--bordered has-text-primary">
                    {second}
                </span>
            </div>
            <span className=""></span>
        </section>
    );
};

CountDown.propTypes = {
    countDown: PropTypes.number.isRequired,
};

export default CountDown;

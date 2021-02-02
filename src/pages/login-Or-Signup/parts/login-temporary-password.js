import React, { useState, useEffect } from 'react';
import Button from '../../../components/buttons/button';
import InputSeperatedPass from '../../../components/form/input-num-pass';
import SvgPrecentHeight from '../../../components/svg-precent-for-height';

import { ReactComponent as SvgImage } from '../../../images/account-animate.svg';

const codelength = 4;
const initTime = 120;

const LoginTempPass = ({ style, onSubmit, sendCode }) => {
    const [value, setValue] = useState('');
    const [timeLeft, setTimeLeft] = useState(initTime);

    useEffect(() => {
        setInterval(() => {
            setTimeLeft((prevState) => prevState - 1);
        }, 1000);
    }, []);

    useEffect(() => {
        if (value.length === codelength) {
            onSubmit(value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <div
            style={style}
            className="login-signup_context-wrapper--responsive py-4">
            <div className="hero-head has-text-centered login-signup_info-wrapper--responsive">
                <div className="px-5 mt-1">
                    <InputSeperatedPass
                        onChange={(numbers) => {
                            setValue(numbers);
                        }}
                        info={`کد ${codelength} رقمی پیامک شده را وارد نمایید`}
                        className="mb-1"
                        itemsNumber={codelength}
                        time={timeLeft}
                        timeFinishedReplaceElement={
                            <span
                                className="link"
                                onClick={() => {
                                    sendCode().then(() =>
                                        setTimeLeft(initTime)
                                    );
                                }}>
                                ارسال مجدد
                            </span>
                        }
                    />
                </div>
                <div className="mt-3">
                    <Button
                        onClick={() => onSubmit(value)}
                        className="container">
                        ورود
                    </Button>
                </div>
            </div>

            <div className="hero-body login-signup_img-wrapper--responsive">
                <SvgImage className="svg" />
            </div>

            {/* <SvgPrecentHeight
                svgClassName="login-signup_img--responsive"
                svgHeightPrecentage="100"
                SvgComponent={SvgImage}
                wrapperClassName={
                    'hero-body login-signup_img-wrapper--responsive'
                }
            /> */}
        </div>
    );
};

export default LoginTempPass;

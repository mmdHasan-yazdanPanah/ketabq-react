import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { store } from 'react-notifications-component';
import { animated } from 'react-spring';

import Button from '../../../components/buttons/button';
import SvgPrecentHeight from '../../../components/svg-precent-for-height';

import { ReactComponent as SvgImage1 } from '../../../images/account-animate.svg';

const SharedWithBoth = ({ onSubmit, style }) => {
    const [value, setValue] = useState('');
    const [checkValidity, setCheckValidity] = useState(false);
    const [validity, setValidity] = useState(false);

    useEffect(() => {
        setValidity(
            value.match(
                // eslint-disable-next-line no-useless-escape
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
            )
        );
    }, [value]);

    // useEffect(() => {
    //     const HTML = document.documentElement;
    //     const height = window.getComputedStyle(HTML).height;
    //     HTML.style.height = height;
    // }, []);

    const formSubmitHandler = (e) => {
        e.preventDefault();

        setCheckValidity(true);
        if (validity) {
            onSubmit('+' + value);
        } else {
            store.addNotification({
                container: 'bottom-right',
                animationIn: ['animate__animated', 'animate__flipInX'],
                animationOut: ['animate__animated', 'animate__fadeOut'],
                type: 'danger',
                dismiss: {
                    duration: 3000,
                    pauseOnHover: true,
                },
                message: 'شماره وارد شده نادرست میباشد',
            });
        }
    };

    return (
        <animated.div
            className="login-signup_context-wrapper--responsive py-4"
            style={style}>
            <form
                onSubmit={formSubmitHandler}
                className="hero-head has-text-centered login-signup_info-wrapper--responsive">
                <div className="px-6 mt-5 mb-2 mt-6--desktop pt-6--desktop">
                    <PhoneInput
                        enableSearch={true}
                        disableSearchIcon={true}
                        searchPlaceholder="جستجو"
                        searchNotFound="موردی یافت نشد"
                        inputProps={{ name: 'mobile' }}
                        inputClass={`${
                            !checkValidity
                                ? 'input-phone_input'
                                : validity
                                ? 'input-phone_input--true'
                                : 'input-phone_input--false'
                        } py-1`}
                        inputStyle={{ width: '100%' }}
                        buttonClass={`${
                            !checkValidity
                                ? 'input-phone_btn'
                                : validity
                                ? 'input-phone_btn--true'
                                : 'input-phone_btn--false'
                        }`}
                        placeholder="شماره تلفن همراه خود را وارد نمایید"
                        containerStyle={{ direction: 'ltr' }}
                        containerClass="input-phone_container"
                        country="ir"
                        value={value}
                        onChange={(phone) => setValue(phone)}
                    />
                </div>
                <div>
                    <Button type="submit" className="mt-5 container">
                        مرحله بعد
                    </Button>
                </div>
            </form>
            <div className="hero-body login-signup_img-wrapper--responsive">
                <SvgImage1 className="svg" />
            </div>

            {/* <SvgPrecentHeight
                svgClassName="login-signup_img--responsive"
                svgHeightPrecentage="100"
                SvgComponent={SvgImage1}
                wrapperClassName={
                    'hero-body login-signup_img-wrapper--responsive'
                }
            /> */}
        </animated.div>
    );
};

export default SharedWithBoth;

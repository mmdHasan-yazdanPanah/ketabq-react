import React, { useRef, useEffect, useState } from 'react';
import { ImpulseSpinner } from 'react-spinners-kit';
import axios from 'axios';
import { store } from 'react-notifications-component';
import useGlobalState from '../../globalStates/globalStates';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import FadePageHoc from '../../components/hoc/fadePage';
import TextWithBackIcon from '../../components/text-with-back-icon';
// import { ReactComponent as SvgImage } from '../../images/login-signup1.svg';

import SharedWithBoth from './parts/shared-with-both';
// import LoginPrimePasswork from './parts/login-prime-password';
import LoginTempPass from './parts/login-temporary-password';
// import SignupCode from './parts/signup-code';
// import SignupInfo from './parts/signup-info';

import changeVhFunc from '../../components/changevh';
import { pageTitles } from '../../globalStates/statics';

const LoginOrSignup = () => {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState('phone');
    const [phone, setPhone] = useState('');
    const [, setToken] = useGlobalState('token');
    const prams = useParams();
    const location = useLocation();
    const containerRef = useRef();
    const history = useHistory();

    // useEffect(() => {
    //     changeVhFunc(containerRef.current, 'minHeight', 100);
    // }, []);

    useEffect(() => {
        document.title = pageTitles.login;
    }, []);

    useEffect(() => {
        if (prams.ref) {
            if (!localStorage.getItem('signup-ref')) {
                localStorage.setItem('signup-ref', prams.ref);
            }
        }
    }, [prams.ref]);

    const sendPhone = async (value) => {
        const formData = new FormData();
        formData.append('mobile', value);
        setLoading(true);
        try {
            const res = await axios.post('/auth/login', formData);
            setLoading(false);
            if (res.data.success) {
                store.addNotification({
                    container: 'bottom-right',
                    animationIn: ['animate__animated', 'animate__flipInX'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    type: 'success',
                    dismiss: {
                        duration: 3000,
                        pauseOnHover: true,
                    },
                    message: 'کد با موفقیت ارسال شد',
                });
            }
            setPhone(value);
            setCurrentPage('code');
        } catch (error) {
            setLoading(false);
            store.addNotification({
                container: 'bottom-right',
                animationIn: ['animate__animated', 'animate__flipInX'],
                animationOut: ['animate__animated', 'animate__fadeOut'],
                type: 'danger',
                dismiss: {
                    duration: 4000,
                    pauseOnHover: true,
                },
                message:
                    error.response.status === 500
                        ? 'شماره وارد شده نامعتبر است'
                        : error.message,
            });
        }
    };

    return (
        <div
            ref={containerRef}
            className="is-clipped hero is-fullheight container px-1 pt-4 is-family-primary"
            style={{ direction: 'rtl' }}>
            <FadePageHoc status={loading}>
                <ImpulseSpinner loading={loading} size={80} />
            </FadePageHoc>
            <div className="hero-head hero mb-3">
                <TextWithBackIcon
                    backClickHandler={
                        !prams.ref ? () => history.goBack() : null
                    }
                    link={prams.ref ? '/' : null}>
                    ورود یا ثبت نام
                </TextWithBackIcon>
            </div>
            {currentPage === 'phone' ? (
                <SharedWithBoth onSubmit={sendPhone} />
            ) : currentPage === 'code' ? (
                <LoginTempPass
                    sendCode={() => sendPhone(phone)}
                    onSubmit={(value) => {
                        console.log('submit');
                        const formData = new FormData();
                        formData.append('mobile', phone);
                        formData.append('code', value);
                        let ref = localStorage.getItem('signup-ref');
                        if (ref) {
                            formData.append('referral', ref);
                        }
                        setLoading(true);
                        axios
                            .post('/auth/verify', formData)
                            .then((res) => {
                                console.log(res);
                                setLoading(false);
                                if (res.data.success === true) {
                                    store.addNotification({
                                        container: 'bottom-right',
                                        animationIn: [
                                            'animate__animated',
                                            'animate__flipInX',
                                        ],
                                        animationOut: [
                                            'animate__animated',
                                            'animate__fadeOut',
                                        ],
                                        type: 'success',
                                        dismiss: {
                                            duration: 3000,
                                            pauseOnHover: true,
                                        },
                                        message:
                                            'فرایند ثبت نام با موفقیت انجام شد',
                                    });
                                    localStorage.setItem(
                                        'token',
                                        res.data.token
                                    );
                                    setToken(res.data.token);
                                    console.log('token set');
                                    if (location.state.toLocation) {
                                        history.push(location.state.toLocation);
                                    } else {
                                        history.push('/');
                                    }
                                }
                            })
                            .catch((error) => {
                                if (error.response) {
                                    console.log(error.response.data);
                                    console.log(error.response.status);
                                    console.log(error.response.headers);

                                    store.addNotification({
                                        container: 'bottom-right',
                                        animationIn: [
                                            'animate__animated',
                                            'animate__flipInX',
                                        ],
                                        animationOut: [
                                            'animate__animated',
                                            'animate__fadeOut',
                                        ],
                                        type: 'danger',
                                        dismiss: {
                                            duration: 4000,
                                            pauseOnHover: true,
                                        },
                                        message:
                                            error.response.status === 403
                                                ? 'کد وارد شده نادرست است'
                                                : error.message,
                                    });
                                }

                                setLoading(false);

                                throw error;
                            });
                    }}
                />
            ) : null}

            {/* THIS PAGE IS (DELETED) */}
            {/* <div className="hero-head hero mb-3">
                <TextWithBackIcon>ورود یا ثبت نام</TextWithBackIcon>
            </div>
            <LoginPrimePasswork /> */}

            {/* <div className="hero-head hero mb-3">
                <TextWithBackIcon>ورود</TextWithBackIcon>
            </div> */}
            {/* <LoginTempPass /> */}

            {/* <div className="hero-head hero mb-3">
                <TextWithBackIcon>ثبت نام</TextWithBackIcon>
            </div>
            <SignupCode /> */}

            {/* THIS PAGE IS (DELETED) */}
            {/* <div className="hero-head hero mb-3">
                <TextWithBackIcon>ورود</TextWithBackIcon>
            </div>
            <SignupInfo /> */}
        </div>
    );
};

export default LoginOrSignup;

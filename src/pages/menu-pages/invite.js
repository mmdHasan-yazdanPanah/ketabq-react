import React, { useState, useRef, useEffect } from 'react';
import { animated, useTransition } from 'react-spring';
import QRCode from 'qrcode.react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { store } from 'react-notifications-component';

import useGlobalState from '../../globalStates/globalStates';

import TextWithBackIcon from '../../components/text-with-back-icon';
import SvgPrecentHeight from '../../components/svg-precent-for-height';

import { ReactComponent as BuyImage } from '../../images/invite-animate.svg';
import { ReactComponent as QRCodeIcon } from '../../images/icons/qr-code.svg';
import { pageTitles } from '../../globalStates/statics';

const loadingTitle = 'loading...';

const InvitePage = () => {
    const [inviteLink, setInviteLink] = useState(loadingTitle);
    const inviteLinkRef = useRef();
    const [btnText, setBtnText] = useState('کپی');
    const [isModalActive, setModal] = useState(false);
    const [theme] = useGlobalState('theme');
    const [token, setToken] = useGlobalState('token');
    const history = useHistory();

    useEffect(() => {
        if (isModalActive) {
            document
                .querySelector('#menu-footer')
                .classList.add('menu-footer--down');
        } else {
            document
                .querySelector('#menu-footer')
                .classList.remove('menu-footer--down');
        }
    }, [isModalActive]);

    useEffect(() => {
        Axios.get('/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                const data = res.data;
                setInviteLink(
                    `${window.location.origin}/login_signup/${data.hash}`
                );
            })
            .catch((err) => {
                if (err?.request?.status === 404) {
                    history.push('/404');
                } else if (err?.request?.status === 403) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('my-hash');
                    setToken(null);
                    store.addNotification({
                        container: 'bottom-right',
                        animationIn: ['animate__animated', 'animate__flipInX'],
                        animationOut: ['animate__animated', 'animate__fadeOut'],
                        type: 'warning',
                        dismiss: {
                            duration: 5000,
                            pauseOnHover: true,
                        },
                        title: 'توکن نامعتبر',
                        message: (
                            <React.Fragment>
                                توکن وارد شده نا معتبر است
                                <br />
                                تنظیمات اپ به وضعیت کاربر میهمان تغییر یافت
                            </React.Fragment>
                        ),
                    });
                } else {
                    localStorage.removeItem('token');
                    localStorage.removeItem('my-hash');
                    setToken(null);
                    store.addNotification({
                        container: 'bottom-right',
                        animationIn: ['animate__animated', 'animate__flipInX'],
                        animationOut: ['animate__animated', 'animate__fadeOut'],
                        type: 'warning',
                        dismiss: {
                            duration: 5000,
                            pauseOnHover: true,
                        },
                        title: 'ورود ناموفق',
                        message: 'مشکلی پیش آمده',
                    });
                }

                throw err;
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const modalTransition = useTransition(isModalActive, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    let timeOut;

    const btnClickHandler = () => {
        if (timeOut) {
            clearTimeout(timeOut);
        }

        inviteLinkRef.current.select();
        inviteLinkRef.current.setSelectionRange(0, 99999);
        document.execCommand('copy');
        setBtnText('کپی شد');

        timeOut = setTimeout(() => {
            setBtnText('کپی');
        }, 2000);
    };

    useEffect(() => {
        document.title = pageTitles.invite;
    }, []);

    return (
        <React.Fragment>
            <div className="main pt-4">
                <TextWithBackIcon backClickHandler={() => history.goBack()}>
                    افزایش اعتبار
                </TextWithBackIcon>
            </div>
            <div className="login-signup_context-wrapper--responsive main">
                <div className="hero-head has-text-centered login-signup_info-wrapper--responsive buypage_main mx-5 px-1">
                    <p className="paragraph--wide mt-4 pt-1 is-size-7 is-size-7--responsive-desktop-up has-text-weight-light">
                        لینک اختصاصی خود را از بخش زیر کپی کنید و آن را برای
                        دوستان و آشنایان خود ارسال نمایید. هنگامی که دوستان شما
                        با این لینک به سایت کتاب کیو وارد شوند و ثبت نام کنند
                        برای اولین خرید خود کد تخفیف 50 درصدی دریافت می کنند و
                        پس از اولین خرید شما نیز یک کد تخفیف 50 درصدی هدیه می
                        گیرید. همچنین تا 3 ماه با هر خرید دوستتان 5 درصد از مبلغ
                        خرید به اعتبار کیف پول شما اضافه می شود
                    </p>
                    <div className="invitePage_invite mt-5 pt-3 mb-3">
                        <div className="ml-4 invitePage_field radius--1 has-text-weight-light is-size-7 is-size-7--responsive-desktop-up pr-1">
                            <input
                                dir="ltr"
                                type="text"
                                style={{ width: '100%', paddingLeft: '48px' }}
                                value={inviteLink}
                                className={`is-none-persian ${
                                    theme === 'light'
                                        ? 'has-text-grey'
                                        : 'has-text-grey-light'
                                } mr-4 is-size-7 is-size-7--responsive-desktop-up`}
                                ref={inviteLinkRef}
                                readOnly
                            />
                            <button
                                onClick={btnClickHandler}
                                className="button is-primary is-small invitePage_field-btn radius--1 is-size-7 is-size-7--responsive">
                                {btnText}
                            </button>
                        </div>
                        <QRCodeIcon
                            style={
                                inviteLink === loadingTitle
                                    ? { opacity: 0.5, pointerEvents: 'none' }
                                    : {}
                            }
                            className={`size-by-h--3 is-clickable ${
                                theme === 'dark' ? 'icon-1--light' : ''
                            }`}
                            onClick={() => setModal(true)}
                        />

                        {modalTransition.map(({ item, key, props }) =>
                            item ? (
                                <animated.div
                                    key={1}
                                    style={{ display: 'flex', ...props }}
                                    className={`modal ${
                                        isModalActive ? 'is-active' : ''
                                    }`}>
                                    <div
                                        className="modal-background"
                                        onClick={() => setModal(false)}></div>
                                    <div className="modal-content">
                                        <div>
                                            <QRCode
                                                style={{
                                                    width: '75%',
                                                    height: 'auto',
                                                }}
                                                value={inviteLink}
                                                renderAs="svg"
                                                includeMargin={true}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setModal(false)}
                                        className="modal-close is-large"
                                        aria-label="close"></button>
                                </animated.div>
                            ) : null
                        )}
                    </div>
                </div>
                <SvgPrecentHeight
                    noTransform={true}
                    svgClassName={`login-signup_img--responsive ${
                        theme === 'dark' ? 'icon-3--dark' : ''
                    }`}
                    svgHeightPrecentage="100"
                    SvgComponent={BuyImage}
                    wrapperClassName={
                        'hero-body mx-5 buypage_big-svg py-0 px-2 login-signup_img-wrapper--responsive'
                    }
                />
            </div>
        </React.Fragment>
    );
};

export default InvitePage;

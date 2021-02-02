import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import Axios from 'axios';
import { store } from 'react-notifications-component';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { CircleSpinner, ClapSpinner } from 'react-spinners-kit';

import useGlobalState from '../../../globalStates/globalStates';
import { colors, pageTitles } from '../../../globalStates/statics.js';

import TextWithBackIcon from '../../../components/text-with-back-icon';
import Button from '../../../components/buttons/button';
import SvgPrecentHeight from '../../../components/svg-precent-for-height';

import { ReactComponent as CheckboxIcon } from '../../../images/icons/checkBox.svg';
import { ReactComponent as BuyImage } from '../../../images/mobile-payments-animate.svg';

const BuyPage = () => {
    const [inputText, setInputText] = useState('');
    const [checked, setChecked] = useState(true);
    const [theme] = useGlobalState('theme');
    // eslint-disable-next-line no-unused-vars
    const [size, setSize] = useState({
        width: 38,
        height: 17,
        handleDiameter: 11,
    });

    const { bookId } = useParams();
    const history = useHistory();
    const location = useLocation();
    const [hash, setHash] = useGlobalState('hash');
    const [token, setToken] = useGlobalState('token');
    const [loading, setLoading] = useState(true);
    const [buyMoneyLoading, setBuyMoneyLoading] = useState(false);
    const [buyCreditLoading, setBuyCreditLoading] = useState(false);
    const [pageProps, setPageProps] = useState({
        image: null,
        title: null,
        author: null,
        priceToman: null,
        priceDollar: null,
        buyFromCreditClickHandler: null,
        buyFromMoneyClickHandler: null,
    });

    const tokenPagePropsHandler = async () => {
        setLoading(true);
        try {
            const resBook = await Axios.get(`/book/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const dataBook = resBook.data.book;
            if (dataBook.user_has_book) {
                store.addNotification({
                    container: 'bottom-right',
                    animationIn: ['animate__animated', 'animate__flipInX'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    type: 'warning',
                    dismiss: {
                        duration: 5000,
                        pauseOnHover: true,
                    },
                    title: 'خریداری شده',
                    message: 'این کتاب قبلا توسط شما خریداری شده',
                });
                history.push(`/product/listen/${bookId}`);
            } else {
                let newHash;
                if (!hash) {
                    const resMe = await Axios.get('/auth/me', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    newHash = resMe.data.hash;
                    localStorage.setItem('my-hash', newHash);
                    setHash(newHash);
                } else {
                    newHash = hash;
                }
                const propsObj = {
                    image: dataBook.thumbnail,
                    title: dataBook.title,
                    author: dataBook.author_name,
                    priceToman:
                        dataBook.price_toman - dataBook.price_toman_discount,
                    priceDollar:
                        dataBook.price_doller - dataBook.price_doller_discount,
                    buyFromCreditClickHandler: async () => {
                        setBuyCreditLoading(true);
                        const ref = localStorage.getItem(
                            `book-${dataBook.id}-ref`
                        );
                        let buyPrams = {
                            Purchased_type: 'book',
                            Purchased_id: dataBook.id,
                            Purchase_method: 'wallet',
                        };
                        if (ref) {
                            buyPrams['referral'] = ref;
                        }
                        try {
                            const res = await Axios.get('/payment/buy', {
                                params: buyPrams,
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            });
                            const data = res.data;

                            setBuyCreditLoading(false);

                            if (data.success) {
                                localStorage.removeItem(
                                    `book-${dataBook.id}-ref`
                                );
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
                                        duration: 5000,
                                        pauseOnHover: true,
                                    },
                                    title: 'انجام شد',
                                    message: 'پرداخت با موفقیت انجام شد',
                                });
                                history.push(`/product/listen/${bookId}`);
                            } else {
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
                                        duration: 5000,
                                        pauseOnHover: true,
                                    },
                                    title: 'ناموفق',
                                    message: `${data.message}`,
                                });
                            }
                        } catch (err) {
                            throw err;
                        }
                    },
                    buyFromMoneyClickHandler: async () => {
                        setBuyMoneyLoading(true);
                        const ref = localStorage.getItem(
                            `book-${dataBook.id}-ref`
                        );
                        let buyPrams = {
                            Purchased_type: 'book',
                            Purchased_id: dataBook.id,
                            Purchase_method: 'online',
                        };
                        if (ref) {
                            buyPrams['referral'] = ref;
                        }
                        try {
                            const res = await Axios.get('/payment/buy', {
                                params: buyPrams,
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            });

                            const data = res.data;
                            setBuyMoneyLoading(false);
                            window.location.href = data.link;
                            localStorage.removeItem(`book-${dataBook.id}-ref`);
                        } catch (err) {
                            throw err;
                        }
                    },
                };
                setPageProps(propsObj);
                setLoading(false);
            }
        } catch (err) {
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
            setLoading(false);
        }
    };

    const noTokenPagePropsHandler = () => {};

    const getPageProps = async () => {
        if (token) {
            tokenPagePropsHandler();
        } else {
            noTokenPagePropsHandler();
        }
    };

    useEffect(() => {
        getPageProps();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        if (pageProps.title) {
            document.title = pageTitles.buy(pageProps.title);
        }
    }, [pageProps.title]);

    return (
        <React.Fragment>
            <div className="main">
                <TextWithBackIcon
                    backClickHandler={() => history.goBack()}
                    className="mb-5 mt-4">
                    خرید کتاب
                </TextWithBackIcon>
            </div>
            {loading ? (
                <div className="main mt-5">
                    <div className="level-item">
                        <ClapSpinner size={40} />
                    </div>
                </div>
            ) : (
                <div className="login-signup_context-wrapper--responsive">
                    <div className="hero-head has-text-centered login-signup_info-wrapper--responsive main pb-1 buypage_main">
                        <div className="columns is-mobile is-gapless is-centered pt-2">
                            <div className="column is-narrow ml-3">
                                <div className="image buypage_image">
                                    <img
                                        style={{ height: '100%' }}
                                        src={pageProps.image}
                                        className="radius--1 is-fit-cover"
                                        alt={pageProps.title}
                                    />
                                </div>
                            </div>
                            <div
                                className="buypage_buy-left column is-narrow is-size-7 is-size-7--responsive-desktop-up has-text-right"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                <div className="name">{pageProps.title}</div>
                                <div
                                    className={`mr-2 ${
                                        theme === 'light'
                                            ? 'has-text-grey'
                                            : 'has-text-grey-light'
                                    }`}
                                    style={{ marginTop: '2px' }}>
                                    {pageProps.author}
                                </div>
                                <div
                                    className="level is-mobile"
                                    style={{ marginTop: 'auto' }}>
                                    <div className="level-right"></div>
                                    <div className="level-left">
                                        <div className="level-item mx-0">
                                            ریال
                                        </div>
                                        <div
                                            className="level-item"
                                            style={{
                                                marginRight: '5px',
                                                marginLeft: '5px',
                                            }}>
                                            <Switch
                                                onChange={() =>
                                                    setChecked(
                                                        (prevState) =>
                                                            !prevState
                                                    )
                                                }
                                                checked={checked}
                                                offColor={colors['primary']}
                                                onColor={colors['primary']}
                                                uncheckedIcon={false}
                                                checkedIcon={false}
                                                {...size}
                                                boxShadow={`inset 0 0 0 2px ${colors['white']}`}
                                                activeBoxShadow={`inset 0 0 0 2px ${colors['white']}, 0 0 2px 3px #3bf`}
                                                offHandleColor={
                                                    colors['primary']
                                                }
                                                onHandleColor={
                                                    colors['primary']
                                                }
                                            />
                                        </div>
                                        <div className="level-item mx-0">
                                            دلار
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="columns is-gapless is-mobile is-centered is-vcentered mb-0 pt-2">
                            <div className="column is-narrow">
                                <div className={`field`}>
                                    <div
                                        className={`control our-input our-input--responsive buypage_input ${'has-icons-left'}`}>
                                        <input
                                            onChange={(e) =>
                                                setInputText(e.target.value)
                                            }
                                            value={inputText}
                                            style={{ paddingLeft: '27px' }}
                                            className={`input is-primary is-family-primary is-size-7 is-size-7--responsive-desktop-up pr-4  py-1 input-right-to-left--english`}
                                            placeholder="کد تخفیف"
                                        />
                                        <span
                                            className="z-index--10 icon is-small is-left simple-click"
                                            style={{
                                                height: '100%',
                                                pointerEvents: 'none',
                                                width: 'auto',
                                                left: '5px',
                                            }}>
                                            <CheckboxIcon className="size-by-w--6" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-narrow mr-2 is-size-7 is-size-7--responsive-desktop-up">
                                <span>{'هزینه نهایی: '}</span>
                                <span className="has-text-weight-semibold">
                                    {`${
                                        checked
                                            ? pageProps.priceToman.toLocaleString()
                                            : pageProps.priceDollar.toLocaleString()
                                    } `}
                                </span>
                                <span className="has-text-weight-semibold">
                                    {checked ? 'تومان' : 'دلار'}
                                </span>
                            </div>
                        </div>
                        <div className="columns is-mobile is-centered is-gapless is-vcentered pt-3 mb-5">
                            <div className="column is-narrow">
                                <Button
                                    onClick={pageProps.buyFromMoneyClickHandler}
                                    className="buypage_button"
                                    size="small"
                                    wide={true}
                                    weight="has-text-weight-normal">
                                    پرداخت مستقیم
                                    {buyMoneyLoading ? (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                left: 'calc(100% + 6px)',
                                            }}>
                                            <CircleSpinner
                                                size={18}
                                                color={colors['primary']}
                                            />
                                        </div>
                                    ) : null}
                                </Button>
                            </div>
                            <div className="column is-narrow mr-2">
                                <Button
                                    style={{ position: 'relative' }}
                                    onClick={
                                        pageProps.buyFromCreditClickHandler
                                    }
                                    className="buypage_button"
                                    size="small"
                                    wide={true}
                                    weight="has-text-weight-normal">
                                    پرداخت از کیف پول
                                    {buyCreditLoading ? (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                right: 'calc(100% + 6px)',
                                            }}>
                                            <CircleSpinner
                                                size={18}
                                                color={colors['primary']}
                                            />
                                        </div>
                                    ) : null}
                                </Button>
                            </div>
                        </div>
                    </div>
                    <SvgPrecentHeight
                        noTransform={true}
                        svgClassName="login-signup_img--responsive"
                        svgHeightPrecentage="100"
                        SvgComponent={BuyImage}
                        wrapperClassName={
                            'hero-body buypage_big-svg py-0 px-2 login-signup_img-wrapper--responsive'
                        }
                    />
                </div>
            )}
        </React.Fragment>
    );
};

export default BuyPage;

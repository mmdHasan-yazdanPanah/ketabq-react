import React, { useEffect, Suspense, lazy, useState } from 'react';
import {
    Switch,
    Route,
    useLocation,
    Redirect,
    useHistory,
} from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import NProgress from 'nprogress';
import Axios from 'axios';
import { store } from 'react-notifications-component';

import useGlobalState from '../../globalStates/globalStates';

import MenuFooter from './menu-footer';

import Nav from '../home/nav';
import useSWR from 'swr';
import BuyChangeDirection from './shop/buyCD';
import NoMatch from './noMatch';
import { colors } from '../../globalStates/statics';

const CatagoriesPage = lazy(() => import('./catagories/catagories'));
const GeneralCatagoriesPage = lazy(() => import('./catagories/generalCat'));
const Main = lazy(() => import('./shop/main'));
const ItemPage = lazy(() => import('./shop/itemPage'));
const EditProfile = lazy(() => import('../menu-pages/edit-profile'));
const InvitePage = lazy(() => import('../menu-pages/invite'));
const AddCredit = lazy(() => import('../menu-pages/add-credit'));
const AllBuying = lazy(() => import('../menu-pages/allBuying'));
const MyComments = lazy(() => import('../menu-pages/my-comments'));
// const Support = lazy(() => import('../menu-pages/support'));
// const AboutUs = lazy(() => import('../menu-pages/about-us'));
const GuideItem = lazy(() => import('../menu-pages/guideItemPage'));
const GuideAllItems = lazy(() => import('../menu-pages/guidePage'));
const BuyPage = lazy(() => import('./shop/buy'));
const BuyPackage = lazy(() => import('./shop/buy-package'));
const HearPage = lazy(() => import('./shop/hearPage'));
const LibraryPage = lazy(() => import('./library/library'));
const AllComments = lazy(() => import('./shop/allComments'));
// const SearchAfterType = lazy(() => import('./search/searchAfterType'));
const Search = lazy(() => import('./search/search'));
const SearchWithFilter = lazy(() => import('./search/searchWithFilter'));
const AllPackages = lazy(() => import('./allPackages'));
const PackageItem = lazy(() => import('./packageItem'));

const Nav2 = (props) => {
    const [token, setToken] = useGlobalState('token');
    const history = useHistory();
    const [menuProps, setMeueProps] = useState({
        type: 'guest',
        image: '',
        name: '',
        number: '',
    });

    const { data: meData } = useSWR(
        token ? ['/auth/me', token] : null,
        (url, my_token) => {
            return Axios.get(url, {
                headers: {
                    Authorization: `Bearer ${my_token}`,
                },
            })
                .then((res) => {
                    console.log('getting me');
                    return res.data;
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
                            animationIn: [
                                'animate__animated',
                                'animate__flipInX',
                            ],
                            animationOut: [
                                'animate__animated',
                                'animate__fadeOut',
                            ],
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
                            type: 'warning',
                            dismiss: {
                                duration: 5000,
                                pauseOnHover: true,
                            },
                            title: 'ورود ناموفق',
                            message: 'مشکلی پیش آمده',
                        });
                        localStorage.removeItem('token');
                        localStorage.removeItem('my-hash');
                        setToken(null);
                    }

                    throw err;
                });
        }
    );

    useEffect(() => {
        console.log('me', meData);

        if (!token) {
            setMeueProps({ type: 'guest' });
        } else {
            if (meData) {
                setMeueProps({
                    type: 'logged-in',
                    image: meData.avatar,
                    name: meData.name,
                    number: meData.phone,
                });
            } else {
                setMeueProps({ type: 'guest' });
            }
        }
    }, [meData, token]);

    return <Nav {...props} {...menuProps} />;
};

const LazyLoad = () => {
    useEffect(() => {
        NProgress.start();

        return () => {
            NProgress.done();
        };
    });

    return '';
};

const PrimaryPages = () => {
    const [theme] = useGlobalState('theme');
    const [token] = useGlobalState('token');
    // eslint-disable-next-line no-unused-vars
    const [animationRest, setAnimationRest] = useState(true);

    useEffect(() => {
        document.documentElement.style.height = null;
    }, []);

    useEffect(() => {
        document.documentElement.style.overflowY = 'hidden';
    }, []);

    useEffect(() => {
        if (theme === 'light') {
            document.body.style.background = colors['background'];
        } else {
            document.body.style.background = colors['background_dark'];
        }
    }, [theme]);

    const location = useLocation();
    const transition = useTransition(
        location,
        (location) => {
            if (
                location.pathname.split('/').filter((a) => a)[0] === 'library'
            ) {
                return location.pathname.split('/').filter((a) => a)[0];
            } else {
                return location.pathname;
            }
        },
        {
            from: {
                opacity: 0,
                transform: 'translateY(-100px)',
                pointerEvents: 'none',
                // nav_transform: '-100%',
                nav_opacity: 0.5,
                nav_display: ' ',
            },
            enter: {
                opacity: 1,
                transform: 'translateY(0px)',
                pointerEvents: 'initial',
                // nav_transform: '0px',
                nav_opacity: 1,
                nav_display: ' ',
            },
            leave: {
                opacity: -6,
                transform: 'translateY(100%)',
                pointerEvents: 'initial',
                // nav_transform: '-100%',
                nav_opacity: -1,
                nav_display: 'none',
            },
            config: {
                tension: 370,
                friction: 33,
            },
            onStart: () => {
                // console.log('start Animation out');
                // if (animationRest === true) {
                //     // setAnimationRest(false);
                //     console.log('start Animation in');
                // }
            },
            onRest: () => {
                console.log('end animation');
                // setAnimationRest(true);
                // setAnimationRest(false);
            },
            onDestroyed: () => {
                console.log('on destroid');
            },
        }
    );

    return (
        <React.Fragment>
            <div
                className={`full-page transition-common ${
                    theme === 'light'
                        ? 'has-background-white-bis'
                        : 'has-background-black-ter has-text-white link--dark placeholder--dark-mode form--dark-mode'
                }`}
                style={{
                    minHeight: '100%',
                    direction: 'rtl',
                    overflowX: 'hidden',
                }}>
                <Suspense fallback={<LazyLoad />}>
                    {transition.map(({ item, props, key }) => (
                        <Switch location={item} key={key}>
                            <Route path="/" exact>
                                {/* <animated.div style={props} className="test"> */}
                                <animated.div
                                    className="full-page absolute-for-animation"
                                    style={props}>
                                    <Main
                                        animationRest={animationRest}
                                        style={{ paddingTop: '44px' }}
                                    />
                                </animated.div>

                                <Nav2
                                    style={{
                                        opacity: props.nav_opacity.interpolate(
                                            (nav_opacity) => `${nav_opacity}`
                                        ),
                                        display: props.nav_display.interpolate(
                                            (nav_display) =>
                                                `${
                                                    nav_display
                                                        ? nav_display
                                                        : ''
                                                }`
                                        ),
                                    }}
                                />
                                {/* </animated.div> */}
                            </Route>
                            <Route path="/cat">
                                <animated.div
                                    className="full-page absolute-for-animation"
                                    style={props}>
                                    <CatagoriesPage
                                        animationRest={animationRest}
                                    />
                                </animated.div>
                            </Route>
                            <Route path="/search/general/:propery">
                                <animated.div
                                    className="full-page absolute-for-animation"
                                    style={props}>
                                    <GeneralCatagoriesPage
                                        animationRest={animationRest}
                                    />
                                </animated.div>
                            </Route>
                            <Route path="/packages" exact>
                                {/* <Search /> */}
                                <animated.div
                                    className="full-page absolute-for-animation"
                                    style={props}>
                                    <AllPackages />
                                    {/* <SearchAfterType /> */}
                                    {/* <SearchWithFilter /> */}
                                </animated.div>
                            </Route>
                            <Route path="/packages/:id">
                                {/* <Search /> */}
                                <animated.div
                                    className="full-page absolute-for-animation"
                                    style={props}>
                                    <PackageItem />
                                    {/* <SearchAfterType /> */}
                                    {/* <SearchWithFilter /> */}
                                </animated.div>
                            </Route>
                            <Route path="/search/:title/:disableSort?/:fromGeneral?">
                                {/* <Search /> */}
                                <animated.div
                                    className="full-page absolute-for-animation"
                                    style={props}>
                                    <Search />
                                    {/* <SearchAfterType /> */}
                                    {/* <SearchWithFilter /> */}
                                </animated.div>
                            </Route>
                            <Route path="/search">
                                {/* <Search /> */}
                                <animated.div
                                    className="full-page absolute-for-animation"
                                    style={props}>
                                    {/* <Search /> */}
                                    {/* <SearchAfterType /> */}
                                    <SearchWithFilter />
                                </animated.div>
                            </Route>
                            <Route path="/library">
                                {token ? (
                                    <animated.div
                                        className="full-page absolute-for-animation"
                                        style={props}>
                                        <LibraryPage />
                                    </animated.div>
                                ) : (
                                    <Redirect
                                        to={{
                                            pathname: '/login_signup',
                                            state: { toLocation: '/library' },
                                        }}
                                    />
                                )}
                            </Route>

                            {/* Menu Pages Start */}
                            <Route path="/guide/item/:title">
                                <animated.div
                                    className="full-page absolute-for-animation"
                                    style={props}>
                                    <GuideItem />
                                </animated.div>
                            </Route>
                            <Route path="/guide">
                                <animated.div
                                    className="full-page absolute-for-animation"
                                    style={props}>
                                    <GuideAllItems />
                                </animated.div>
                            </Route>

                            {/* <Route path="/about-us">
                                <animated.div
                                    className="full-page absolute-for-animation"
                                    style={props}>
                                    <AboutUs />
                                </animated.div>
                            </Route> */}
                            {/* <Route path="/support">
                                <animated.div
                                    className="full-page absolute-for-animation"
                                    style={props}>
                                    <Support />
                                </animated.div>
                            </Route> */}
                            <Route path="/my-comments">
                                {token ? (
                                    <animated.div
                                        className="full-page absolute-for-animation"
                                        style={props}>
                                        <MyComments />
                                    </animated.div>
                                ) : (
                                    <Redirect
                                        to={{
                                            pathname: '/login_signup',
                                            state: { toLocation: '/library' },
                                        }}
                                    />
                                )}
                            </Route>
                            <Route path="/product/buy-package/:id">
                                {token ? (
                                    <animated.div
                                        className="full-page absolute-for-animation"
                                        style={props}>
                                        <BuyPackage />
                                    </animated.div>
                                ) : (
                                    <Redirect
                                        to={{
                                            pathname: '/login_signup',
                                            state: {
                                                toLocation: location.pathname,
                                            },
                                        }}
                                    />
                                )}
                            </Route>
                            <Route path="/product/buy/:bookId">
                                {token ? (
                                    <animated.div
                                        className="full-page absolute-for-animation"
                                        style={props}>
                                        <BuyPage />
                                    </animated.div>
                                ) : (
                                    <Redirect
                                        to={{
                                            pathname: '/login_signup',
                                            state: {
                                                toLocation: location.pathname,
                                            },
                                        }}
                                    />
                                )}
                            </Route>
                            <Route path="/credit-history">
                                {token ? (
                                    <animated.div
                                        className="full-page absolute-for-animation"
                                        style={props}>
                                        <AllBuying />
                                    </animated.div>
                                ) : (
                                    <Redirect to="/" />
                                )}
                            </Route>
                            <Route path="/add-credit">
                                {token ? (
                                    <animated.div
                                        className="full-page absolute-for-animation"
                                        style={props}>
                                        <AddCredit />
                                    </animated.div>
                                ) : (
                                    <Redirect to="/" />
                                )}
                            </Route>
                            <Route path="/invite">
                                {token ? (
                                    <animated.div
                                        className="full-page absolute-for-animation"
                                        style={props}>
                                        <InvitePage />
                                    </animated.div>
                                ) : (
                                    <Redirect to="/" />
                                )}
                            </Route>
                            <Route path="/edit-profile">
                                {token ? (
                                    <animated.div
                                        className="full-page absolute-for-animation"
                                        style={props}>
                                        <EditProfile />
                                    </animated.div>
                                ) : (
                                    <Redirect to="/" />
                                )}
                            </Route>
                            {/* Menu Pages End */}

                            <Route path="/product/book/:bookId/:ref?">
                                <animated.div
                                    className="full-page absolute-for-animation"
                                    style={props}>
                                    <ItemPage />
                                </animated.div>
                            </Route>
                            <Route path="/product/listen/:bookId">
                                <animated.div
                                    className="full-page absolute-for-animation"
                                    style={props}>
                                    <HearPage />
                                </animated.div>
                            </Route>
                            <Route path="/product/comments/:bookId">
                                <animated.div
                                    className="full-page absolute-for-animation"
                                    style={props}>
                                    <AllComments />
                                </animated.div>
                            </Route>

                            <Route path="/buycd">
                                <animated.div
                                    className="full-page absolute-for-animation"
                                    style={props}>
                                    <BuyChangeDirection />
                                </animated.div>
                            </Route>

                            <Route path={['*', '404']}>
                                <animated.div
                                    className="full-page absolute-for-animation"
                                    style={props}>
                                    <NoMatch />
                                </animated.div>
                            </Route>
                        </Switch>
                    ))}
                </Suspense>
                <MenuFooter />
            </div>
        </React.Fragment>
    );
};

export default PrimaryPages;

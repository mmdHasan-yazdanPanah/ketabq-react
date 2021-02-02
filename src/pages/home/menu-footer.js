import React from 'react';
import { NavLink } from 'react-router-dom';
import { store } from 'react-notifications-component';

import { ReactComponent as ShopIcon } from '../../images/icons/menu-footer/shop.svg';
import { ReactComponent as CatIcon } from '../../images/icons/menu-footer/cat.svg';
import { ReactComponent as LibraryIcon } from '../../images/icons/menu-footer/library.svg';
import { ReactComponent as SearchIcon } from '../../images/icons/menu-footer/search.svg';

import useGlobalState from '../../globalStates/globalStates';

const MenuFooter = () => {
    const [theme] = useGlobalState('theme');
    const [token] = useGlobalState('token');

    return (
        <footer
            id="menu-footer"
            className={`menu-footer transision-common ${
                theme === 'light'
                    ? 'has-background-white menu-footer--light'
                    : 'has-background-black-bis menu-footer--dark'
            }`}
        >
            <NavLink
                to="/"
                exact
                activeClassName="menu-footer--active"
                isActive={(match, location) => {
                    if (match) {
                        return true;
                    }
                    if (location.pathname.match(/^\/product/)) {
                        return true;
                    }
                }}
            >
                <figure className="menu-footer_item">
                    <ShopIcon
                        className={`menu-footer_icon icon transition-common-svg ${
                            theme === 'dark' ? 'icon-1--light' : ''
                        }`}
                    />
                    <span className="menu-footer_text">فروشگاه</span>
                </figure>
            </NavLink>
            <NavLink to="/cat" activeClassName="menu-footer--active">
                <figure className="menu-footer_item">
                    <CatIcon
                        className={`menu-footer_icon icon transition-common-svg ${
                            theme === 'dark' ? 'icon-1--light' : ''
                        }`}
                    />
                    <span className="menu-footer_text">دسته بندی</span>
                </figure>
            </NavLink>
            <NavLink
                to="/library"
                activeClassName="menu-footer--active"
                onClick={() => {
                    if (!token) {
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
                                duration: 4000,
                                pauseOnHover: true,
                            },
                            title: 'مخصوص اعضا',
                            message:
                                'استفاده از این ویژگی، نیازمند ثبت نام است',
                        });
                    }
                }}
            >
                <figure className="menu-footer_item">
                    <LibraryIcon
                        className={`menu-footer_icon icon transition-common-svg ${
                            theme === 'dark' ? 'icon-1--light' : ''
                        }`}
                    />
                    <span className="menu-footer_text">کتابخانه</span>
                </figure>
            </NavLink>
            <NavLink to="/search" activeClassName="menu-footer--active">
                <figure className="menu-footer_item">
                    <SearchIcon
                        className={`menu-footer_icon icon transition-common-svg ${
                            theme === 'dark' ? 'icon-1--light' : ''
                        }`}
                    />
                    <span className="menu-footer_text">جستجو</span>
                </figure>
            </NavLink>
        </footer>
    );
};

export default MenuFooter;

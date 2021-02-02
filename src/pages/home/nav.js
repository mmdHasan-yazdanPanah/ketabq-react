import React from 'react';
import useGlobalState from '../../globalStates/globalStates';
import { animated } from 'react-spring';

import { ReactComponent as Logo } from '../../images/icons/logo.svg';
import Burger from '../../components/svg-icons/burger';
import AsideNav from './aside-nav';

const Nav = ({ style, ...props }) => {
    const [menuIsOpen, setMenuIsOpen] = useGlobalState('menuIsOpen');
    const [theme] = useGlobalState('theme');

    const burgerClick = () => {
        setMenuIsOpen((prevState) => !prevState);
    };

    return (
        <animated.nav
            style={style}
            className={`${
                theme === 'light'
                    ? 'has-background-white menu--light'
                    : 'has-background-black-bis menu--dark'
            } menu transition-common`}
        >
            <div className="menu_burger">
                <Burger
                    width="64px"
                    height="64px"
                    strokeWidth="4"
                    clickCallBack={burgerClick}
                    closed={menuIsOpen}
                />
            </div>
            <a href="/" className="menu_logo">
                <Logo />
            </a>

            <AsideNav {...props} />
        </animated.nav>
    );
};

export default Nav;

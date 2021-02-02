import React, { useRef } from 'react';
import { Transition } from 'react-spring/renderprops';
import { Link, useHistory } from 'react-router-dom';
import Ripple from 'react-ripples';
import PropTypes from 'prop-types';

import useGlobalState from '../../globalStates/globalStates';

import ThemeBox from '../../components/theme-box';

import { ReactComponent as EditIcon } from '../../images/icons/aside-nav/edit.svg';
import { ReactComponent as CreditIcon } from '../../images/icons/aside-nav/credit-card.svg';
import { ReactComponent as ConversationIcon } from '../../images/icons/aside-nav/conversation.svg';
import { ReactComponent as BlogIcon } from '../../images/icons/aside-nav/blog.svg';
import { ReactComponent as InfoIcon } from '../../images/icons/aside-nav/information.svg';
import { ReactComponent as InviteIcon } from '../../images/icons/aside-nav/invite.svg';
import { ReactComponent as LogoutIcon } from '../../images/icons/aside-nav/logout.svg';
import { ReactComponent as UserIcon } from '../../images/icons/user.svg';

// import { ReactComponent as Telegram } from '../../images/icons/social/telegram.svg';
// import { ReactComponent as Youtube } from '../../images/icons/social/youtube.svg';
// import { ReactComponent as Twitter } from '../../images/icons/social/twitter.svg';
import { ReactComponent as Instagram } from '../../images/icons/social/instagram.svg';
import changeVhFunc from '../../components/changevh';
import { store } from 'react-notifications-component';

const AsideNav = ({ type, name, number, image }) => {
    const [menuIsOpen, setMenuIsOpen] = useGlobalState('menuIsOpen');
    const [theme] = useGlobalState('theme');
    const [, setToken] = useGlobalState('token');
    const [, setHash] = useGlobalState('hash');

    const navRef = useRef();

    const closeMenuHandler = (e) => {
        if (e.target === e.currentTarget) {
            setMenuIsOpen(false);
        }
    };

    return (
        <Transition
            items={menuIsOpen}
            from={{ transform: 'translateX(100%)' }}
            enter={{ transform: 'translateX(0%)' }}
            leave={{ transform: 'translateX(100%)' }}
            onStart={() => {
                if (navRef.current) {
                    console.log('rest', navRef);
                    changeVhFunc(navRef.current, 'height', 100);
                }
            }}>
            {(menuState) =>
                menuState
                    ? (props) => (
                          <div
                              className="aside-nav_overlap"
                              style={props}
                              onClick={(e) => closeMenuHandler(e)}>
                              <aside
                                  ref={navRef}
                                  className={`aside-nav ${
                                      theme === 'light'
                                          ? 'has-background-white'
                                          : 'has-background-black-bis'
                                  } scroll-custom`}>
                                  <div className="columns is-gapless is-mobile is-multiline mb-4">
                                      <div className="column is-full">
                                          <ThemeBox className="aside-nav_theme column is-narrow is-pulled-left" />
                                      </div>

                                      {type === 'logged-in' ? (
                                          <div className="column is-full aside-nav_about level level-left is-mobile mt-2">
                                              <figure className="image is-50x50 level-item is-narrow">
                                                  {image ? (
                                                      <img
                                                          style={{
                                                              height: '100%',
                                                          }}
                                                          className="is-rounded is-fit-cover"
                                                          src={image}
                                                          alt="عکس کاربر"
                                                      />
                                                  ) : (
                                                      <UserIcon
                                                          className="icon-user"
                                                          style={{
                                                              height: '100%',
                                                          }}
                                                      />
                                                  )}
                                              </figure>
                                              <div className="aside-nav_info has-text-centered">
                                                  <div className="is-size-6 has-text-weight-semibold">
                                                      {name}
                                                  </div>
                                                  <div
                                                      className="is-size-8"
                                                      dir="ltr">
                                                      {number}
                                                  </div>
                                              </div>
                                          </div>
                                      ) : null}

                                      {type === 'logged-in' ? (
                                          <React.Fragment>
                                              <Ripple
                                                  className="mt-4 column is-full aside-nav_item"
                                                  color="rgba(50, 115, 220, 0.3)">
                                                  <DelayedLink
                                                      onClick={() =>
                                                          setMenuIsOpen(false)
                                                      }
                                                      style={{ width: '100%' }}
                                                      to="/edit-profile"
                                                      className={`columns py-3 pr-3 my-0 is-vcentered is-mobile is-gapless ${
                                                          theme === 'dark'
                                                              ? 'link--dark'
                                                              : ''
                                                      }`}>
                                                      <EditIcon
                                                          className={`column is-narrow transition-common-svg ${
                                                              theme === 'dark'
                                                                  ? 'icon-1--light'
                                                                  : ''
                                                          }`}
                                                      />
                                                      <span
                                                          className={`is-size-7 has-text-weight-semibold column is-narrow mr-4`}>
                                                          ویرایش اطلاعات
                                                      </span>
                                                  </DelayedLink>
                                              </Ripple>
                                              <Ripple
                                                  className="mt-1 column is-full aside-nav_item"
                                                  color="rgba(50, 115, 220, 0.3)">
                                                  <DelayedLink
                                                      onClick={() =>
                                                          setMenuIsOpen(false)
                                                      }
                                                      style={{ width: '100%' }}
                                                      className={`my-0 py-3 pr-3 columns is-vcentered is-mobile is-gapless ${
                                                          theme === 'dark'
                                                              ? 'link--dark'
                                                              : ''
                                                      }`}
                                                      to="/credit-history">
                                                      <CreditIcon
                                                          className={`column is-narrow transition-common-svg ${
                                                              theme === 'dark'
                                                                  ? 'icon-1--light'
                                                                  : ''
                                                          }`}
                                                      />
                                                      <span
                                                          className={`is-size-7 has-text-weight-semibold column is-narrow mr-4`}>
                                                          کیف پول
                                                      </span>
                                                  </DelayedLink>
                                              </Ripple>
                                              <Ripple
                                                  className="mt-1 column is-full aside-nav_item"
                                                  color="rgba(50, 115, 220, 0.3)">
                                                  <DelayedLink
                                                      onClick={() =>
                                                          setMenuIsOpen(false)
                                                      }
                                                      style={{ width: '100%' }}
                                                      className={`my-0 py-3 pr-3 columns is-vcentered is-mobile is-gapless ${
                                                          theme === 'dark'
                                                              ? 'link--dark'
                                                              : ''
                                                      }`}
                                                      to="/my-comments">
                                                      <ConversationIcon
                                                          className={`column is-narrow transition-common-svg ${
                                                              theme === 'dark'
                                                                  ? 'icon-1--light'
                                                                  : ''
                                                          }`}
                                                      />
                                                      <span
                                                          className={`is-size-7 has-text-weight-semibold column is-narrow mr-4`}>
                                                          نظرات من
                                                      </span>
                                                  </DelayedLink>
                                              </Ripple>
                                          </React.Fragment>
                                      ) : (
                                          <Ripple
                                              className="mt-1 column is-full aside-nav_item"
                                              color="rgba(50, 115, 220, 0.3)">
                                              <DelayedLink
                                                  onClick={() =>
                                                      setMenuIsOpen(false)
                                                  }
                                                  style={{ width: '100%' }}
                                                  className={`my-0 py-3 pr-3 columns is-vcentered is-mobile is-gapless ${
                                                      theme === 'dark'
                                                          ? 'link--dark'
                                                          : ''
                                                  }`}
                                                  to={{
                                                      pathname: '/login_signup',
                                                      state: {
                                                          toLocation: '/',
                                                      },
                                                  }}>
                                                  <LogoutIcon
                                                      className={`column is-narrow transition-common-svg ${
                                                          theme === 'dark'
                                                              ? 'icon-1--light'
                                                              : ''
                                                      }`}
                                                  />
                                                  <span
                                                      className={`is-size-7 has-text-weight-semibold column is-narrow mr-4`}>
                                                      ورود یا ثبت نام
                                                  </span>
                                              </DelayedLink>
                                          </Ripple>
                                      )}

                                      <Ripple
                                          className="mt-1 column is-full aside-nav_item"
                                          color="rgba(50, 115, 220, 0.3)">
                                          <DelayedLink
                                              onClick={() =>
                                                  setMenuIsOpen(false)
                                              }
                                              style={{ width: '100%' }}
                                              className={`my-0 py-3 pr-3 columns is-vcentered is-mobile is-gapless ${
                                                  theme === 'dark'
                                                      ? 'link--dark'
                                                      : ''
                                              }`}
                                              to="https://ketabq.com/blog/"
                                              type={'out'}>
                                              <BlogIcon
                                                  className={`column is-narrow transition-common-svg ${
                                                      theme === 'dark'
                                                          ? 'icon-1--light'
                                                          : ''
                                                  }`}
                                              />
                                              <span
                                                  className={`is-size-7 has-text-weight-semibold column is-narrow mr-4`}>
                                                  وبلاگ کتاب کیو
                                              </span>
                                          </DelayedLink>
                                      </Ripple>
                                      <Ripple
                                          className="mt-1 column is-full aside-nav_item"
                                          color="rgba(50, 115, 220, 0.3)">
                                          <DelayedLink
                                              onClick={() =>
                                                  setMenuIsOpen(false)
                                              }
                                              style={{ width: '100%' }}
                                              className={`my-0 py-3 pr-3 columns is-vcentered is-mobile is-gapless ${
                                                  theme === 'dark'
                                                      ? 'link--dark'
                                                      : ''
                                              }`}
                                              to="/guide">
                                              <InfoIcon
                                                  className={`column is-narrow transition-common-svg ${
                                                      theme === 'dark'
                                                          ? 'icon-1--light'
                                                          : ''
                                                  }`}
                                              />
                                              <span
                                                  className={`is-size-7 has-text-weight-semibold column is-narrow mr-4`}>
                                                  راهنما
                                              </span>
                                          </DelayedLink>
                                      </Ripple>
                                      {/* <Ripple
                                          className="mt-1 column is-full aside-nav_item"
                                          color="rgba(50, 115, 220, 0.3)">
                                          <DelayedLink
                                              onClick={() =>
                                                  setMenuIsOpen(false)
                                              }
                                              style={{ width: '100%' }}
                                              className={`my-0 py-3 pr-3 columns is-vcentered is-mobile is-gapless ${
                                                  theme === 'dark'
                                                      ? 'link--dark'
                                                      : ''
                                              }`}
                                              to="/support">
                                              <TelIcon
                                                  className={`column is-narrow transition-common-svg ${
                                                      theme === 'dark'
                                                          ? 'icon-1--light'
                                                          : ''
                                                  }`}
                                              />
                                              <span
                                                  className={`is-size-7 has-text-weight-semibold column is-narrow mr-4`}>
                                                  پشتیبانی
                                              </span>
                                          </DelayedLink>
                                      </Ripple> */}
                                      {/* <Ripple
                                          className="mt-1 column is-full aside-nav_item"
                                          color="rgba(50, 115, 220, 0.3)">
                                          <DelayedLink
                                              onClick={() =>
                                                  setMenuIsOpen(false)
                                              }
                                              style={{ width: '100%' }}
                                              className={`my-0 py-3 pr-3 columns is-vcentered is-mobile is-gapless ${
                                                  theme === 'dark'
                                                      ? 'link--dark'
                                                      : ''
                                              }`}
                                              to="/about-us">
                                              <ExcamatinIcon
                                                  className={`column is-narrow transition-common-svg ${
                                                      theme === 'dark'
                                                          ? 'icon-1--light'
                                                          : ''
                                                  }`}
                                              />
                                              <span
                                                  className={`is-size-7 has-text-weight-semibold column is-narrow mr-4`}>
                                                  درباره کتاب کیو
                                              </span>
                                          </DelayedLink>
                                      </Ripple> */}
                                      {type === 'logged-in' ? (
                                          <React.Fragment>
                                              <Ripple
                                                  className="mt-1 column is-full aside-nav_item"
                                                  color="rgba(50, 115, 220, 0.3)">
                                                  <DelayedLink
                                                      onClick={() =>
                                                          setMenuIsOpen(false)
                                                      }
                                                      style={{ width: '100%' }}
                                                      className={`my-0 py-3 pr-3 columns is-vcentered is-mobile is-gapless ${
                                                          theme === 'dark'
                                                              ? 'link--dark'
                                                              : ''
                                                      }`}
                                                      to="/invite">
                                                      <InviteIcon
                                                          className={`column is-narrow transition-common-svg ${
                                                              theme === 'dark'
                                                                  ? 'icon-1--light'
                                                                  : ''
                                                          }`}
                                                      />
                                                      <span
                                                          className={`is-size-7 has-text-weight-semibold column is-narrow mr-4`}>
                                                          دعوت از دوستان
                                                      </span>
                                                  </DelayedLink>
                                              </Ripple>
                                              <Ripple
                                                  className="mt-1 column is-full aside-nav_item"
                                                  color="rgba(50, 115, 220, 0.3)">
                                                  <a
                                                      href="/"
                                                      onClick={(e) => {
                                                          e.preventDefault();
                                                          setMenuIsOpen(false);
                                                          localStorage.removeItem(
                                                              'token'
                                                          );
                                                          localStorage.removeItem(
                                                              'my-hash'
                                                          );
                                                          setHash(null);
                                                          setToken(null);
                                                          store.addNotification(
                                                              {
                                                                  container:
                                                                      'bottom-right',
                                                                  animationIn: [
                                                                      'animate__animated',
                                                                      'animate__flipInX',
                                                                  ],
                                                                  animationOut: [
                                                                      'animate__animated',
                                                                      'animate__fadeOut',
                                                                  ],
                                                                  type:
                                                                      'success',
                                                                  dismiss: {
                                                                      duration: 4000,
                                                                      pauseOnHover: true,
                                                                  },
                                                                  title:
                                                                      'خارج شدید',
                                                                  message:
                                                                      'به حالت کاربر مهمان تغییر یافتید',
                                                              }
                                                          );
                                                      }}
                                                      style={{ width: '100%' }}
                                                      className={`my-0 py-3 pr-3 columns is-vcentered is-mobile is-gapless ${
                                                          theme === 'dark'
                                                              ? 'link--dark'
                                                              : ''
                                                      }`}>
                                                      <LogoutIcon
                                                          className={`column is-narrow transition-common-svg ${
                                                              theme === 'dark'
                                                                  ? 'icon-1--light'
                                                                  : ''
                                                          }`}
                                                      />
                                                      <span
                                                          className={`is-size-7 has-text-weight-semibold column is-narrow mr-4`}>
                                                          خروج از حساب کاربری
                                                      </span>
                                                  </a>
                                              </Ripple>
                                          </React.Fragment>
                                      ) : null}
                                  </div>
                                  <div
                                      className="py-2"
                                      style={{ marginTop: 'auto' }}>
                                      <div className="columns is-mobile is-multiline">
                                          <span className="column is-full has-text-centered is-size-7 has-text-weight-semibold">
                                              شبکه های اجتماعی
                                          </span>
                                          <div className="column is-full ">
                                              <div className="columns is-vcentered is-mobile is-centered">
                                                  {/* <a
                                                      href="/"
                                                      className="column is-narrow">
                                                      <Telegram />
                                                  </a>
                                                  <a
                                                      href="/"
                                                      className="column is-narrow">
                                                      <Youtube />
                                                  </a>
                                                  <a
                                                      href="/"
                                                      className="column is-narrow">
                                                      <Twitter />
                                                  </a> */}
                                                  <a
                                                      href="https://www.instagram.com/ketabq_com/"
                                                      className="column is-narrow">
                                                      <Instagram />
                                                  </a>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </aside>
                          </div>
                      )
                    : null
            }
        </Transition>
    );
};

export default AsideNav;

AsideNav.propTypes = {
    type: PropTypes.oneOf(['logged-in', 'guest']).isRequired,
};

const DelayedLink = ({ to, delay, onClick, type, ...props }) => {
    const history = useHistory();

    const clickHandler = (e) => {
        e.preventDefault();

        if (onClick) {
            setTimeout(() => {
                onClick();
                setTimeout(() => {
                    if (type === 'out') {
                        window.location.href = to;
                    } else {
                        history.push(to);
                    }
                }, 200);
            }, 300);
        }
    };
    return <Link to={to} {...props} onClick={clickHandler} />;
};

DelayedLink.defaultProps = {
    type: 'in',
};

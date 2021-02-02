import React from 'react';
import { Link } from 'react-router-dom';

import useGlobalState from '../globalStates/globalStates';

import { ReactComponent as NextIcon } from '../images/icons/next-single.svg';

const SpecificationItem = ({ property, value, link, className, ...rest }) => {
    const [theme] = useGlobalState('theme');

    return (
        <div
            className={`specification-item has-text-weight-semibold columns is-gapless is-mobile ${
                className ? className : ''
            }`}
            {...rest}
        >
            <div
                className={`column is-3 is-size-8 is-size-8--responsive-tablet-up ${
                    theme === 'light' ? 'has-text-grey' : 'has-text-grey-light'
                }`}
            >
                <div className="specification-item_property is-overflow-ellipse">
                    {property}
                </div>
            </div>

            <div className="column is-size-8 is-size-8--responsive-tablet-up">
                <div className="specification-item_value">
                    <div>
                        {link ? (
                            <Link
                                to={link ? link : '#'}
                                style={{ justifyContent: 'flex-start' }}
                                className="level is-mobile clickable-info--svg-left"
                            >
                                <span>{value}</span>
                                <NextIcon className="icon-size--1" />
                            </Link>
                        ) : (
                            <span
                                style={{ justifyContent: 'flex-start' }}
                                className="level is-mobile"
                            >
                                <span>{value}</span>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecificationItem;

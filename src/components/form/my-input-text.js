import React, { useState } from 'react';

import useGlobalState from '../../globalStates/globalStates';

import { ReactComponent as SearchIcon } from '../../images/icons/menu-footer/search.svg';

const MyInput = ({
    search,
    className,
    placeholder,
    childern,
    type,
    value,
    onChange,
    ...rest
}) => {
    const [isActive, setIsActive] = useState(false);
    // const [value, setValue] = useState('');
    const [theme] = useGlobalState('theme');

    return (
        <div
            {...rest}
            className={`radius--1 my-input_box ${
                isActive ? 'my-input_box--active' : ''
            } shadow--1 ${
                theme === 'light'
                    ? 'has-background-white'
                    : 'has-background-grey-darker'
            }  ${search ? 'my-input_box--with-icon' : ''} ${
                className ? className : ''
            }`}>
            <div className="my-input_after-padding">
                {search ? (
                    <SearchIcon
                        className={`my-input_icon ${
                            theme === 'light'
                                ? 'my-input_icon--light'
                                : 'my-input_icon--dark'
                        } ${
                            value.trim().length > 0 || isActive
                                ? 'my-input_icon--active'
                                : ''
                        }`}
                    />
                ) : null}
                <input
                    dir="auto"
                    style={{ textAlign: 'right' }}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setIsActive(true)}
                    onBlur={() => setIsActive(false)}
                    placeholder={placeholder ? placeholder : ''}
                    type={type ? type : 'text'}
                    className={`my-input_input input ${
                        theme === 'dark'
                            ? 'has-text-white has-text-weight-light'
                            : ''
                    }`}
                />
            </div>
        </div>
    );
};

export default MyInput;

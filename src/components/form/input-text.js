import React, { useState, useRef, useEffect } from 'react';
import { ReactComponent as EyeIcon } from '../../images/icons/eye.svg';
import { focusOnEnd } from '../../components/functions/functions';

const InputText = ({
    type,
    placeholder,
    className,
    direction,
    name,
    label,
    value,
    inputClassName,
}) => {
    const [showPass, setShowPass] = useState(false);
    const [inputText, setInputText] = useState(value ? value : '');
    const passInputRef = useRef();

    useEffect(() => {
        if (value) {
            setInputText(value);
        }
    }, [value]);

    const handleShowBtn = (event) => {
        event.preventDefault();
        setShowPass((prevState) => !prevState);
        focusOnEnd(passInputRef.current);
    };

    const inputOnchangeHandler = (event) => {
        setInputText(event.currentTarget.value);
    };

    return (
        <div className={`field ${className ? className : ''}`}>
            <div
                className={`control our-input our-input--responsive ${
                    type === 'password' ? 'has-icons-left' : ''
                }`}>
                {label ? (
                    <label
                        style={{ display: 'block' }}
                        className="is-size-7 is-size-7--responsive-tablet-up mb-2"
                        htmlFor={name}>
                        {label}
                    </label>
                ) : null}
                <input
                    dir="auto"
                    style={{ textAlign: 'right' }}
                    name={name ? name : ''}
                    id={name ? name : ''}
                    onFocus={
                        type === 'password'
                            ? (e) => focusOnEnd(e.currentTarget)
                            : null
                    }
                    onChange={inputOnchangeHandler}
                    value={inputText}
                    ref={type === 'password' ? passInputRef : null}
                    type={showPass ? 'text' : type}
                    className={`input is-primary is-family-primary pr-4 pl-1 py-2 ${
                        direction === 'rtl'
                            ? 'input-right-to-left--english'
                            : ''
                    } ${inputClassName ? inputClassName : ''}`}
                    placeholder={placeholder ? placeholder : ''}
                />
                {type === 'password' ? (
                    <span
                        className="z-index--10 icon is-small is-left ml-1 simple-click"
                        style={{ height: '100%', pointerEvents: 'all' }}
                        onMouseDown={(e) => handleShowBtn(e)}>
                        <EyeIcon
                            className={
                                showPass ? 'fill--blue' : 'fill--primary'
                            }
                        />
                    </span>
                ) : null}
            </div>
        </div>
    );
};

export default InputText;

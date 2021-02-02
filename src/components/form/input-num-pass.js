import React, { useState, useRef, useEffect } from 'react';

const InputSeperatedPass = ({
    info,
    className,
    time,
    itemsNumber,
    onChange,
    timeFinishedReplaceElement,
    ...props
}) => {
    const [inputText, setInputText] = useState(Array(itemsNumber).fill(''));

    const wrapperRef = useRef();

    useEffect(() => {
        onChange(inputText.join(''));
    }, [inputText, onChange]);

    const inputOnchangeHandler = (event, index) => {
        let value = event.currentTarget.value;

        if (value.length > 1) {
            if (inputText[index] !== '') {
                value = value.slice(1, value.length);
            }

            setInputText((prevState) => {
                let res = [...prevState];
                value.split('').forEach((number, numberIndex) => {
                    if (index + numberIndex < res.length) {
                        res[index + numberIndex] = number;
                    }
                });

                return res;
            });

            if (value.length + index + 1 < inputText.length) {
                wrapperRef.current
                    .querySelectorAll('input')
                    [value.length].focus();
            } else {
                wrapperRef.current
                    .querySelectorAll('input')
                    [inputText.length - 1].focus();
            }
        } else {
            setInputText((prevState) => {
                const res = [...prevState];
                res[index] = value;
                return res;
            });
            if (value.length === 1 && index + 1 < inputText.length) {
                wrapperRef.current.querySelectorAll('input')[index + 1].focus();
            }
            if (value.length === 0 && index !== 0) {
                wrapperRef.current.querySelectorAll('input')[index - 1].focus();
            }
        }
    };

    const inputOnPasteHandler = (event, index) => {
        // let paste = (event.clipboardData || window.clipboardData).getData(
        //     'text'
        // );
        // // console.log(paste);
        // setInputText((prevState) => {
        //     let res = [...prevState];
        //     paste.split('').forEach((number, numberIndex) => {
        //         if (index + numberIndex < res.length) {
        //             res[index + numberIndex] = number;
        //         }
        //     });
        //     return res;
        // });
        // if (paste.length + index + 1 < inputText.length) {
        //     wrapperRef.current.querySelectorAll('input')[paste.length].focus();
        // } else {
        //     wrapperRef.current
        //         .querySelectorAll('input')
        //         [inputText.length - 1].focus();
        // }
    };

    return (
        <div className={`field ${className ? className : ''}`}>
            <div
                className={`control`}
                style={{ direction: 'ltr' }}
                ref={wrapperRef}>
                <p className="mb-3 is-size-7 is-size-7--responsive-tablet-up">
                    {info}
                </p>
                {inputText.map((value, index) => {
                    return (
                        <input
                            key={index}
                            onChange={(e) => inputOnchangeHandler(e, index)}
                            onPaste={(e) => inputOnPasteHandler(e, index)}
                            value={value}
                            type="number"
                            className="input sepearated is-primary is-family-primary has-text-black has-text-weight-light input-right-to-left--english"
                            {...props}
                        />
                    );
                })}
                <p
                    className="mt-2 is-size-7 is-size-7--responsive-tablet-up has-text-weight-light"
                    style={{ direction: 'rtl' }}>
                    {time > 0 ? (
                        <React.Fragment>
                            <span>{time}</span>
                            {' ثانیه باقی مانده'}
                        </React.Fragment>
                    ) : (
                        timeFinishedReplaceElement
                    )}
                </p>
            </div>
        </div>
    );
};

export default InputSeperatedPass;

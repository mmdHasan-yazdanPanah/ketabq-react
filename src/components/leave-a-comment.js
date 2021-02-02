import React, { useState } from 'react';
import { CircleSpinner } from 'react-spinners-kit';

import useGlobalState from '../globalStates/globalStates';
import { colors } from '../globalStates/statics.js';

import RateboxStar from './ratebox-star';
import Button from './buttons/button';

const LeaveComment = ({
    placeholder,
    onSubmitHandler,
    onCancelHandler,
    hasBook,
}) => {
    const [value, setValue] = useState(
        hasBook ? '' : 'برای ثبت نظر باید کتاب مورد نظر را خریداری کنید'
    );
    const [theme] = useGlobalState('theme');
    const [rate, setRate] = useState(0);
    const [commentSending] = useGlobalState('commentSending');

    return (
        <React.Fragment>
            <div className="field">
                <div className="control has-text-weight-semibold--placeholder">
                    <textarea
                        disabled={!hasBook ? true : false}
                        className="textarea is-primary"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}></textarea>
                </div>
            </div>

            <div className="level is-mobile mt-2">
                <div className="level-item" id="item-comments-ratebox">
                    <RateboxStar
                        rate={0}
                        clickable={true}
                        sizeClass="size-by-w--1"
                        onChangeRateHandler={(rate) => {
                            setRate(rate);
                        }}
                    />
                </div>
            </div>

            <div className="level is-mobile">
                <div className="level-item">
                    <div className="level is-mobile">
                        <div
                            className="level-item"
                            style={{ marginLeft: '6px', position: 'relative' }}>
                            {commentSending ? (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        left: 'calc(100% + 5px)',
                                    }}>
                                    <CircleSpinner
                                        size={18}
                                        color={colors['primary']}
                                    />
                                </div>
                            ) : null}
                            <Button
                                disabled={
                                    rate || (hasBook && value.trim().length)
                                        ? false
                                        : true
                                }
                                size="small"
                                wide={true}
                                weight="has-text-weight-normal"
                                className={`is-outlined ${
                                    theme === 'dark' ? 'has-text-white' : ''
                                }`}
                                style={{ minWidth: '68px' }}
                                onClick={() =>
                                    onSubmitHandler({
                                        rate: rate,
                                        comment: hasBook ? value : '',
                                    })
                                }>
                                ثبت
                            </Button>
                        </div>
                        <div className="level-item">
                            <Button
                                size="small"
                                wide={true}
                                weight="has-text-weight-normal"
                                className={`is-outlined ${
                                    theme === 'dark' ? 'has-text-white' : ''
                                }`}
                                style={{ minWidth: '68px' }}
                                onClick={onCancelHandler}>
                                انصراف
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default LeaveComment;

import React from 'react';

// import NextIcon from './svg-icons/next';
import { ReactComponent as NextIcon } from '../images/icons/next-single.svg';

const Next = ({ onClickHandler, style }) => {
    return (
        // eslint-disable-next-line
        <a
            role="button"
            style={style}
            className="level is-inline-flex is-mobile is-family-primary is-pulled-right is-clearfix"
            onClick={onClickHandler}
        >
            <div className="level-item mr-2 content">
                <p className="is-size-6">بعدی</p>
            </div>
            <div
                className="level-item"
                style={{ transform: 'translateY(1px)' }}
            >
                <NextIcon className="icon iconNext iconNext--primary" />
            </div>
        </a>
    );
};

export default Next;

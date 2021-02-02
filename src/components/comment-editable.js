import React from 'react';

// import { ReactComponent as BinIcon } from '../images/icons/bin.svg';
// import { ReactComponent as PencilIcon } from '../images/icons/pencil.svg';

// import RateboxStar from './ratebox-star';
// import RateboxStar from '../components/ratebox-star';

const CommentEditable = ({ imageSrc, text, className, accepeted }) => {
    return (
        <div
            className={`columns is-mobile is-gapless ${
                className ? className : ''
            }`}>
            <div className="column is-narrow">
                <div className="image commentEditable_image">
                    <img
                        loading="lazy"
                        className="radius--1 is-fit-cover"
                        src={imageSrc}
                        alt=""
                    />
                </div>
            </div>
            <div className="column mr-3">
                <div
                    className="columns is-gapless is-mobile is-multiline"
                    style={{ height: '100%' }}>
                    <div className="column is-full mb-2">
                        <p className="has-text-weight-light is-size-7 is-size-7--responsive-desktop-up paragraph--wide">
                            {text}
                        </p>
                    </div>
                    <div
                        className="column is-full mb-2"
                        style={{ lineHeight: 0, marginTop: 'auto' }}>
                        {/* <div className="columns is-mobile is-gapless">
                            <div
                                className="column is-narrow"
                                style={{ marginTop: 'auto' }}
                            >
                                <div className="columns is-mobile is-vcetered is-gapless">
                                    <div className="column is-narrow">
                                        <div className="px-1">
                                            <BinIcon className="size-by-h--2" />
                                        </div>
                                    </div>
                                    <div className="column is-narrow">
                                        <div className="px-1">
                                            <PencilIcon className="size-by-h--2" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-narrow commentEditable_ratebox">
                                <RateboxStar
                                    rate={rate}
                                    sizeClass="size-by-w--3"
                                />
                            </div>
                        </div> */}
                        <span
                            className={`${
                                !accepeted
                                    ? 'has-text-primary'
                                    : 'has-text-success'
                            } has-text-weight-light is-size-7 is-size-7--responsive-desktop-up paragraph--wide`}>
                            {accepeted ? 'تایید شده' : 'در انتظار تایید'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentEditable;

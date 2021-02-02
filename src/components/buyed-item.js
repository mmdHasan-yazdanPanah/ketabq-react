import React from 'react';

import useGlobalState from '../globalStates/globalStates';

const BuyedItem = ({ imageSrc, name, author, price }) => {
    const [theme] = useGlobalState('theme');

    return (
        <div className="columns is-mobile is-gapless">
            <div className="column is-narrow">
                <div className="image buyed-item_image">
                    <img
                        style={{ height: '100%' }}
                        className="is-fit-cover radius--1"
                        src={imageSrc}
                        alt={name}
                    />
                </div>
            </div>
            <div className="column mr-4 in-narrow is-size-7 is-size-7--responsive-desktop-up">
                <div className="columns is-mobile is-multiline is-gapless">
                    <div className="column is-full">
                        <div className="columns is-gapless is-mobile">
                            <div
                                className="column is-narrow ml-2"
                                style={{
                                    flexShrink: 1,
                                }}>
                                {name}
                            </div>
                            {price ? (
                                <div
                                    className="column is-narrow"
                                    style={{
                                        marginRight: 'auto',
                                    }}>
                                    <span className="ml-1 has-text-weight-semibold">
                                        {price}
                                    </span>
                                    <span>تومان</span>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div
                        className={`column mr-2 ${
                            theme === 'light'
                                ? 'has-text-grey'
                                : 'has-text-grey-light'
                        }`}
                        style={{ marginTop: '2px' }}>
                        {author}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyedItem;

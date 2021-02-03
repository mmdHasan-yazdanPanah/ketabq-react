import React from 'react';
import { SwishSpinner } from 'react-spinners-kit';
import DelayedLink from '../components/delayedLink';

import RateboxStar from './ratebox-star';

import useGlobalState from '../globalStates/globalStates';
import { colors } from '../globalStates/statics';

const ShowcaseItem = ({
    name,
    author,
    discount,
    price,
    img,
    rate,
    className,
    noContent,
    loading,
    link,
}) => {
    const theme = useGlobalState('theme');

    return (
        <div className={className} style={{ position: 'relative' }}>
            {loading ? (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}>
                    <SwishSpinner size={50} frontColor={colors['dark']} />
                </div>
            ) : null}

            <DelayedLink
                delay={190}
                to={link ? link : '/'}
                title={name}
                style={noContent ? { pointerEvents: 'none' } : {}}>
                <figure
                    className={`showcase-item is-clipped transition-common ${
                        theme[0] === 'light'
                            ? 'showcase-item--light'
                            : 'showcase-item--dark'
                    }`}
                    style={{ direction: 'rtl' }}>
                    {noContent ? (
                        <div className="showcase-item_image"></div>
                    ) : (
                        <img
                            loading="lazy"
                            src={img}
                            alt={name}
                            className="showcase-item_image"
                        />
                    )}
                    <figcaption
                        className={`showcase-item_caption ${
                            theme[0] === 'light'
                                ? 'has-background-white'
                                : 'has-background-black-ter'
                        }`}>
                        {!noContent ? (
                            <React.Fragment>
                                <cite className="showcase-item_name is-size-7 is-size-7--responsive-tablet-up has-text-weight-semibold">
                                    {name}
                                </cite>
                                <span className="showcase-item_author">
                                    {author}
                                </span>
                                {discount && discount > 0 && price > 0 ? (
                                    <div className="showcase-item_price--discount">
                                        <del className="is-family-secondary showcase-item_before-discount">
                                            {price.toLocaleString()}
                                        </del>
                                        <span className="showcase-item_after-discount">
                                            <span className="is-family-secondary has-text-weight-medium">
                                                {Number(
                                                    (
                                                        price *
                                                        ((100 - discount) / 100)
                                                    ).toFixed()
                                                ).toLocaleString()}
                                            </span>
                                            {'تومان'}
                                        </span>
                                        <span className="showcase-item_discount-box has-background-primary is-family-secondary">
                                            <span>{`${discount}%`}</span>
                                        </span>
                                    </div>
                                ) : (
                                    <div className="showcase-item_price--no-discount">
                                        {price > 0 ? (
                                            <React.Fragment>
                                                <span className="is-family-secondary has-text-weight-medium">
                                                    {price.toLocaleString()}
                                                </span>
                                                {' تومان'}
                                            </React.Fragment>
                                        ) : (
                                            <span className="is-family-secondary has-text-weight-medium has-text-primary">
                                                رایگان
                                            </span>
                                        )}
                                    </div>
                                )}
                                {rate || rate === 0 ? (
                                    <RateboxStar
                                        rate={rate}
                                        className="showcase-item_rate"
                                    />
                                ) : null}
                            </React.Fragment>
                        ) : null}
                    </figcaption>
                </figure>
            </DelayedLink>
        </div>
    );
};

// ShowcaseItem.propTypes = {
//     discount: PropTypes.number,
//     name: PropTypes.string.isRequired,
//     author: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     img: PropTypes.any.isRequired,
//     rate: PropTypes.number.isRequired,
// };

export default ShowcaseItem;

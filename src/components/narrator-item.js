import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as IconUser } from '../images/icons/user.svg';

const NarratorItem = ({ className, imgSrc, name, link }) => {
    return (
        <Link to={link} className={className}>
            <figure className="narrator-item">
                {imgSrc ? (
                    <img
                        loading="lazy"
                        className="narrator-item_img"
                        src={imgSrc}
                        alt={name}
                    />
                ) : (
                    <IconUser className="narrator-item_img icon-user" />
                )}

                <figcaption className="narrator-item_caption has-text-weight-semibold has-text-centered">
                    {name}
                </figcaption>
            </figure>
        </Link>
    );
};

NarratorItem.defaultProps = {
    link: '#',
};

export default NarratorItem;

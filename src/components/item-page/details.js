import React from 'react';

const ItemPageDetails = ({ value, ...props }) => {
    return (
        <p
            className={`has-text-weight-light has-text-justified paragraph ${
                props.className ? props.className : ''
            }`}
        >
            {value}
        </p>
    );
};

export default ItemPageDetails;

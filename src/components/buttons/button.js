import React from 'react';

const Button = ({
    children,
    className,
    size,
    preferedElement,
    backgroudClass,
    textColorClass,
    fullHeight,
    weight,
    shrink,
    wide,
    ...rest
}) => {
    let sizeClassNames = `${!shrink ? 'px-6' : 'px-2'}`;

    if (size === 'small') {
        sizeClassNames = `${shrink ? 'px-2' : ''} ${wide ? 'px-4' : ''} ${
            !shrink && !wide ? 'px-3' : ''
        } is-size-7 ${!fullHeight ? 'is-height-fit' : ''} py-1`;
    }

    if (size === 'md') {
        sizeClassNames = `${!shrink ? 'px-4' : 'px-2'} is-size-6 ${
            !fullHeight ? 'is-height-fit' : ''
        } py-1`;
    }

    if (preferedElement === 'span') {
        return (
            <span
                style={fullHeight ? { height: '100%' } : {}}
                {...rest}
                className={`button ${
                    backgroudClass ? backgroudClass : 'is-primary'
                } ${textColorClass ? textColorClass : ''} ${sizeClassNames} ${
                    weight ? weight : 'has-text-weight-light'
                } ${className ? className : ''}`}
            >
                {children}
            </span>
        );
    }

    return (
        <button
            style={fullHeight ? { height: '100%' } : {}}
            {...rest}
            className={`button ${
                backgroudClass ? backgroudClass : 'is-primary'
            } ${textColorClass ? textColorClass : ''} ${sizeClassNames} ${
                weight ? weight : 'has-text-weight-light'
            } ${className ? className : ''}`}
        >
            {children}
        </button>
    );
};

// import React from 'react';

// const Button = ({ children, className, size }) => {
//     let sizeClassNames = 'px-6';

//     if (size === 'small') {
//         sizeClassNames = 'px-3 is-size-7';
//     }

//     return <button className={`button is-primary has-text-whit has-text-weight-light ${className ? className : ''}`}>{children}</button>;
// };

// export default Button;

export default Button;

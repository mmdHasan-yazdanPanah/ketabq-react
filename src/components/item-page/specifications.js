import React from 'react';
import { Trail, animated } from 'react-spring/renderprops';

import SpecificationItem from '../../components/specification-item';

const ItemPageSpecifications = ({ items }) => {
    return (
        <Trail
            config={{ tension: 220 }}
            native
            keys={(item) => item.property}
            items={items}
            from={{ transform: 'translateX(100%)' }}
            to={{ transform: 'translateX(0%)' }}>
            {(item, index) => (props) => (
                <animated.div style={props}>
                    <SpecificationItem
                        property={item.property}
                        value={item.value}
                        link={item.link}
                        className={index > 0 ? 'mt-4 pt-1' : ''}
                        highlight={item.highlight}
                    />
                </animated.div>
            )}
        </Trail>
    );

    // return (
    //     <React.Fragment>
    //         <SpecificationItem property="نویسنده" value="دارن هاردی" />
    //         <SpecificationItem
    //             className="mt-4 pt-1"
    //             property="نویسنده"
    //             value="دارن هاردی"
    //         />
    //         <SpecificationItem
    //             className="mt-4 pt-1"
    //             property="نویسنده"
    //             value="دارن هاردی"
    //         />
    //         <SpecificationItem
    //             className="mt-4 pt-1"
    //             property="نویسنده"
    //             value="دارن هاردی"
    //         />
    //         <SpecificationItem
    //             className="mt-4 pt-1"
    //             property="نویسنده"
    //             value="دارن هاردی"
    //         />
    //         <SpecificationItem
    //             className="mt-4 pt-1"
    //             property="نویسنده"
    //             value="دارن هاردی"
    //         />
    //         <SpecificationItem
    //             className="mt-4 pt-1"
    //             property="نویسنده"
    //             value="دارن هاردی"
    //         />
    //         <SpecificationItem
    //             className="mt-4 pt-1"
    //             property="نویسنده"
    //             value="دارن هاردی"
    //         />
    //         <SpecificationItem
    //             className="mt-4 pt-1"
    //             property="نویسنده"
    //             value="دارن هاردی"
    //         />
    //         <SpecificationItem
    //             className="mt-4 pt-1"
    //             property="نویسنده"
    //             value="دارن هاردی"
    //         />
    //         <SpecificationItem
    //             className="mt-4 pt-1"
    //             property="نویسنده"
    //             value="دارن هاردی"
    //         />
    //         <SpecificationItem
    //             className="mt-4 pt-1"
    //             property="نویسنده"
    //             value="دارن هاردی"
    //         />
    //         <SpecificationItem
    //             className="mt-4 pt-1"
    //             property="نویسنده"
    //             value="دارن هاردی"
    //         />
    //         <SpecificationItem
    //             className="mt-4 pt-1"
    //             property="نویسنده"
    //             value="دارن هاردی"
    //         />
    //     </React.Fragment>
    // );
};

export default ItemPageSpecifications;

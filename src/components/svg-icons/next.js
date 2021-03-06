import React from 'react';

const NextIcon = ({ colorClass, width, height, className }) => {
    return (
        <svg id="next" viewBox="0 0 6.034 9.05" width={width ? `${width}` : null} height={height ? `${height}` : null} className={className ? `${className}` : null}>
            <g id="Group_25" data-name="Group 25" transform="translate(0 0)">
                <g id="Group_24" data-name="Group 24" transform="translate(0 0)">
                    <path
                        id="Path_1384"
                        data-name="Path 1384"
                        d="M229.592,51.474l-3.017-3.017a1.508,1.508,0,1,0-2.133,2.133l1.95,1.95-1.95,1.95a1.508,1.508,0,1,0,2.133,2.133l3.017-3.017a1.508,1.508,0,0,0,0-2.133Zm-.533,1.6-3.017,3.017a.772.772,0,0,1-1.066,0,.755.755,0,0,1,0-1.066l2.484-2.484-2.484-2.484a.754.754,0,0,1,1.066-1.067l3.017,3.017a.755.755,0,0,1,0,1.067Z"
                        transform="translate(-224 -48.016)"
                        className={colorClass ? `${colorClass}` : null}
                    />
                </g>
            </g>
        </svg>
    );
};

export default NextIcon;

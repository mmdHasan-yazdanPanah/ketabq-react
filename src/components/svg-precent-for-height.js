import React, { useRef, useEffect } from 'react';

const SvgPrecentHeight = ({
    svgHeightPrecentage,
    wrapperClassName,
    svgClassName,
    SvgComponent,
    noTransform,
    wrapperStyle = {},
    svgStyle = {},
}) => {
    const wrapperRef = useRef();
    const svgRef = useRef();

    useEffect(() => {
        let timeStamp = 0;

        const hardCodeTheHeight = () => {
            let style;
            if (svgRef.current.querySelector('style')) {
                // style = svgRef.current.querySelector('style').cloneNode(true);
                style = svgRef.current.querySelector('style');
                // svgRef.current.querySelector('style').remove();
            }
            svgRef.current.style.height = 0;
            svgRef.current.style.width = 0;
            let height;

            var computedStyle = window.getComputedStyle(wrapperRef.current);
            height =
                parseFloat(computedStyle['height']) -
                parseFloat(computedStyle['paddingTop']) -
                parseFloat(computedStyle['paddingBottom']);
            console.log(height);
            console.log(parseFloat((height / 100) * svgHeightPrecentage));

            svgRef.current.style.height = `${Math.floor(
                parseFloat((height / 100) * svgHeightPrecentage)
            )}px`;
            svgRef.current.style.width = '100%';

            if (style) {
                svgRef.current.appendChild(style);
            }
        };

        hardCodeTheHeight();

        // let timeout;

        // timeout = () => {
        //     clearTimeout(timeout);
        //     setTimeout(() => {
        //         hardCodeTheHeight();
        //     }, 1);
        // };

        window.addEventListener('resize', hardCodeTheHeight);

        return () => {
            window.removeEventListener('resize', hardCodeTheHeight);
        };
    }, [svgHeightPrecentage]);

    return (
        <div
            style={wrapperStyle}
            ref={wrapperRef}
            className={`${
                noTransform ? 'svg-wrapper--noTransfrom' : 'svg-wrapper'
            } ${wrapperClassName ? wrapperClassName : ''}`}>
            <SvgComponent
                style={svgStyle}
                ref={svgRef}
                className={`${svgClassName ? svgClassName : ''}`}
            />
        </div>
    );
};

export default SvgPrecentHeight;

const changeVhFunc = (element, style, amount) => {
    let pageWidth = null;

    const chnageVh = () => {
        const fullVh = (window.innerHeight / 100) * amount;
        const elementFullVh = parseInt(window.getComputedStyle(element)[style]);
        console.log('pageWidth:' + pageWidth, 'current: ' + window.innerWidth);
        if (fullVh !== elementFullVh) {
            if (pageWidth === null || pageWidth !== window.innerWidth) {
                console.log(
                    'change Happend',
                    'elementFullVh: ' + elementFullVh,
                    'fullVh: ' + fullVh
                );
                element.style[style] = fullVh + 'px';
                pageWidth = window.innerWidth;
            }
        } else {
            console.log('full vh vs:', fullVh, elementFullVh);
        }
    };
    chnageVh();

    window.addEventListener('resize', chnageVh);

    return () => {
        window.removeEventListener('resize', chnageVh);
    };
};

export default changeVhFunc;

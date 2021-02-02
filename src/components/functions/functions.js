export const focusOnEnd = (target) => {
    // console.log('focus');
    setTimeout(function () {
        target.selectionStart = target.selectionEnd = 10000;
    }, 0);
};

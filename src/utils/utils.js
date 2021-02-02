export const makeRateAvg = (score) => {
    let allRateCount = 0;
    let allRatePaople = 0;
    let rateAvg = 0;
    for (let scoreState in score) {
        allRatePaople += score[scoreState];
    }
    allRateCount += score.s1 * 1;
    allRateCount += score.s2 * 2;
    allRateCount += score.s3 * 3;
    allRateCount += score.s4 * 4;
    allRateCount += score.s5 * 5;
    rateAvg = allRateCount / allRatePaople;

    return {
        rateAvg: rateAvg,
        allRatePaople: allRatePaople,
    };
};

module.exports = (minVal, maxVal) => {
    let finalFilter = {};
    const min = Number(minVal);
    const max = Number(maxVal);

    if (min) finalFilter['$gte'] = min;
    if (max) finalFilter['$lte'] = max;

    return finalFilter;
};

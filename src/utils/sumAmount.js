export const sumTotalAmount = (data) => {

    const result = data?.reduce((acc, curr) => ({
        income: acc.income + curr.income,
        expanse: acc.expanse + curr.expanse
    }));
    return result;
};


export const sumTotalAmount = (data) => {
    if(data?.length === 1) {
        const result = {
            income: data[0].income,
            expanse: data[0].expanse
        }
        console.log(data);
        return result
    };

    const result = data?.reduce((acc, curr) => ({
        income: acc.income + curr.income,
        expanse: acc.expanse + curr.expanse
    }));
    return result;
};


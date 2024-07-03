export const yearDataFilter = (data, month, year) => {
    const yearFiltered = data.filter(obj => {
        const newDate = new Date(obj.date);
        return year === newDate.getFullYear();
    });

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // buat 12 custom array of object
    const newData = Array(12).fill(null).map((_, idx) => ({
        month: monthNames[idx],
        income: 0,
        expanse: 0

    }));

    yearFiltered.forEach(transaction => {
        const date = new Date(transaction.date);
        const monthIdx = date.getMonth();

        if(transaction.type === 'income') {
            newData[monthIdx].income += transaction.amount
        } else if(transaction.type === 'expanse') {
            newData[monthIdx].expanse += transaction.amount
        }
    });
    return newData;
};

export const monthDataFilter  = (data, months, year) => {
    // console.log("month");
};
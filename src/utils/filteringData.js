export const yearDataFilter = (data, year) => {
    const yearFiltered = data?.filter(obj => {
        const date = new Date(obj.date);
        return year === date.getFullYear();
    });

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // buat 12 custom array of object
    const newData = Array(12).fill(null).map((_, idx) => ({
        name: monthNames[idx],
        income: 0,
        expanse: 0

    }));

    yearFiltered?.forEach(transaction => {
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

export const monthDataFilter  = (data, month, year) => {

    const monthFiltered = data?.filter(obj => {
        const date = new Date(obj.date);
        return date.getMonth() === month && date.getFullYear() === year;
    });

    // create days in every month. anjai juga ini baru tau.
    const getDaysInMonth = (inYear, inMonth) => {
        return new Date(inYear, inMonth + 1, 0).getDate();
    };
    // console.log(getDaysInMonth(year, month));
    const numOfDays = getDaysInMonth(year, month);
    const newData = Array(numOfDays).fill(null).map((_, idx) => ({
        name: idx+1,
        income: 0,
        expanse: 0
    }));

    monthFiltered?.forEach(transac => {
        const date = new Date(transac.date);
        const dateIdx = date.getDate()-1;

        if(transac.type === 'income') {
            newData[dateIdx].income += transac.amount
        } else if(transac.type === 'expanse') {
            newData[dateIdx].expanse += transac.amount
        }
    });

    return newData;
};
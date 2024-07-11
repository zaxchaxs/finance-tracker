// Is this used??
export const dateToString = (date) => {
    const option = {
        year: 'numeric', month: '2-digit', day: '2-digit'
    }
    const newDate = date.toDate();
    return newDate.toLocaleDateString('id-ID', option);
}

export const dateFilterValue = () => {
    const option = {
        year: 'numeric', month: '2-digit', day: '2-digit'
    }
    const today = new Date();
    console.log(today);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    console.log(yesterday);
    
    const lastWeek = new Date(today)
    lastWeek.setDate(today.getDate()- 7);
    console.log(lastWeek);
    
    const lastMonth = new Date(today);
    lastMonth.setDate(today.getDate() - 30);
    console.log(lastMonth);

}
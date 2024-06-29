export const converTimeStampToDate = (seconds, nanoseconds) => {
    const miliseconds = seconds * 1000 + nanoseconds / 1e6;
    const date = newDate(miliseconds);
    const options = {

    }
    return date
};

export const testingDate = (date) => {
    const newData = new Date(date)
    const day = newData.getDate();
    const month = newData.getMonth();
    const year = newData.getFullYear();

    return `${day}/${month}/${year}`
}
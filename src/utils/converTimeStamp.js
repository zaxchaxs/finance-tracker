export const converTimeStampToDate = (seconds, nanoseconds) => {
    const miliseconds = seconds * 1000 + nanoseconds / 1e6;
    const date = newDate(miliseconds);
    const options = {

    }
    return date
};

export const testingDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${day}/${month}/${year}`
}
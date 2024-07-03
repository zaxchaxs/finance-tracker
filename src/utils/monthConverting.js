export const monthConvert = (index) => {
    const months = [
        { idx: 0, name: 'Jan' },
        { idx: 1, name: 'Feb' },
        { idx: 2, name: 'Mar' },
        { idx: 3, name: 'Apr' },
        { idx: 4, name: 'May' },
        { idx: 5, name: 'Jun' },
        { idx: 6, name: 'Jul' },
        { idx: 7, name: 'Aug' },
        { idx: 8, name: 'Sep' },
        { idx: 9, name: 'Oct' },
        { idx: 10, name: 'Nov' },
        { idx: 11, name: 'Dec' },
      ];

    const foundedMonth = months.find(el => el.idx === index);
    return foundedMonth?.name;
}
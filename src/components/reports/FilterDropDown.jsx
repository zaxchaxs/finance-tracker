// import { useEffect, useRef, useState } from 'react';

// const FilterDropdown = () => {
//   const [selectedYear, setSelectedYear] = useState('');
//   const [selectedMonth, setSelectedMonth] = useState('');
//   const [year, setYear] = useState();
//   const [selectedFilter, setSelectedFilter] = useState('');
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const dropDownRef = useRef(null);

//   const transactions = [
//     {
//         "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
//         "createdAt": {
//             "seconds": 1719886052,
//             "nanoseconds": 975000000
//         },
//         "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
//         "date": "2021-07-28",
//         "type": "expanse",
//         "name": "uang pribadi",
//         "amount": 25000,
//         "description": "makan sate sayur lontong madura cihuy"
//     },
//     {
//         "name": "dompet 1",
//         "type": "expanse",
//         "date": "2025-07-10",
//         "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
//         "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
//         "createdAt": {
//             "seconds": 1719886337,
//             "nanoseconds": 661000000
//         },
//         "description": "naspada",
//         "amount": 10000
//     },
//     {
//         "amount": 100000,
//         "description": "test mines",
//         "createdAt": {
//             "seconds": 1719723379,
//             "nanoseconds": 33000000
//         },
//         "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
//         "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
//         "name": "wallet 1",
//         "date": "2027-07-05",
//         "type": "expanse"
//     },
//     {
//         "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
//         "name": "dompet 1",
//         "createdAt": {
//             "seconds": 1719968322,
//             "nanoseconds": 123000000
//         },
//         "amount": 10000,
//         "description": "",
//         "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
//         "type": "income",
//         "date": "2024-07-03"
//     },
//     {
//         "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
//         "name": "dompet 1",
//         "description": "",
//         "amount": 1,
//         "date": "2024-07-03",
//         "type": "income",
//         "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
//         "createdAt": {
//             "seconds": 1719967822,
//             "nanoseconds": 945000000
//         }
//     },
//     {
//         "type": "income",
//         "createdAt": {
//             "seconds": 1719967950,
//             "nanoseconds": 779000000
//         },
//         "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
//         "description": "",
//         "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
//         "name": "dompet 1",
//         "date": "2024-07-03",
//         "amount": 1
//     },
//     {
//         "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
//         "type": "income",
//         "date": "2024-07-03",
//         "description": "",
//         "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
//         "createdAt": {
//             "seconds": 1719968033,
//             "nanoseconds": 503000000
//         },
//         "amount": 1,
//         "name": "dompet 1"
//     },
//     {
//         "description": "",
//         "amount": 1,
//         "type": "income",
//         "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
//         "name": "dompet 1",
//         "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
//         "date": "2024-07-03",
//         "createdAt": {
//             "seconds": 1719967880,
//             "nanoseconds": 645000000
//         }
//     },
//     {
//         "amount": 1,
//         "date": "2024-07-03",
//         "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
//         "description": "",
//         "name": "dompet 1",
//         "type": "income",
//         "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
//         "createdAt": {
//             "seconds": 1719967860,
//             "nanoseconds": 858000000
//         }
//     },
//     {
//         "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
//         "description": "",
//         "name": "wallet 1",
//         "amount": 1500000,
//         "createdAt": {
//             "seconds": 1719723473,
//             "nanoseconds": 640000000
//         },
//         "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
//         "date": "2024-07-02",
//         "type": "income"
//     },
//     {
//         "name": "uang pribadi",
//         "createdAt": {
//             "seconds": 1719885855,
//             "nanoseconds": 705000000
//         },
//         "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
//         "amount": 50000,
//         "date": "2024-07-01",
//         "type": "expanse",
//         "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
//         "description": "bensin"
//     },
//     {
//         "amount": 100000,
//         "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
//         "type": "expanse",
//         "name": "uang pribadi",
//         "description": "bayar hutang",
//         "createdAt": {
//             "seconds": 1719885910,
//             "nanoseconds": 722000000
//         },
//         "date": "2024-06-30",
//         "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668"
//     },
//     {
//         "description": "beli laptop",
//         "amount": 100000,
//         "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
//         "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
//         "date": "2024-06-25",
//         "type": "expanse",
//         "name": "wallet 1",
//         "createdAt": {
//             "seconds": 1719723286,
//             "nanoseconds": 9000000
//         }
//     },
//     {
//         "date": "2024-06-25",
//         "amount": 10000,
//         "name": "wallet 1",
//         "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
//         "type": "income",
//         "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
//         "createdAt": {
//             "seconds": 1719723419,
//             "nanoseconds": 590000000
//         },
//         "description": "income"
//     },
//     {
//         "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
//         "date": "2024-06-22",
//         "type": "income",
//         "amount": 1000000,
//         "description": "hadiah ultah lagi",
//         "createdAt": {
//             "seconds": 1719886008,
//             "nanoseconds": 772000000
//         },
//         "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
//         "name": "uang pribadi"
//     },
//     {
//         "description": "ultah",
//         "name": "uang pribadi",
//         "type": "income",
//         "amount": 100000,
//         "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
//         "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
//         "createdAt": {
//             "seconds": 1719885969,
//             "nanoseconds": 730000000
//         },
//         "date": "2024-06-21"
//     },
//     {
//         "createdAt": {
//             "seconds": 1719723252,
//             "nanoseconds": 817000000
//         },
//         "description": "input",
//         "date": "2024-05-28",
//         "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
//         "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
//         "amount": 50000,
//         "name": "wallet 1",
//         "type": "income"
//     },
//     {
//         "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
//         "description": "hutang",
//         "name": "wallet 1",
//         "date": "2024-05-26",
//         "type": "expanse",
//         "amount": 150,
//         "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
//         "createdAt": {
//             "seconds": 1719723334,
//             "nanoseconds": 494000000
//         }
//     }
// ]

// const handleClickOutside = (event) => {
//     if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
//     //   setIsYearOpen(false);
//     //   setIsMonthOpen(false);
//     setIsFilterOpen(false);
//     }
//   };

//     useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//     useEffect(() => {
//         const newDate = new Date();
//         const currYear = newDate.getFullYear()
//         setYear(currYear);
//     }, []);

//   const years = Array.from(new Set(transactions.map(item => new Date(item.date).getFullYear())));
//   const months = [
//     { value: '01', label: 'January' },
//     { value: '02', label: 'February' },
//     { value: '03', label: 'March' },
//     { value: '04', label: 'April' },
//     { value: '05', label: 'May' },
//     { value: '06', label: 'June' },
//     { value: '07', label: 'July' },
//     { value: '08', label: 'August' },
//     { value: '09', label: 'September' },
//     { value: '10', label: 'October' },
//     { value: '11', label: 'November' },
//     { value: '12', label: 'December' },
//   ];

//   const testMonth = [
//     { val: '0', name: 'Jan' },
//     { val: '1', name: 'Feb' },
//     { val: '2', name: 'Mar' },
//     { val: '3', name: 'Apr' },
//     { val: '4', name: 'May' },
//     { val: '5', name: 'Jun' },
//     { val: '6', name: 'Jul' },
//     { val: '7', name: 'Aug' },
//     { val: '8', name: 'Sep' },
//     { val: '9', name: 'Oct' },
//     { val: '10', name: 'Nov' },
//     { val: '11', name: 'Dec' },
//   ]

//   const filteredTransactions = transactions.filter(item => {
//     const date = new Date(item.date);
//     const year = date.getFullYear().toString();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     return (selectedYear ? year === selectedYear : true) &&
//            (selectedMonth ? month === selectedMonth : true);
//   });

//   return (
//       <div className='' ref={dropDownRef}>
//       <div className="flex space-x-4 justify-center items-center text-secondary   ">

//         <div
//           value={"Test"}
//           onChange={e => setSelectedYear(e.target.value)}
//           className="mt-1 flex flex-col py-2 text-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border-2 border-black justify-center items-center"
          
//         >
//             <div className='flex gap-4' >
//                 <button onClick={() => setYear(year-1)}>{`<`}</button>
//                 <div className='relative'>
//                     <button onClick={() => setIsFilterOpen(!isFilterOpen)}>{year}</button>
//                     <div className={`flex-col flex absolute ${isFilterOpen ? '' : 'hidden'} border-2 border-black w-fit gap-2`} >
//                         {years.map(year => (
//                             <button key={year} value={year}>{year + 'testing'}</button>
//                         )
//                         )}
//                     </div>
//                 </div>
//                 <button onClick={() => setYear(year+1)} >{`>`}</button>
//             </div>
//           {/* <option value="">{year}</option> */}
//           {/* <option value="">{"Month"}</option> */}

//         </div>
        
        
        
//         {/* <select
//           value={selectedMonth}
//           onChange={e => setSelectedMonth(e.target.value)}
//           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//         >
//           <option value="">Select Month</option>
//           {months.map(month => (
//             <option key={month.value} value={month.value}>{month.label}</option>
//           ))}
//         </select> */}
//       </div>

//       <div className="mt-4 text-secondary">
//         {filteredTransactions.map((transaction, index) => (
//           <div key={index} className="border p-2 mb-2 rounded">
//             <p>Description: {transaction.description}</p>
//             <p>Amount: {transaction.amount}</p>
//             <p>Date: {transaction.date}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FilterDropdown;


import { monthConvert } from '@/utils/monthConverting';
import { useState, useRef, useEffect } from 'react';

const FilterDropdown = () => {
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const dropdownRef = useRef(null);

  const transactions = [
    {
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "createdAt": {
            "seconds": 1719886052,
            "nanoseconds": 975000000
        },
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "date": "2021-07-28",
        "type": "expanse",
        "name": "uang pribadi",
        "amount": 25000,
        "description": "makan sate sayur lontong madura cihuy"
    },
    {
        "name": "dompet 1",
        "type": "expanse",
        "date": "2025-07-10",
        "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1719886337,
            "nanoseconds": 661000000
        },
        "description": "naspada",
        "amount": 10000
    },
    {
        "amount": 100000,
        "description": "test mines",
        "createdAt": {
            "seconds": 1719723379,
            "nanoseconds": 33000000
        },
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
        "name": "wallet 1",
        "date": "2027-07-05",
        "type": "expanse"
    },
    {
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "name": "dompet 1",
        "createdAt": {
            "seconds": 1719968322,
            "nanoseconds": 123000000
        },
        "amount": 10000,
        "description": "",
        "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
        "type": "income",
        "date": "2024-07-03"
    },
    {
        "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
        "name": "dompet 1",
        "description": "",
        "amount": 1,
        "date": "2024-07-03",
        "type": "income",
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1719967822,
            "nanoseconds": 945000000
        }
    },
    {
        "type": "income",
        "createdAt": {
            "seconds": 1719967950,
            "nanoseconds": 779000000
        },
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "description": "",
        "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
        "name": "dompet 1",
        "date": "2024-07-03",
        "amount": 1
    },
    {
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "type": "income",
        "date": "2024-07-03",
        "description": "",
        "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
        "createdAt": {
            "seconds": 1719968033,
            "nanoseconds": 503000000
        },
        "amount": 1,
        "name": "dompet 1"
    },
    {
        "description": "",
        "amount": 1,
        "type": "income",
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "name": "dompet 1",
        "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
        "date": "2024-07-03",
        "createdAt": {
            "seconds": 1719967880,
            "nanoseconds": 645000000
        }
    },
    {
        "amount": 1,
        "date": "2024-07-03",
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "description": "",
        "name": "dompet 1",
        "type": "income",
        "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
        "createdAt": {
            "seconds": 1719967860,
            "nanoseconds": 858000000
        }
    },
    {
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "description": "",
        "name": "wallet 1",
        "amount": 1500000,
        "createdAt": {
            "seconds": 1719723473,
            "nanoseconds": 640000000
        },
        "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
        "date": "2024-07-02",
        "type": "income"
    },
    {
        "name": "uang pribadi",
        "createdAt": {
            "seconds": 1719885855,
            "nanoseconds": 705000000
        },
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "amount": 50000,
        "date": "2024-07-01",
        "type": "expanse",
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "description": "bensin"
    },
    {
        "amount": 100000,
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "type": "expanse",
        "name": "uang pribadi",
        "description": "bayar hutang",
        "createdAt": {
            "seconds": 1719885910,
            "nanoseconds": 722000000
        },
        "date": "2024-06-30",
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668"
    },
    {
        "description": "beli laptop",
        "amount": 100000,
        "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "date": "2024-06-25",
        "type": "expanse",
        "name": "wallet 1",
        "createdAt": {
            "seconds": 1719723286,
            "nanoseconds": 9000000
        }
    },
    {
        "date": "2024-06-25",
        "amount": 10000,
        "name": "wallet 1",
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "type": "income",
        "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
        "createdAt": {
            "seconds": 1719723419,
            "nanoseconds": 590000000
        },
        "description": "income"
    },
    {
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "date": "2024-06-22",
        "type": "income",
        "amount": 1000000,
        "description": "hadiah ultah lagi",
        "createdAt": {
            "seconds": 1719886008,
            "nanoseconds": 772000000
        },
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "name": "uang pribadi"
    },
    {
        "description": "ultah",
        "name": "uang pribadi",
        "type": "income",
        "amount": 100000,
        "accountId": "e5107081-e068-41f4-85d5-a0a42e3f0668",
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1719885969,
            "nanoseconds": 730000000
        },
        "date": "2024-06-21"
    },
    {
        "createdAt": {
            "seconds": 1719723252,
            "nanoseconds": 817000000
        },
        "description": "input",
        "date": "2024-05-28",
        "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "amount": 50000,
        "name": "wallet 1",
        "type": "income"
    },
    {
        "accountId": "64b25906-38a6-4006-b21d-4631764b3d49",
        "description": "hutang",
        "name": "wallet 1",
        "date": "2024-05-26",
        "type": "expanse",
        "amount": 150,
        "userId": "3U40vTwzEcN43dAhrOSTE3BeLYd2",
        "createdAt": {
            "seconds": 1719723334,
            "nanoseconds": 494000000
        }
    }
]

  const years = Array.from(new Set(transactions.map(item => new Date(item.date).getFullYear())));
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const filteredTransactions = transactions.filter(item => {
    const date = new Date(item.date);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return (selectedYear ? year === selectedYear : true) &&
           (selectedMonth ? month === selectedMonth : true);
  });

  const toggleYearDropdown = () => {
    setIsYearOpen(!isYearOpen);
  };

  const toggleMonthDropdown = () => {
    setIsMonthOpen(!isMonthOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsYearOpen(isYearOpen);
      setIsMonthOpen(isMonthOpen);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [selectedFilter, setSelectedFilter] = useState('year');
  const convertedMonth = monthConvert(month);

  const handleSelectedFilter = (e) => {
    setSelectedFilter(e.target.value)
  }
  const handleRightBtnClick = () => {
    if(selectedFilter === 'year') {
        setYear(year+1)
    } else {
        if(month === 11) {
            setMonth(0);
            setYear(year+1);
            return;
        }
        setMonth(month+1)
    }
  }
  const handleLeftBtnClick = () => {
    if(selectedFilter === 'year') {
        setYear(year-1)
    } else {
        if(month === 0) {
            setMonth(11);
            setYear(year-1)
            return;
        };
        setMonth(month-1)
    }
  }

  useEffect(() => {

    const currDate = new Date();
    const currYear = currDate.getFullYear();
    const currMonth = currDate.getMonth();
    setYear(currYear);
    setMonth(currMonth);
  }, []);

  return (
    // <div className="relative text-secondary " >
    //   <div className="flex space-x-4 border-2 border-black" ref={dropdownRef}>
    //     <div className="relative" >
    //       <button
    //         onClick={toggleYearDropdown}
    //         className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    //       >
    //         {selectedYear || 'Select Year'}
    //       </button>
    //       {isYearOpen && (
    //         <div className="absolute border-2 border-black mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10" >
    //           <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
    //             {years.map(year => (
    //               <button
    //                 key={year}
    //                 onClick={() => { setSelectedYear(year); setIsYearOpen(false); }}
    //                 className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    //               >
    //                 {year}
    //               </button>
    //             ))}
    //           </div>
    //         </div>
    //       )}
    //     </div>

    //     <div className="relative" >
    //       <button
    //         onClick={toggleMonthDropdown}
    //         className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    //       >
    //         {selectedMonth || 'Select Month'}
    //       </button>
    //       {isMonthOpen && (
    //         <div className="absolute mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
    //           <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
    //             {months.map(month => (
    //               <button
    //                 key={month.value}
    //                 onClick={() => { setSelectedMonth(month.value); setIsMonthOpen(false); }}
    //                 className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
    //               >
    //                 {month.label}
    //               </button>
    //             ))}
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </div>

    //   <div className="mt-4">
    //     {filteredTransactions.map((transaction, index) => (
    //       <div key={index} className="border p-2 mb-2 rounded">
    //         <p>Description: {transaction.description}</p>
    //         <p>Amount: {transaction.amount}</p>
    //         <p>Date: {transaction.date}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className='w-full font-passionOne text-base flex justify-between items-center'>
        <div className='flex'>
            <button value={'year'} className={`${selectedFilter === 'year' ? 'bg-secondary hover:bg-secondary-hover' : 'hover:bg-green-300 text-secondary'} p-1 px-3 border-2 border-secondary rounded-md duration-200 ease-in-out transition-all`} onClick={handleSelectedFilter}>Year</button>
            <button value={'month'} className={`${selectedFilter === 'month' ? 'bg-secondary hover:bg-secondary-hover' : 'hover:bg-green-300 text-secondary'} p-1 px-3 border-2 border-secondary rounded-md duration-200 ease-in-out transition-all`} onClick={handleSelectedFilter}>Month</button>
        </div>
        <div className='flex text-secondary'>
            <button className={`p-1 px-3 border-2 border-secondary rounded-l-md hover:bg-green-300 transition-all ease-in-out duration-200`} onClick={handleLeftBtnClick}>{'<'}</button>
            <button onClick={() => console.log(month)} className={`p-1 px-3 border-y-2 border-secondary`}>{selectedFilter === 'year' ? year : `${convertedMonth}, ${year}`}</button>
            <button className={`p-1 px-3 border-2 border-secondary rounded-r-md hover:bg-green-300 transition-all ease-in-out duration-200`} onClick={handleRightBtnClick}>{'>'}</button>
        </div>

    </div>
  );
};

export default FilterDropdown;

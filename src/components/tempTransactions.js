const tempTransaction = [
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
    ];

    export default tempTransaction;
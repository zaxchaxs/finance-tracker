"use client";
import Unauthenticate from "@/components/Unauthenticate";
import NavbarPage from "@/components/navpage/NavPage";
import ReportStats from "@/components/reports/ReportStats";
import tempTransaction from "@/components/tempTransactions";
import { useAuth } from "@/contexts/AuthContext";

const ReportPage = () => {
    const {currUser} = useAuth();

    const exampleData = [
        {
          "name": "1",
          "income": 4000,
          "expanse": 2400
        },
        {
          "name": "2",
          "income": 3000,
          "expanse": 1398
        },
        {
          "name": "3",
          "income": 2000,
          "expanse": 5000
        },
        {
          "name": "4",
          "income": 2780,
          "expanse": 3908
        },
        {
          "name": "5",
          "income": 1890,
          "expanse": 4800
        },
        {
          "name": "6",
          "income": 2390,
          "expanse": 3800
        },
        {
          "name": "7",
          "income": 3490,
          "expanse": 4300
        },
        {
          "name": "D",
          "income": 2780,
          "expanse": 3908
        },
        {
          "name": "E",
          "income": 1890,
          "expanse": 4800
        },
        {
          "name": "F",
          "income": 2390,
          "expanse": 3800
        },
        {
          "name": "G",
          "income": 3490,
          "expanse": 4300
        },
        {
          "name": "D",
          "income": 2780,
          "expanse": 3908
        },
        {
          "name": "E",
          "income": 1890,
          "expanse": 4800
        },
        {
          "name": "F",
          "income": 2390,
          "expanse": 3800
        },
        {
          "name": "G",
          "income": 3490,
          "expanse": 4300
        },
        {
          "name": "F",
          "income": 2390,
          "expanse": 3800
        },
        {
          "name": "G",
          "income": 3490,
          "expanse": 4300
        },
        {
          "name": "F",
          "income": 2390,
          "expanse": 3800
        },
        {
          "name": "G",
          "income": 3490,
          "expanse": 4300
        },
        {
          "name": "F",
          "income": 2390,
          "expanse": 3800
        },
        {
          "name": "G",
          "income": 3490,
          "expanse": 4300
        },
        {
          "name": "F",
          "income": 2390,
          "expanse": 3800
        },
        {
          "name": "G",
          "income": 3490,
          "expanse": 4300
        },
        {
          "name": "F",
          "income": 2390,
          "expanse": 3800
        },
        {
          "name": "G",
          "income": 3490,
          "expanse": 4300
        },
        {
          "name": "F",
          "income": 2390,
          "expanse": 3800
        },
        {
          "name": "G",
          "income": 3490,
          "expanse": 4300
        },
        {
          "name": "F",
          "income": 2390,
          "expanse": 3800
        },
        {
          "name": "G",
          "income": 3490,
          "expanse": 4300
        },
        {
          "name": "F",
          "income": 2390,
          "expanse": 3800
        }
      ]

    return currUser ? (
      <main className="min-h-screen text-xl p-6 font-passionOne bg-primary w-full py-4 flex flex-col gap-5">
        {/* nav */}
        <NavbarPage title={"Reports"} />

        <ReportStats datas={tempTransaction} />

      </main>
    ) : (
      <Unauthenticate />
    );
};

export default ReportPage;
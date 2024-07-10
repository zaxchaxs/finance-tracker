'use client'
import NavbarPage from "@/components/navbars/NavbarPage";
import FilterSection from "@/components/transactions/FilterSection";

const TransactionPage = () => {
    return(
        <main className="min-h-screen text-xl p-6 font-passionOne bg-primary w-full py-4 flex flex-col gap-5">
            {/* Nav */}
            <NavbarPage title={"Transaction"} />

            <FilterSection />

        </main>
    )
};

export default TransactionPage;
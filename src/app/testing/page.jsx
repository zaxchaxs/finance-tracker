"use client";

import NavbarPage from "@/components/Navbars/NavbarPage";

const TestingPage = () => {

  const testArr = Array(50).fill("Testing");

  return (
    <main className="min-h-screen text-lg font-passionOne bg-primary w-full py-4 flex flex-col gap-3 relative -z-10">
      <NavbarPage title={"Testing page"} />

      {
        testArr.map((arr, idx) => <p className="text-secondary" key={idx}>arr{}</p>)
      }
    </main>

  );
};

export default TestingPage;

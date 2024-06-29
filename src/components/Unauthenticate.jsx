import { useRouter } from "next/navigation";

const Unauthenticate = () => {
    const router = useRouter();
    return(
        <main className="min-h-screen text-xl p-6 font-passionOne bg-primary w-full py-4 flex flex-col justify-center items-center">
            <div className="text-center text-primary py-4">
                <p>It seems you are not logged in yet, please log in first</p>
            </div>
            <div className="bg-secondary hover:bg-secondary-hover p-1 px-4 w-fit rounded-lg cursor-pointer" onClick={() => router.push("/")}>
                <button>Ok</button>
            </div>
        </main>
    )
};

export default Unauthenticate;
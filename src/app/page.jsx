"use client";
import { useRouter } from "next/navigation";
import { logout } from "@/libs/auth";
import Image from "next/image";
import homeIcon from "../../public/homeIcon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "@/contexts/AuthContext";
import LoaderPage from "@/components/loaders/loaderPage";

export default function Home() {
  const { currUser, loading, isUserLogged } = useAuth();
  const router = useRouter();

  return loading ? (
    <LoaderPage />
  ) : (
    <main className="min-h-screen p-5 text-secondary bg-primary w-full flex flex-col items-center justify-between py-10 pb-14">
      <h1 className="text-3xl p-4 text-primary text-center w-full font-lilitaOne">
        Zaxch Finance Tracker
      </h1>
      <div>
        <Image
          src={homeIcon}
          width={700}
          height={700}
          alt="test"
          className="w-[25vh] p-4"
        />
      </div>
      <div className="text-center text-lg font-semibold p-4">
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
          nisi, exercitationem
        </h1>
      </div>
      <div
        onClick={() => router.push("/login")}
        className={`gap-4 flex p-4 ${currUser ? "hidden" : ""}`}
      >
        <button className="p-2 px-4 rounded-xl font-lilitaOne bg-secondary hover:bg-secondary-hover text-lightGreen">
          Login
        </button>
        <button className="p-2 px-4 flex items-center gap-2 rounded-xl font-lilitaOne hover:bg-secondary-hover bg-secondary text-lightGreen">
          <FontAwesomeIcon icon={faGoogle} className="w-4" /> Login With Google
        </button>
      </div>
      <div
        onClick={logout}
        className={`gap-4 flex p-4 ${currUser ? "" : "hidden"}`}
      >
        <button className="p-2 px-4 rounded-xl font-lilitaOne bg-danger hover:bg-danger-hover text-lightGreen">
          Logout
        </button>
      </div>
    </main>
  );
}

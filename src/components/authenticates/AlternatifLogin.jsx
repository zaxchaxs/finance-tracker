import { loginWithGithub, loginWithGoogle } from "@/libs/auth";
import { failedSweetAlert } from "@/libs/sweetAlert";
import { useRouter } from "next/navigation";

const AlternatifLogin = ({setIsloading}) => {
  const router = useRouter();

  const handleClickLogin =  async (e) => {
    setIsloading(true);
    try {
      if(e.target.value === 'google') {
        await loginWithGoogle();
      } else {
        await loginWithGithub();
      }
      router.push('/dashboard')
    } catch (error) {
      failedSweetAlert(error.message);
    } finally {
      setIsloading(false);
    }
  }
    return(
        <>
        <p className="text-primary text-base py-3">Or login with</p>
        <div className="flex text-slate-100 gap-10 text-base">
          <button value={'google'} onClick={handleClickLogin} className="p-2 px-7 rounded-full bg-danger hover:bg-danger-hover shadow-md">
            Google
          </button>
          <button value={'github'} onClick={handleClickLogin} className="p-2 px-7 rounded-full bg-gray-700 hover:bg-gray-800 shadow-md">
            Github
          </button>
        </div>
        </>
    )
}

export default AlternatifLogin;
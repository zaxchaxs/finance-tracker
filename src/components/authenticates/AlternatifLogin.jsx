import { loginWithGithub, loginWithGoogle } from "@/libs/auth";
import { failedSweetAlert } from "@/libs/sweetAlert";
import { useRouter } from "next/navigation";
import PrimaryButton from "../ui/buttons/PrimaryButton";

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
          <PrimaryButton handleClick={handleClickLogin} text={"Google"} value={"google"} type={"danger"} />
          <PrimaryButton handleClick={handleClickLogin} text={"Github"} value={"github"} type={"dark"} />
        </div>
        </>
    )
}

export default AlternatifLogin;
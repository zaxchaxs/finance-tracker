'use client'
import { loginWithEmailAndPassword } from "@/libs/auth";
import { failedSweetAlert } from "@/libs/sweetAlert";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoaderSection from "../loaders/loaderSection";

const { faEye, faEyeSlash } = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
const { default: AlternatifLogin } = require("./AlternatifLogin");

const FormAuthenticate = ({typePage}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [typeInput, setTypeInput] = useState("password");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const isPasswordMatch = password === confirmPassword;
    const type = typePage === 'login';
    
    const handleShowPassword = () => {
        if (typeInput === "password") {
          setTypeInput("text");
        } else {
          setTypeInput("password");
        }
      };

    
    const handleSubmitLogin = async (e) => {
      e.preventDefault();
      console.log("test");
      setLoading(true);

      // login in firestore

      try {
        const user = await loginWithEmailAndPassword(email, password);
        if(user) router.push('/dashboard');
        // const currUser = await loginWithEmailAndPassword(email, password);
        // if (currUser) {
        //   const userCredential = await getDocUserById(currUser.uid)
        //   if(userCredential) router.push('/dashboard');
        // };
      } catch (error) {
        failedSweetAlert(error.message);
      } finally {
        setEmail('');
        setPassword('');
        setLoading(false);
      }
    }

    return(
        <div className="bg-primary h-screen w-full rounded-t-5xl p-4 shadow-lg flex flex-col justify-center items-center">

          { loading && <LoaderSection width={'w-14'} />}

        <form
          className="w-full text-base flex flex-col text-secondary justify-center items-center gap-2 py-4"
          onSubmit={handleSubmitLogin}
        >
          <input
            className={`w-full rounded-lg p-2 px-4 outline-none ${type && 'hidden'} z-0`}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Name"
          />
          <input
            className={`w-full rounded-lg p-2 px-4 outline-none z-0`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <div className="w-full relative items-center">
            <input
              className={`w-full rounded-lg p-2 px-4 outline-none z-0`}
              type={typeInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button
              className="absolute right-2 top-2"
              type="button"
              onClick={handleShowPassword}
            >
              <FontAwesomeIcon color="#9F9F9F" icon={typeInput === 'password'? faEye : faEyeSlash} />
            </button>
          </div>
          <div className={`${type && 'hidden'} w-full z-0`}>
            <input
                className={`w-full rounded-lg p-2 px-4 outline-none ${type && 'hidden'} `}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required={type ? false : true}
            />
            <p className="text-danger">{isPasswordMatch ? '' : `Password didn't match`}</p>
          </div>
            <button
              className="p-2 text-slate-100 px-7 rounded-full bg-secondary hover:bg-secondary-hover active:bg-secondary shadow-md"
              type="submit"
            >
              {type ? 'Login' : 'Sign Up'}
            </button>
        </form>

        <AlternatifLogin />
        
        {
            type && (
                <div className="text-primary text-base flex gap-2 py-6 items-center">

                <p className="">Need an account?</p>
                <button className="text-blue-500" onClick={() => router.push('/register')}>
                  Signup
                </button>
      
            </div>
            )
        }
      <button onClick={() => router.push('/login')}>Login</button>
      </div>
    )
}

export default FormAuthenticate;
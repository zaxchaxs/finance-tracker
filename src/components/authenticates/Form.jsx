"use client";
import { loginWithEmailAndPassword, registerWithEmailAndPassword } from "@/libs/auth";
import { failedSweetAlert } from "@/libs/sweetAlert";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoaderSection from "../loaders/loaderSection";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlternatifLogin from "./AlternatifLogin";


const FormAuthenticate = ({ typePage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [typeInput, setTypeInput] = useState("password");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isPassDidntMatch = password !== confirmPassword && confirmPassword; 
  const type = typePage === "login";

  const handleShowPassword = () => {
    if (typeInput === "password") {
      setTypeInput("text");
    } else {
      setTypeInput("password");
    }
  };

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    setLoading(true);    
    try {
      await registerWithEmailAndPassword(email, password, name);
    } catch (error) {
      failedSweetAlert(error.message)
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    console.log("test");
    setLoading(true);
    try {
      await loginWithEmailAndPassword(email, password);
    } catch (error) {
      failedSweetAlert(error.message);
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary h-screen w-full rounded-t-5xl p-4 shadow-lg flex flex-col justify-center items-center">
      {loading && <LoaderSection width={"w-14"} />}

      <form
        className="w-full text-base flex flex-col text-secondary justify-center items-center gap-2 py-4"
        onSubmit={type ? handleSubmitLogin : handleSubmitSignup}
      >
        <input
          className={`w-full rounded-lg p-2 px-4 outline-none ${
            type && "hidden"
          } z-0`}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required={type ? false : true}
        />
        <input
          className={`w-full rounded-lg p-2 px-4 outline-none z-0`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required={true}
        />
        <div className="w-full relative items-center">
          <input
            className={`w-full rounded-lg p-2 px-4 outline-none z-0`}
            type={typeInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required={true}
          />
          {/* <button
            className="absolute right-2 top-2"
            type="button"
            onClick={handleShowPassword}
          > */}
            <FontAwesomeIcon
            className="absolute right-2 top-3 cursor-pointer w-4"
            onClick={handleShowPassword}
              color="#9F9F9F"
              icon={typeInput === "password" ? faEye : faEyeSlash}
            />
          {/* </button> */}
        </div>
        <div className={`${type && "hidden"} w-full z-0 flex flex-col items-center justify-center`}>
          <input
            className={`w-full rounded-lg p-2 px-4 outline-none ${
              type && "hidden"
            } `}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required={type ? false : true}
          />
          <p className="text-danger">
            {isPassDidntMatch ? "Password didn't match" : ''}
          </p>
        </div>
        <button
          className="p-2 text-slate-100 px-7 rounded-full bg-secondary hover:bg-secondary-hover active:bg-secondary shadow-md"
          type="submit"
          disabled={isPassDidntMatch}
        >
          {type ? "Login" : "Sign Up"}
        </button>
      </form>

      <AlternatifLogin setIsloading={setLoading} />

      {type && (
        <div className="text-primary text-base flex gap-2 py-6 items-center">
          <p className="">Need an account?</p>
          <button
            className="text-blue-500"
            onClick={() => router.push("/register")}
          >
            Signup
          </button>
        </div>
      )}
    </div>
  );
};

export default FormAuthenticate;

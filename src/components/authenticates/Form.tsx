"use client";
import { loginWithEmailAndPassword, registerWithEmailAndPassword } from "@/libs/auth";
import { failedSweetAlert } from "@/libs/sweetAlert";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoaderSection from "../loaders/loaderSection";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlternatifLogin from "./AlternatifLogin";
import PrimaryButton from "../ui/buttons/PrimaryButton";

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
    setLoading(true);
    try {
      await loginWithEmailAndPassword(email, password);
      window.location.href = '/dashboard';
    } catch (error) {
      failedSweetAlert(error.message);
    } finally {
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary h-screen w-full rounded-t-5xl p-4 shadow-lg flex flex-col justify-center items-center ring-1 ring-secondary">
      {loading && <LoaderSection width={"w-14"} />}

      <form
        className="w-full text-base flex flex-col text-secondary justify-center items-center gap-2 py-4"
        onSubmit={type ? handleSubmitLogin : handleSubmitSignup}
      >
        <input
          className={`w-full rounded-full p-2 px-4 outline-none z-0 ring-1 ring-black shadow-lg ${
            type && "hidden"
          } z-0`}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required={type ? false : true}
        />
          <input
            className={`w-full rounded-full p-2 px-4 outline-none z-0 ring-1 ring-black shadow-lg`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required={true}
          />
        <div className="w-full relative items-center">
          <input
            className={`w-full rounded-full p-2 px-4 outline-none z-0 ring-1 ring-black shadow-lg`}
            type={typeInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required={true}
          />
          <FontAwesomeIcon
            className="absolute right-2 top-3 cursor-pointer w-4"
            onClick={handleShowPassword}
            color="#9F9F9F"
            icon={typeInput === "password" ? faEye : faEyeSlash}
          />
        </div>
        <div
          className={`${
            type && "hidden"
          } w-full z-0 flex flex-col items-center justify-center`}
        >
          <input
            className={`w-full rounded-full p-2 px-4 outline-none z-0 ring-1 ring-black shadow-lg ${
              type && "hidden"
            } `}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required={type ? false : true}
          />
          <p className="text-danger">
            {isPassDidntMatch ? "Password didn't match" : ""}
          </p>
        </div>
        <div className="py-2">
          <PrimaryButton type={"primary"} text={type ? "Login" : "Sign Up"} value={type ? "Login" : "Sign Up"} />

        </div>
      </form>

      <AlternatifLogin setIsloading={setLoading} />

      {type && (
        <div className="text-primary text-base flex gap-2 py-4 items-center">
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

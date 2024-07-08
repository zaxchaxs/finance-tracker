"use client";
import { useState } from "react";
import { registerWithEmailAndPassword } from "../../libs/auth";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AuthenticatePage = ({typePage}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [typeInput, setTypeInput] = useState("password");
  const router = useRouter();

  const type = typePage === 'login';
  const isPasswordMatch = password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  const handleShowPassword = () => {
    if (typeInput === "password") {
      setTypeInput("text");
    } else {
      setTypeInput("password");
    }
  };

  return (
    <main className="max-h-screen text-secondary text-lg font-passionOne  w-full pt-6 flex flex-col bg-slate-50">
      <div className=" p-6">
        <h1 className="text-3xl">{type ? 'Login' : 'Sign Up'}</h1>
        <h2 className="text-xl">{type ? 'Welcome Back' : 'Welcome'}</h2>
      </div>

      <div className="bg-primary h-screen w-full rounded-t-5xl p-4 shadow-lg flex flex-col justify-center items-center">
        <form
          className="w-full text-base flex flex-col justify-center items-center gap-2"
          onSubmit={(e) => handleLoginSubmit(e)}
        >
          <input
            className=" w-full rounded-lg p-2 px-4 outline-none"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            className=" w-full rounded-lg p-2 px-4 outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <div className="w-full relative items-center">
            <input
              className=" w-full rounded-lg p-2 px-4 outline-none"
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
          <input
            className=" w-full rounded-lg p-2 px-4 outline-none"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
          />
          <p className="text-danger">{isPasswordMatch ? '' : `Password didn't match`}</p>
            <button
              className="p-2 text-slate-100 px-7 rounded-full bg-secondary hover:bg-secondary-hover active:bg-secondary shadow-md"
              type="submit"
            >
              Sign Up
            </button>
        </form>

        <p className="text-primary text-base py-3">Or login with</p>
        <div className="flex text-slate-100 gap-10 text-base">
          <button className="p-2 px-7 rounded-full bg-danger hover:bg-danger-hover shadow-md">
            Google
          </button>
          <button className="p-2 px-7 rounded-full bg-gray-700 hover:bg-gray-800 shadow-md">
            Github
          </button>
        </div>
      <button onClick={() => router.push('/login')}>Login</button>
      </div>
    </main>
  );
};

export default AuthenticatePage;

"use client";
import FormAuthenticate from "./Form";

const Register = () => {

  return (
    <main className="max-h-screen text-secondary text-lg font-passionOne  w-full pt-6 flex flex-col bg-slate-50">
      <div className=" p-6">
        <h1 className="text-3xl">Sign Up</h1>
        <h2 className="text-xl">Welcome</h2>
      </div>

      <FormAuthenticate typePage={'register'} />
    </main>
  );
};

export default Register;

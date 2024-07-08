"use client";
import FormAuthenticate from "./Form";

const Login = () => {

  return (
    <main className="max-h-screen text-lg font-passionOne  w-full pt-6 flex flex-col bg-slate-50">
      <div className="text-secondary p-6">
        <h1 className="text-3xl">Login</h1>
        <h2 className="text-xl">Welcome Back</h2>
      </div>

      <FormAuthenticate typePage={'login'} />

    </main>
  );
};

export default Login;

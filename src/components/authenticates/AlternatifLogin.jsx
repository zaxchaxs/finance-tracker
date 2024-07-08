const AlternatifLogin = () => {
    return(
        <>
        <p className="text-primary text-base py-3">Or login with</p>
        <div className="flex text-slate-100 gap-10 text-base">
          <button className="p-2 px-7 rounded-full bg-danger hover:bg-danger-hover shadow-md">
            Google
          </button>
          <button className="p-2 px-7 rounded-full bg-gray-700 hover:bg-gray-800 shadow-md">
            Github
          </button>
        </div>
        </>
    )
}

export default AlternatifLogin;
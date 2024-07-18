const InputForm = ({type, value, handleChange, name, isRequired}) => {
    return(
        <input className="w-full rounded-lg p-2 px-4 outline-none ring-1 ring-black shadow-lg placeholder:text-base" type={type} value={value} onChange={handleChange} placeholder={name} required={isRequired} />
    )
};

export default InputForm;
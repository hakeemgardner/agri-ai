import React, { useState } from "react";
import { LogInUser } from "../../database/auth/LogInUser";
import { useNavigate } from "react-router";

export const LoginPage = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  function handleOnChange(event){
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      }
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const auth = await LogInUser({ email: formData.email, password: formData.password });
    if (auth) {
      navigate('/market-place')
    }
  }

  return <div>
    <form className=" w-[100%] h-[600px] text-center justify-center flex flex-wrap p-20 " onSubmit={onSubmit}>
      <div className="bg-white shadow-2xl w-[400px] h-[500px] rounded-2xl justify-center p-10">
        <h1 className="text-3xl font-bold">AgriAI</h1>
        <h2 className="underline">Empowering jamaican Farmers</h2>
      <input className="w-[100%] bg-gray-200 p-3 rounded-2xl mt-10" placeholder="Enter username or email" type="text" name="email" id="email" onChange={handleOnChange}/>
      <input className="w-[100%] bg-gray-200 p-3 rounded-2xl mt-5" placeholder="Enter password" type="password" name="password" id="password" onChange={handleOnChange} />
      <button className="bg-green-500 w-[100%] mt-10 p-3 rounded-2xl font-bold text-[20px] cursor-pointer hover:bg-green-800" type="submit">Login</button>
      <button className="bg-green-500 w-[100%] mt-5 p-3 rounded-2xl font-bold text-[20px] cursor-pointer hover:bg-green-800">Signup</button>
      <p className="mt-5">Made and publish by the Dream Team!</p>
      </div>
    </form>
  </div>;
};

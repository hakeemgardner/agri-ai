import React, { useState } from "react";
import { SignUpUser } from "../../database/auth/SignUpUser";
import { createFarmer } from "../../database/farmer_service/create_farmer";

export const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    authpassword: '',
    name: '',
    telephone: '',
    parish: ''
  });
  
    function handleOnChange(event){
      setFormData((prevData) => {
        return {
          ...prevData,
          [event.target.name]: event.target.value,
        }
      })
  }
  
  console.log(formData)
  
    async function onSubmit(e) {
      e.preventDefault();
      if (formData.authpassword != formData.password) {
        alert("Passwords aren't the same");
        return;
      }
      const data = await SignUpUser({ email: formData.email, password: formData.password });
      if (data) {
        await createFarmer({ name: formData.name, email: formData.email, parish: formData.parish, telephone: formData.telephone });
      }
  }
  
    return <div>
      <form className=" w-[100%] h-[600px] text-center justify-center flex flex-wrap p-20" onSubmit={onSubmit}>
        <div className="bg-white shadow-2xl w-[400px] h-[660px] rounded-2xl justify-center p-10 ">
          <h1 className="text-3xl font-bold">AgriAI</h1>
        <h2 className="underline">Empowering jamaican Farmers</h2>
          <div className="flex gap-4">
        <input className="w-30 bg-gray-200 p-3 rounded-2xl mt-5" placeholder="Enter Name" type="text" name="name" id="name" onChange={handleOnChange} />
         <input className="w-50 bg-gray-200 p-3 rounded-2xl mt-5" placeholder="Enter Telephone Number" type="tel" name="telephone" id="telephone" onChange={handleOnChange} />
        </div>
        <input  className="w-[100%] bg-gray-200 p-3 rounded-2xl mt-5"placeholder="Enter parish" type="text" name="parish" id="parish" onChange={handleOnChange} />
        <input className="w-[100%] bg-gray-200 p-3 rounded-2xl mt-5" placeholder="Enter your Email @gmail.com" type="text" name="email" id="email" onChange={handleOnChange}/>
        <input className="w-[100%] bg-gray-200 p-3 rounded-2xl mt-5" placeholder="Enter create password" type="password" name="password" id="password" onChange={handleOnChange} />
        <input className="w-[100%] bg-gray-200 p-3 rounded-2xl mt-5" placeholder="Retype password" type="password" name="authpassword" id="authpassword" onChange={handleOnChange} />
        <button className="bg-green-500 w-[100%] mt-10 p-3 rounded-2xl font-bold text-[20px] cursor-pointer hover:bg-green-800" type="submit">Signup</button>
        <button className="bg-green-500 w-[100%] mt-5 p-3 rounded-2xl font-bold text-[20px] cursor-pointer hover:bg-green-800">Signin</button>
        <p className="mt-5">Made and publish by the Dream Team!</p>
        </div>
        
      </form>
    </div>;
};

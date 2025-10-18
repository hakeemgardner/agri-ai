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
      <form onSubmit={onSubmit}>
        <input type="text" name="name" id="name" onChange={handleOnChange} />
        <input type="tel" name="telephone" id="telephone" onChange={handleOnChange} />
        <input type="text" name="parish" id="parish" onChange={handleOnChange} />
        <input type="text" name="email" id="email" onChange={handleOnChange}/>
        <input type="password" name="password" id="password" onChange={handleOnChange} />
        <input type="password" name="authpassword" id="authpassword" onChange={handleOnChange} />
        <button type="submit">Submit</button>
      </form>
    </div>;
};

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
    <form onSubmit={onSubmit}>
      <input type="text" name="email" id="email" onChange={handleOnChange}/>
      <input type="password" name="password" id="password" onChange={handleOnChange} />
      <button type="submit">Submit</button>
    </form>
  </div>;
};

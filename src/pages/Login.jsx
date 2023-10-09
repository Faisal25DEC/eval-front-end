import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const baseUrl = "https://long-jade-cape-buffalo-shoe.cyclic.app";
const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`${baseUrl}/users/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      setLoggedIn(true);
      localStorage.setItem("token", JSON.stringify(data.data.token));
    } catch (err) {
      console.log(err);
    }
  };
  if (loggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          onChange={handleFormFieldChange}
          type="text"
          name="email"
          id=""
          placeholder="email"
        />
        <input
          onChange={handleFormFieldChange}
          type="text"
          name="password"
          id=""
          placeholder="password"
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default Login;

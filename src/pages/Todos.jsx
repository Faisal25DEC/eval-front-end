import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const token = JSON.parse(localStorage.getItem("token"));
const baseUrl = "https://long-jade-cape-buffalo-shoe.cyclic.app";

const Todos = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
  });
  const [status, setStatus] = useState();
  const [tag, setTag] = useState();

  const [todos, setTodos] = useState([]);
  const getTodos = async (url) => {
    console.log(token);
    const todos = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(todos);
    if (todos.data.loggedIn == false) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
      setTodos(todos.data.todos);
    }
  };

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
      const data = await axios.post(`${baseUrl}/todos/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getTodos();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    let url = `${baseUrl}/todos?`;
    if (tag) {
      url = `${url}tag=${tag}`;
    }
    if (status) {
      url = `${url}&status=${status}`;
    }
    console.log(url);
    getTodos(url);
  }, [status, tag]);
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <h1>Todos</h1>
      <form onSubmit={handleSubmit} action="">
        <input
          onChange={handleFormFieldChange}
          type="text"
          placeholder="add todo"
          name="title"
          required
        />
        <select onChange={handleFormFieldChange} name="tag" id="" required>
          <option value="Personal">Personal</option>
          <option value="Official">Official</option>
          <option value="Family">Family</option>
        </select>
        <button type="submit">Add Todo</button>
      </form>
      <select
        onChange={(e) => {
          setTag(e.target.value);
        }}
        name="filter"
        id=""
      >
        <option value="">All</option>
        <option value="Personal">Personal</option>
        <option value="Official">Official</option>
        <option value="Family">Family</option>
      </select>
      <select
        onChange={(e) => {
          setStatus(e.target.value);
        }}
        name="filter"
        id=""
      >
        <option value="">All</option>
        <option value="done">done</option>
        <option value="pending">pending</option>
      </select>

      {todos?.map((todo) => {
        const { title, status, tag, _id } = todo;
        return (
          <div>
            <h2>{title}</h2>
            <h4>{status ? "completed" : "pending"}</h4>
            <p>{tag}</p>

            <Link to={`/todo/${_id}`}>View</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Todos;

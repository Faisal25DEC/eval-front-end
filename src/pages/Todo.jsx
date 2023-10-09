import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useParams } from "react-router-dom";
const token = JSON.parse(localStorage.getItem("token"));
const Todo = () => {
  const [isDeleted, setDeleted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
  });
  const { todoId } = useParams();
  const [todo, setTodo] = useState({});
  const getTodo = async () => {
    console.log(token);
    const todo = await axios.get(`http://localhost:8080/todos/${todoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(todo);
    if (todo.data.loggedIn == false) {
    } else {
      setTodo(todo.data.todo);
      setFormData({
        ...formData,
        tag: todo.data.todo.tag,
      });
    }
  };

  const handleFormFieldChange = (e) => {
    let { name, value } = e.target;
    if (name == "status") {
      value = value == "Pending" ? false : true;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put(
        `http://localhost:8080/todos/update/${todoId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getTodo();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async () => {
    try {
      const todo = await axios.delete(
        `http://localhost:8080/todos/delete/${todoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDeleted(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  if (isDeleted) {
    return <Navigate to="/" />;
  }
  console.log(formData);
  return (
    <div>
      <Link to="/">Go back to home</Link>

      <form onSubmit={handleSubmit} action="">
        <input
          onChange={handleFormFieldChange}
          type="text"
          placeholder="Change Title"
          name="title"
          required
        />
        <select onChange={handleFormFieldChange} name="tag" id="" required>
          <option value="Personal">Personal</option>
          <option value="Official">Official</option>
          <option value="Family">Family</option>
        </select>

        <select onChange={handleFormFieldChange} name="status" id="" required>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Update Todo</button>
      </form>
      <h2>{todo?.title}</h2>
      <h4>{todo?.status ? "completed" : "pending"}</h4>
      <p>{todo?.tag}</p>

      <button onClick={deleteTodo}>delete</button>
    </div>
  );
};

export default Todo;

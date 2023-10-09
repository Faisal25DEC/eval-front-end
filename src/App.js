import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Todos from "./pages/Todos";
import Todo from "./pages/Todo";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/todo/:todoId" element={<Todo />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

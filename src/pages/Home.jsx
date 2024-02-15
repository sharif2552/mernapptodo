import React, { useState, useEffect } from "react";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await fetch("https://merntodolist.vercel.app/todos");
      const fetchedTodos = await response.json();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`https://merntodolist.vercel.app/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://merntodolist.vercel.app/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newTodoText }),
      });
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setNewTodoText("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-blue-600 font-extrabold text-8xl mb-3 ">Todo List</h1>
      <form onSubmit={handleSubmit} className="w-2/4 m-8 flex">
        <input
          type="text"
          className="w-3/4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Enter new todo"
        />
        <button
          type="submit"
          className=" flex flex-col text-center items-center w-1/4 justify-center text-3xl ml-2"
        >
          Add Todo
        </button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo._id} className=" text-2xl">
            {index + 1}. {todo.text}{" "}
            <button onClick={() => deleteTodo(todo._id)}>
              <span className="text-blue-500">
                <i className="fas fa-trash"></i>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

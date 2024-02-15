import React, { useState, useEffect } from "react";

const Home = () => {
  // State to store todos
  const [todos, setTodos] = useState([]);
  // State to store new todo text
  const [newTodoText, setNewTodoText] = useState("");

  // Function to fetch all todos
  const fetchTodos = async () => {
    try {
      const response = await fetch(
        "https://adorable-trench-coat-eel.cyclic.app/todos"
      );
      const fetchedTodos = await response.json();
      setTodos(fetchedTodos); // Update state with fetched todos
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Function to delete a todo by its ID
  const deleteTodo = async (id) => {
    try {
      await fetch(`https://adorable-trench-coat-eel.cyclic.app/todos/${id}`, {
        method: "DELETE",
      });
      // Filter out the deleted todo from state
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Function to handle form submission for adding a new todo
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch(
        "https://adorable-trench-coat-eel.cyclic.app/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newTodoText }),
        }
      );
      const newTodo = await response.json();
      setTodos([...todos, newTodo]); // Add the new todo to state
      setNewTodoText(""); // Clear the input field after submission
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos(); // Fetch todos when the component mounts
  }, []); // Empty dependency array to ensure it only runs once

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-blue-600 font-extrabold text-center text-7xl md:text-8xl mb-3 ">Todo List</h1>
      {/* Form to add a new todo */}
      <form onSubmit={handleSubmit} className="w-4/4 my-8 mx-1 md:w-2/4 md:m-8 flex">
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

      {/* Render todos */}
      <ul>
        {todos.map((todo, index) => (
          <li key={todo._id} className=" text-2xl">
            {index + 1}. {todo.text}{" "}
            {/* Display the index number followed by a dot */}
            <button onClick={() => deleteTodo(todo._id)}>
              <span className="text-blue-500">
                <i className="fas fa-trash"></i> {/* Font Awesome trash icon */}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

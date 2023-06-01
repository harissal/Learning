import React, { useEffect, useState } from "react";

function Test() {
  const [todos, setTodos] = useState([5, 2]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/todos");
      if (response.ok) {
        const jsonData = await response.json();
        console.log({ jsonData });
        setTodos(jsonData.todos);
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="todo-container">
      {todos.map((todo) => {
        return <div>{todo}</div>;
      })}
    </div>
  );
}

export default Test;

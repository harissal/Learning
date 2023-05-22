import React, { useEffect, useState } from "react";
import { Button, Modal, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash, IconEdit, IconExposurePlus1 } from "@tabler/icons-react";
import { BackgroundImage, Center, Box } from "@mantine/core";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteIndex, setDeleteIndex] = useState(0);

  const addTodo = async () => {
    if (currentTodo.trim() !== "") {
      try {
        const response = await fetch("http://localhost:3000/api/create-todo", {
          method: "POST",
          body: JSON.stringify({ title: currentTodo }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const newTodo = await response.json();
          setTodos([...todos, newTodo]);
          setCurrentTodo("");
        } else {
          const error = await response.json();
          console.error("Error:", error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const deleteTodo = async (index) => {
    const todoId = todos[index]._id;

    try {
      const response = await fetch(
        `http://localhost:3000/api/delete-todo/${todoId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const { success } = await response.json();
        if (success) {
          const updatedTodos = todos.filter((_, i) => i !== index);
          setTodos(updatedTodos);
        }
      } else {
        const error = await response.json();
        console.error("Error:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const editTodo = async (index, newTodo) => {
    const todoId = todos[index]._id;

    try {
      const response = await fetch(`http://localhost:3000/api/update-todo/`, {
        method: "PUT",
        body: JSON.stringify({ title: newTodo }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const { success } = await response.json();
        if (success) {
          const updatedTodos = [...todos];
          updatedTodos[index] = newTodo;
          setTodos(updatedTodos);
        }
      } else {
        const error = await response.json();
        console.error("Error:", error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="todo-container">
      <Button
        compact
        variant="gradient"
        gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
        style={{ marginBottom: "20px" }}
        onClick={() => {
          open();
        }}
      >
        Open
      </Button>
      <Box maxWidth={500} mx="auto">
        <BackgroundImage
          src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
          radius="xs"
        >
          <Center p="md">
            <h2>Todo App</h2>
            <div>
              <input
                type="text"
                style={{ marginLeft: "20px" }}
                value={currentTodo}
                onChange={(e) => setCurrentTodo(e.target.value)}
              />
              <Button
                compact
                variant="gradient"
                gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
                style={{ marginLeft: "20px" }}
                rightIcon={<IconExposurePlus1 />}
                onClick={addTodo}
              >
                Add
              </Button>
            </div>
          </Center>
        </BackgroundImage>
      </Box>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <span>{todo}</span>
            <Button
              compact
              variant="gradient"
              gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
              style={{ marginRight: "20px" }}
              rightIcon={<IconTrash />}
              onClick={() => deleteTodo(index)}
            >
              Delete
            </Button>
            <Button
              compact
              variant="gradient"
              gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
              rightIcon={<IconEdit />}
              onClick={() => editTodo(index, prompt("Edit:", todo))}
            >
              Edit
            </Button>
          </li>
        ))}
      </ul>
      <Modal opened={opened} onClose={close} title="Modal">
        <Group position="center">
          <Button onClick={() => deleteTodo(deleteIndex)}>Delete</Button>
          <Button onClick={close}>Cancel</Button>
        </Group>
      </Modal>
    </div>
  );
}

export default Todo;
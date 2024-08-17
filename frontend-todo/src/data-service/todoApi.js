import axios from "axios";
import { API_URL } from "../common/globevars";

// Create a new Todo
export const createTodo = async (todoData) => {
  try {
    const response = await axios.post(`${API_URL}/todos`, todoData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Create Tode:", error);
  }
};

// Get all Todos
export const getAllTodo = async () => {
  try {
    const response = await axios.get(`${API_URL}/todos`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("getAllTodo :", error);
  }
};

// Delete the Todo by id
export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/todos/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("deleteTodo :", error);
  }
};

//  Update the Todo by id
export const updateTodo = async (id,todoData) => {
  try {
    const response = await axios.put(`${API_URL}/todos/${id}`,todoData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("updateTodo :", error);
  }
}
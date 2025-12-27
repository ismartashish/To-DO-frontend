import API from "./index";

export const getTodos = () => API.get("/todo");
export const createTodo = (data) => API.post("/todo", data);
export const updateTodo = (id, data) => API.put(`/todo/${id}`, data);
export const deleteTodo = (id) => API.delete(`/todo/${id}`);

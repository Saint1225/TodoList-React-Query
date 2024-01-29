import axios from "axios";

export type todosType = [
  {
    id: number;
    userId: number;
    text: string;
  }
];

type userType = [
  {
    id: number;
    name: string;
  }
];

export const fetchTodos = async (): Promise<todosType> => {
  const res = await axios
    .get("http://localhost:3000/todos")
    .then((res) => res.data);
  return res;
};

export const fetchUsers = async (): Promise<userType> => {
  const res = await axios
    .get("http://localhost:3000/users")
    .then((res) => res.data);
  return res;
};

export const postTodos = async (todoObj: {
  id: number;
  userId: number;
  text: string;
}): Promise<object> => {
  const res = await axios
    .post("http://localhost:3000/todos", todoObj)
    .then((res) => res.data);
  return res;
};

export const searchTodos = async (searchObj: {
  todos: todosType;
  searchInput: string;
}): Promise<todosType> => {
  const searchedTodos = new Promise<todosType>((resolve) => {
    resolve(
      searchObj.todos.filter((todo) =>
        todo.text.includes(searchObj.searchInput)
      ) as todosType
    );
  });
  return searchedTodos;
};

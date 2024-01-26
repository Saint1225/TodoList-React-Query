import axios from "axios";

type todoType = [
  {
    id: number;
    text: string;
  }
];

export const fetchTodos = async (): Promise<todoType> => {
  const res = await axios
    .get("http://localhost:3000/todos")
    .then((res) => res.data);
  return res;
};

export const postTodos = async (todoObj: {
  id: number;
  text: string;
}): Promise<object> => {
  const res = await axios
    .post("http://localhost:3000/todos", todoObj)
    .then((res) => res.data);
  return res;
};

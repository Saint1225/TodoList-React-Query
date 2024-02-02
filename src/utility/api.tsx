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

type paginatedType = {
  nextPage: number | undefined;
  previousPage: number | undefined;
  todos: todosType;
};

export const fetchTodos = async (): Promise<todosType> => {
  const controller = new AbortController();
  const signal = controller.signal;
  const res = await axios
    .get("http://localhost:3000/todos", { signal })
    .then((res) => res.data);
  setTimeout(() => {
    controller.abort();
  }, 3000);
  return res;
};

export const fetchUsers = async (): Promise<userType> => {
  const controller = new AbortController();
  const signal = controller.signal;
  const res = await axios
    .get("http://localhost:3000/users", { signal })
    .then((res) => res.data);
  setTimeout(() => {
    controller.abort();
  }, 3000);
  return res;
};

export const postTodos = async (todoObj: {
  id: number;
  userId: number;
  text: string;
}): Promise<object> => {
  const controller = new AbortController();
  const signal = controller.signal;
  const res = await axios
    .post("http://localhost:3000/todos", todoObj, { signal: signal })
    .then((res) => res.data);
  setTimeout(() => {
    controller.abort();
  }, 3000);
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

export const fetchPaginatedTodos = async (
  page: number
): Promise<paginatedType> => {
  const controller = new AbortController();
  const signal = controller.signal;
  const res = axios
    .get("http://localhost:3000/todos", {
      params: {
        _page: page,
        _sort: "text",
        _limit: 2,
      },
      signal: signal,
    })
    .then((res) => {
      const hasNextPage = page * 2 < parseInt(res.headers["x-total-count"]);
      return {
        nextPage: hasNextPage ? page + 1 : undefined,
        previousPage: page > 1 ? page - 1 : undefined,
        todos: res.data,
      };
    });
  setTimeout(() => {
    controller.abort();
  }, 3000);
  return res;
};

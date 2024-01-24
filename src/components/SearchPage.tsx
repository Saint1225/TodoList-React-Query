import { useQuery } from "@tanstack/react-query";

const SearchPage = () => {
  const dummyTodos: Array<{ id: number; title: string }> = [
    { id: 1, title: "Clean room" },
    { id: 2, title: "Play game" },
    { id: 3, title: "Buy groceries" },
  ];

  const fetchTodos: () => Promise<{ id: number; title: string }[]> = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyTodos);
      }, 1000);
    });
  };

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  return (
    <>
      <p>Search text: </p>
      <input />
      <button>Search</button>
      <br />
      <p>Add todo: </p>
      <input />
      <button>Add</button>
      <br />
      <br />
      {isLoading && <h3>Loading...</h3>}
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      {isError && <h3>Fetch data error</h3>}
    </>
  );
};

export default SearchPage;

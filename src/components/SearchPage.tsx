import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchTodos } from "../utility/api";

const SearchPage = () => {
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  useMutation({});

  return (
    <div className="relative min-h-screen justify-center text-lg overflow-hidden bg-gray-900 p-6 sm:py-12 text-gray-300">
      <p>Search text: </p>
      <input className="w-1/5 mr-2" />
      <button className="border-gray-300 rounded-md border-2 px-1">
        Search
      </button>
      <br />
      <br />
      <p>Add todo: </p>
      <input className="w-1/5 mr-2" />
      <button className="border-gray-300 rounded-md border-2 px-1">Add</button>
      <br />
      <br />
      {isLoading && <h3>Loading...</h3>}
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      {isError && <h3>Fetch data error</h3>}
    </div>
  );
};

export default SearchPage;

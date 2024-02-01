import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchPaginatedTodos } from "../utility/api";
import { Link } from "react-router-dom";

type todo = {
  id: number;
  userId: number;
  text: string;
};

const PaginatedPage = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useQuery({
    queryKey: ["todos", { page }],
    placeholderData: keepPreviousData,
    queryFn: () => fetchPaginatedTodos(page),
  });

  const previousPageHandler = () => {
    setPage((previous) => (data?.previousPage ? data?.previousPage : previous));
  };

  const nextPageHandler = () => {
    setPage((previous) => (data?.nextPage ? data?.nextPage : previous));
  };

  return (
    <div className="relative min-h-screen justify-center text-lg overflow-hidden bg-gray-900 p-6 sm:py-12 text-gray-300">
      <button className="border-gray-300 rounded-md border-2 px-1">
        <Link to="/">Go to Search and Add</Link>
      </button>
      <br />
      <br />
      <h1>Paginated Todos</h1>
      <ul>
        {data?.todos.map((todo: todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      {data?.previousPage && (
        <button
          className="border-gray-300 rounded-md border-2 px-1"
          onClick={previousPageHandler}
          disabled={page === 1}
        >
          Previous
        </button>
      )}
      {data?.nextPage && (
        <button
          className="border-gray-300 rounded-md border-2 px-1"
          onClick={nextPageHandler}
        >
          Next
        </button>
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default PaginatedPage;

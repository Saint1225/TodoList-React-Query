import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchPaginatedTodos } from "../utility/api";

type todo = {
  id: number;
  userId: number;
  text: string;
};

const PaginatedPage = () => {
  const [page, setPage] = useState<number>(0);

  const { data, isLoading } = useQuery({
    queryKey: ["todos", { page }],
    keepPreviousData: true,
    queryFn: () => fetchPaginatedTodos(page),
  });

  const previousPageHandler = () => {
    setPage((previous) => previous - 1);
  };

  const nextPageHandler = () => {
    setPage((previous) => previous + 1);
  };

  return (
    <>
      <h1>Paginated Todos</h1>
      <ul>
        {(data as todo[])?.map((todo: todo) => (
          <li>{todo.text}</li>
        ))}
      </ul>
      <button onClick={previousPageHandler}>Previous</button>
      <button onClick={nextPageHandler}>Next</button>
      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default PaginatedPage;

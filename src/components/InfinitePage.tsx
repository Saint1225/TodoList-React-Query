import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchPaginatedTodos } from "../utility/api";

type todo = {
  id: number;
  userId: number;
  text: string;
};

const InfinitePage = () => {
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["todos", "infinite"],
      queryFn: ({ pageParam }) => fetchPaginatedTodos(pageParam),
      initialPageParam: 1,
      getNextPageParam: (previousData) => previousData.nextPage,
    });

  return (
    <div className="relative min-h-screen justify-center text-lg overflow-hidden bg-gray-900 p-6 sm:py-12 text-gray-300">
      <button className="border-gray-300 rounded-md border-2 px-1">
        <Link to="/">Go to Search and Add</Link>
      </button>
      <br />
      <br />
      <h1>Infinite scrolling Todos</h1>
      <ul>
        {data?.pages
          .flatMap((data) => data.todos)
          .map((todo: todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
      </ul>
      {hasNextPage && (
        <button
          className="border-gray-300 rounded-md border-2 px-1"
          onClick={() => fetchNextPage()}
        >
          Load more
        </button>
      )}
      <h1>{isFetchingNextPage ? "Loading" : ""}</h1>
    </div>
  );
};

export default InfinitePage;

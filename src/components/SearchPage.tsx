import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPaginatedTodos,
  fetchTodos,
  fetchUsers,
  postTodos,
  todosType,
  // searchTodos,
} from "../utility/api";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

type todo = { id: number; userId: number; text: string };

const SearchPage = () => {
  const addInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchedTodos, setSearchedTodos] = useState<todo[]>([]);

  const queryClient = useQueryClient();

  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    // staleTime: 1000 * 5,
    // refetchInterval: 1000,
  });

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    enabled: !!todosQuery.data,
  });

  const todosMutation = useMutation({
    mutationFn: postTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // ** Not ideal to set cached "todos" for search, cause will need to fetch data again once search input is cleared ** //
  // const searchMutation = useMutation({
  //   mutationFn: searchTodos,
  //   onSuccess: (data) => {
  //     queryClient.setQueryData(["todos"], data);
  //     // console.log(context);
  //   },
  //   // onMutate: () => {
  //   //   return { test: "try try" };
  //   // },
  // });

  // if(todosQuery.fetchStatus ==='fetching');

  if (todosQuery.status === "pending") return <h1>Loading</h1>;
  if (todosQuery.status === "error")
    return <h1>{JSON.stringify(todosQuery.error)}</h1>;

  const addHandler = () => {
    const mutatedData = {
      id: parseInt((Math.random() * 100).toFixed(2)),
      userId: Math.floor(Math.random() * (6 - 1) + 1),
      text: addInputRef.current!.value,
    };
    if (addInputRef.current?.value.length !== 0) {
      todosMutation.mutate(mutatedData);
    }
    queryClient.setQueryData(["todos"], (oldData: todosType) => [
      ...oldData,
      mutatedData,
    ]);
  };

  const searchHandler = () => {
    if (searchInputRef.current?.value) {
      setSearchedTodos(
        todosQuery.data.filter((todo) =>
          todo.text.includes(searchInputRef.current!.value)
        )
      );

      // searchMutation.mutate({
      //   todos: todosQuery.data,
      //   searchInput: searchInputRef.current?.value,
      // });
    } else setSearchedTodos([]);
  };

  const onHoverInfinitePage = () => {
    queryClient.prefetchInfiniteQuery({
      queryKey: ["todos", "infinite"],
      queryFn: () => fetchPaginatedTodos(1),
      initialPageParam: 1,
    });
  };

  return (
    <div className="relative min-h-screen justify-center text-lg overflow-hidden bg-gray-900 p-6 sm:py-12 text-gray-300">
      <button className="border-gray-300 rounded-md border-2 px-1 mr-4">
        <Link to="pagination">Go to Pagination</Link>
      </button>
      <button
        onMouseEnter={onHoverInfinitePage}
        className="border-gray-300 rounded-md border-2 px-1"
      >
        <Link to="infinite">Go to InfinitePage</Link>
      </button>

      <br />
      <br />
      <p>Search text: </p>
      <input ref={searchInputRef} className="w-1/5 mr-2" />
      <button
        className="border-gray-300 rounded-md border-2 px-1"
        onClick={searchHandler}
      >
        Search
      </button>
      <br />
      <br />
      <p>Add todo: </p>
      <input ref={addInputRef} className="w-1/5 mr-2" />
      <button
        className="border-gray-300 rounded-md border-2 px-1"
        onClick={addHandler}
      >
        Add
      </button>
      <br />
      <br />
      {todosQuery.isLoading && <h3>Loading...</h3>}
      <ul>
        {searchedTodos.length === 0
          ? todosQuery.data?.map((todo) => (
              <li key={todo.id}>
                {todo.text} -{" "}
                {usersQuery.isLoading
                  ? "Loading"
                  : usersQuery.data?.find(
                      (user: { id: number }) => user.id === todo.userId
                    )?.name}
              </li>
            ))
          : (searchedTodos as todo[]).map((todo: todo) => (
              <li key={todo.id}>
                {todo.text} -{" "}
                {usersQuery.isLoading
                  ? "Loading"
                  : usersQuery.data?.find(
                      (user: { id: number }) => user.id === todo.userId
                    )?.name}
              </li>
            ))}
      </ul>
      {todosQuery.isError && <h3>Fetch data error</h3>}
    </div>
  );
};

export default SearchPage;

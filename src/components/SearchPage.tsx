import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTodos,
  fetchUsers,
  postTodos,
  // searchTodos,
} from "../utility/api";
import { useRef, useState } from "react";

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
    if (addInputRef.current?.value.length !== 0) {
      todosMutation.mutate({
        id: parseInt((Math.random() * 100).toFixed(2)),
        userId: Math.floor(Math.random() * (6 - 1) + 1),
        text: addInputRef.current!.value,
      });
    }
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  };

  const searchHandler = () => {
    if (searchInputRef.current?.value) {
      console.log("if");
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

  console.log(searchedTodos);

  return (
    <div className="relative min-h-screen justify-center text-lg overflow-hidden bg-gray-900 p-6 sm:py-12 text-gray-300">
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

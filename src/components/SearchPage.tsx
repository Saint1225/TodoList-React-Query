import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTodos, postTodos } from "../utility/api";
import { useRef } from "react";

const SearchPage = () => {
  const addInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const todosMutation = useMutation({
    mutationFn: postTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const addHandler = () => {
    console.log(addInputRef.current?.value);
    if (addInputRef.current?.value.length !== 0) {
      todosMutation.mutate({
        id: parseInt((Math.random() * 1000).toFixed(2)),
        text: addInputRef.current!.value,
      });
    }
  };

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
        {todosQuery.data?.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      {todosQuery.isError && <h3>Fetch data error</h3>}
    </div>
  );
};

export default SearchPage;

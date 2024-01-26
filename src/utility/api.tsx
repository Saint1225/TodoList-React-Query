type todoResponseType = [
  {
    id: number;
    text: string;
  }
];

export const fetchTodos = async (): Promise<todoResponseType> => {
  const res = await fetch("http://localhost:3000/todos");

  if (!res.ok) throw new Error("Fetch error!");

  return res.json();
};

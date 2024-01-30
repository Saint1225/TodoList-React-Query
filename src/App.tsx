import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SearchPage from "./components/SearchPage";
import PaginatedPage from "./components/PaginatedPage";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <SearchPage /> },
    { path: "pagination", element: <PaginatedPage /> },
  ]);

  const query = new QueryClient({
    // defaultOptions: {
    //   queries: { staleTime: 1000 * 5 },
    // },
  });

  return (
    <QueryClientProvider client={query}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SearchPage from "./components/SearchPage";
import PaginatedPage from "./components/PaginatedPage";
import InfinitePage from "./components/InfinitePage";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <SearchPage /> },
    { path: "pagination", element: <PaginatedPage /> },
    { path: "infinite", element: <InfinitePage /> },
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

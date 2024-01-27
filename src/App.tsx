import SeacrhPage from "./components/SearchPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const query = new QueryClient({
    // defaultOptions: {
    //   queries: { staleTime: 1000 * 5 },
    // },
  });

  return (
    <QueryClientProvider client={query}>
      <SeacrhPage />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
